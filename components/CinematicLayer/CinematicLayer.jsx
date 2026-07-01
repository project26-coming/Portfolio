'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

/**
 * CinematicLayer
 * A transparent, full-bleed Three.js canvas that renders slow-floating
 * warm-orange + white bokeh particles with additive blending, a soft
 * sine-wave drift, and a gentle mouse-parallax camera move.
 *
 * Designed to sit ABOVE the video layers and BELOW the text content,
 * acting like dust / light particles drifting through a film frame.
 */
export default function CinematicLayer({ particleCount = 90 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Respect reduced-motion preference: render a single static frame only.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Build a soft circular sprite texture (procedural, no asset) ----
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.25, 'rgba(255,220,180,0.7)');
    gradient.addColorStop(1, 'rgba(255,150,60,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // ---- Particle geometry ----
    const count = prefersReducedMotion ? Math.min(20, particleCount) : particleCount;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count); // used for sine offsets
    const sizes = new Float32Array(count);
    const warmth = new Float32Array(count); // 0 = white, 1 = warm orange

    const spread = { x: 900, y: 500, z: 600 };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
      seeds[i] = Math.random() * Math.PI * 2;
      sizes[i] = 18 + Math.random() * 46;
      warmth[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('warmth', new THREE.BufferAttribute(warmth, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: spriteTexture },
        uOpacity: { value: 0.0 }, // fades in on mount
      },
      vertexShader: `
        attribute float size;
        attribute float warmth;
        varying float vWarmth;
        void main() {
          vWarmth = warmth;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        varying float vWarmth;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          vec3 white = vec3(1.0, 0.97, 0.92);
          vec3 orange = vec3(1.0, 0.55, 0.22);
          vec3 color = mix(white, orange, vWarmth);
          gl_FragColor = vec4(color * tex.rgb, tex.a * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- Mouse parallax state ----
    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    function handlePointerMove(e) {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    mount.addEventListener('pointermove', handlePointerMove);

    // ---- Resize handling ----
    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ---- Animation loop ----
    let rafId;
    const clock = new THREE.Clock();
    let fadeIn = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle fade-in of particle opacity on load
      if (fadeIn < 1) {
        fadeIn = Math.min(1, fadeIn + 0.01);
        material.uniforms.uOpacity.value = fadeIn * 0.85;
      }

      if (!prefersReducedMotion) {
        const posAttr = geometry.attributes.position;
        for (let i = 0; i < count; i++) {
          const seed = seeds[i];
          posAttr.array[i * 3 + 1] += Math.sin(elapsed * 0.3 + seed) * 0.04;
          posAttr.array[i * 3] += Math.cos(elapsed * 0.2 + seed) * 0.03;
        }
        posAttr.needsUpdate = true;

        // Smooth camera parallax toward pointer position
        targetCam.x += (mouse.x * 40 - targetCam.x) * 0.02;
        targetCam.y += (mouse.y * 24 - targetCam.y) * 0.02;
        camera.position.x = targetCam.x;
        camera.position.y = targetCam.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }
    animate();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mount.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return <div ref={mountRef} className={styles.canvasMount} aria-hidden="true" />;
}
