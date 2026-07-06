'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import CinematicLayer from '../CinematicLayer/CinematicLayer';
import styles from './VideoIntro.module.css';

const VIDEO_SRC = '/videos/hero-talking-head.mp4';

export default function VideoIntro({
  tagline = 'Data Science • Machine Learning • Full Stack Development',
  firstName = 'KADIMETLA',
  lastName = 'VARSHA',
  role = 'Data Science undergraduate at MIT Manipal and IIT Madras, passionate about Artificial Intelligence, Machine Learning, Data Analytics, and Full-Stack Development. I enjoy building intelligent solutions that solve real-world problems.',
  nextSectionId = 'next-section',
}) {
  const sectionRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const taglineRef = useRef(null);
  const nameLine1Ref = useRef(null);
  const nameLine2Ref = useRef(null);
  const roleRef = useRef(null);
  const controlsRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollRef = useRef(null);
  const frameRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showBadge, setShowBadge] = useState(true);

  // ---- Sync mute / play state across both video layers ----
  const syncVideos = useCallback((fn) => {
    if (fgVideoRef.current) fn(fgVideoRef.current);
    if (bgVideoRef.current) fn(bgVideoRef.current);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      syncVideos((v) => (next ? v.play().catch(() => {}) : v.pause()));
      return next;
    });
  }, [syncVideos]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      syncVideos((v) => {
        v.muted = next;
      });
      return next;
    });
    setShowBadge(false);
  }, [syncVideos]);

  const scrollToNext = useCallback(() => {
    const target = document.getElementById(nextSectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, [nextSectionId]);

  // ---- Page-load entrance animation (GSAP) ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.set(sectionRef.current, { opacity: 0 })
        .to(sectionRef.current, { opacity: 1, duration: 1.1 })
        .from(
          frameRef.current,
          { opacity: 0, duration: 1.4, ease: 'power2.out' },
          '<'
        )
        .from(
          taglineRef.current,
          { y: 24, opacity: 0, duration: 0.9, letterSpacing: '0.5em' },
          '-=0.7'
        )
        .from(
          nameLine1Ref.current,
          { y: 80, opacity: 0, duration: 1.1, ease: 'power4.out' },
          '-=0.5'
        )
        .from(
          nameLine2Ref.current,
          { y: 80, opacity: 0, duration: 1.1, ease: 'power4.out' },
          '-=0.85'
        )
        .from(
          roleRef.current,
          { y: 20, opacity: 0, duration: 0.9 },
          '-=0.6'
        )
        .from(
          controlsRef.current,
          { y: 16, opacity: 0, duration: 0.8 },
          '-=0.5'
        )
        .from(
          scrollRef.current,
          { opacity: 0, duration: 1 },
          '-=0.4'
        )
        .from(
          badgeRef.current,
          { opacity: 0, scale: 0.85, duration: 0.6 },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---- Auto-hide the "tap for sound" badge after a few seconds ----
  useEffect(() => {
    if (!showBadge) return;
    const timer = setTimeout(() => setShowBadge(false), 5000);
    return () => clearTimeout(timer);
  }, [showBadge]);

  useEffect(() => {
    if (!badgeRef.current) return;
    gsap.to(badgeRef.current, {
      opacity: showBadge ? 1 : 0,
      pointerEvents: showBadge ? 'auto' : 'none',
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [showBadge]);

  // ---- Subtle scroll-line pulse (CSS handles the loop; GSAP just kicks it) ----

  return (
  <section ref={sectionRef} className={styles.hero} aria-label="Cinematic introduction">
    {/* LEFT — content */}
    <div className={styles.contentPanel}>
      <p ref={taglineRef} className={styles.tagline}>{tagline}</p>

      <h1 className={styles.name}>
        <span ref={nameLine1Ref} className={styles.nameLine}>{firstName}</span>
        <span ref={nameLine2Ref} className={styles.nameLine}>{lastName}</span>
      </h1>

      <p ref={roleRef} className={styles.role}>{role}</p>
      <div className={styles.heroButtons}>
  <a href="#projects" className={styles.primaryButton}>
    View Projects
  </a>

  <a
    href="/KadimetlaVarsha_240968102_DataScience.pdf"
    className={styles.secondaryButton}
    target="_blank"
    rel="noopener noreferrer"
  >
    Download Resume
  </a>

</div>

      <div ref={controlsRef} className={styles.controls}>
        <button type="button" className={styles.controlButton} onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button type="button" className={styles.controlButton} onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
          {isMuted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>
    </div>

    {/* RIGHT — video */}
    <div className={styles.videoPanel}>
      <video ref={bgVideoRef} className={styles.bgVideo} src={VIDEO_SRC}
        autoPlay loop muted playsInline aria-hidden="true" />

      <div className={styles.fgVideoWrap}>
        <video ref={fgVideoRef} className={styles.fgVideo} src={VIDEO_SRC}
          autoPlay loop muted={isMuted} playsInline aria-label="Introduction video" />
      </div>

      <div className={styles.panelGradient} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.particleMount}>
        <CinematicLayer particleCount={50} />
      </div>

      <button ref={badgeRef} className={styles.soundBadge} onClick={toggleMute} type="button">
        <span className={styles.soundBadgeDot} />
        Tap for sound
      </button>
    </div>

    <button ref={scrollRef} type="button" className={styles.scrollIndicator} onClick={scrollToNext}
      aria-label="Scroll to next section">
      <span className={styles.scrollLabel}>Scroll</span>
      <span className={styles.scrollLine}><span className={styles.scrollPulse} /></span>
    </button>
  </section>
);
}

/* ---------- Inline icon components (no external icon dependency) ---------- */

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  );
}
function UnmutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}
