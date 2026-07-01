"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaCheck } from "react-icons/fa";

const EMAIL = "kadimetla.varsha@gmail.com";

const CHANNELS = [
  {
    key: "github",
    label: "Code",
    title: "GitHub",
    handle: "project26-coming",
    href: "https://github.com/project26-coming",
    icon: FaGithub,
    external: true,
  },
  {
    key: "linkedin",
    label: "Network",
    title: "LinkedIn",
    handle: "Kadimetla Varsha",
    href: "https://www.linkedin.com/in/kadimetla-varsha-572498338",
    icon: FaLinkedin,
    external: true,
  },
  {
    key: "email",
    label: "Direct",
    title: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: FaEnvelope,
    external: false,
  },
];

export default function Contact() {
  const cardRefs = useRef([]);
  const [copied, setCopied] = useState(false);

  // Scroll-triggered reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      cardRefs.current.forEach((el) => el && el.classList.add(styles.visible));
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
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Cursor-tracking spotlight glow
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      window.clearTimeout(handleCopyEmail._t);
      handleCopyEmail._t = window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <p className={styles.subtitle}>
          <span className={styles.subtitleLine} />
          Contact
        </p>

        <h2 className={styles.heading}>
          Let's <span>connect</span>
        </h2>

        <p className={styles.description}>
          I'm always open to internship opportunities, collaborations, and
          exciting projects in Data Science, Artificial Intelligence, and
          Software Development.
        </p>

        <div className={styles.cards}>
          {CHANNELS.map((channel, i) => {
            const Icon = channel.icon;
            const isEmail = channel.key === "email";

            return (
              <a
                key={channel.key}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                ref={(el) => (cardRefs.current[i] = el)}
                onMouseMove={handleMouseMove}
                className={styles.card}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className={styles.cardGlow} aria-hidden="true" />
                <span className={styles.cardBorder} aria-hidden="true" />

                <div className={styles.cardTop}>
                  <span className={styles.tag}>{channel.label}</span>

                  {isEmail ? (
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                    >
                      {copied ? <FaCheck /> : "Copy"}
                    </button>
                  ) : (
                    <FaArrowRight className={styles.arrow} aria-hidden="true" />
                  )}
                </div>

                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>

                <h3>{channel.title}</h3>
                <span className={styles.handle}>{channel.handle}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}