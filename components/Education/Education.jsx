"use client";
import { useEffect, useRef } from "react";
import styles from "./Education.module.css";
import { FaGraduationCap } from "react-icons/fa";

const EDUCATION = [
  {
    institution: "MIT Manipal",
    degree: "B.Tech in Data Science",
    cgpa: "7.28 / 10",
    description:
      "Building a foundation across machine learning, statistical modeling and software engineering — turning raw data into systems that reason.",
    period: "2024 — Present",
    status: "In Progress",
  },
  {
    institution: "IIT Madras",
    degree: "BS in Data Science",
    cgpa: "6.69 / 10",
    description:
      "An online-degree track from IIT Madras, sharpening rigor in programming, probability and applied data science alongside the on-campus program.",
    period: "2024 — Present",
    status: "In Progress",
  },
];

export default function Education() {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);

  // Reveal each card as it scrolls into view
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      itemRefs.current.forEach((el) => el && el.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fill the glowing timeline beam based on scroll progress
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let frame = null;

    const updateProgress = () => {
      frame = null;
      const track = timelineRef.current;
      const line = lineRef.current;
      if (!track || !line) return;

      const rect = track.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.85;
      const scrolled = viewportAnchor - rect.top;
      const progress = Math.min(Math.max(scrolled / rect.height, 0), 1);

      line.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.education} id="education">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <p className={styles.subtitle}>
          <span className={styles.subtitleLine} />
          Education
        </p>

        <h2 className={styles.heading}>
          The academic <span>journey</span>
        </h2>

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.trackBase} aria-hidden="true" />
          <div className={styles.trackGlow} ref={lineRef} aria-hidden="true" />

          {EDUCATION.map((item, i) => (
            <div
              key={item.institution}
              ref={(el) => (itemRefs.current[i] = el)}
              className={styles.item}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className={styles.node} aria-hidden="true">
                <span className={styles.nodeRing} />
                <span className={styles.nodeCore} />
              </div>

              <div className={styles.card}>
                <FaGraduationCap className={styles.watermark} aria-hidden="true" />

                <div className={styles.cardTop}>
                  <span className={styles.statusBadge}>{item.status}</span>
                  <span className={styles.period}>{item.period}</span>
                </div>

                <h3>{item.institution}</h3>

<h4>{item.degree}</h4>

<div className={styles.cgpa}>
  <span>CGPA</span>
  <strong>{item.cgpa}</strong>
</div>

<p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}