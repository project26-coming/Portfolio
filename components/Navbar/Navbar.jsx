"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Blur / condense navbar on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sectionIds = ["home", ...NAV_LINKS.map((link) => link.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Treat the vertical center band of the viewport as "active"
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={styles.wrapper}
    >
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <button
          className={styles.logo}
          onClick={() => scrollTo("home")}
          aria-label="Go to top"
        >
          <span className={styles.logoMark}>V</span>
          <span className={styles.logoText}>ARSHA</span>
        </button>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className={styles.indicator}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.actions}>
          <a
            href="/KadimetlaVarsha_240968102_DataScience.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resume}
          >
            <span>Resume</span>
            <HiOutlineArrowDownTray className={styles.resumeIcon} />
          </a>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className={styles.menuIcon}
              >
                {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.mobileMenu}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                  onClick={() => scrollTo(link.id)}
                  className={`${styles.mobileLink} ${
                    activeSection === link.id ? styles.mobileActive : ""
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 * NAV_LINKS.length + 0.1,
                  duration: 0.3,
                }}
                href="/KadimetlaVarsha_240968102_DataScience.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileResume}
              >
                <span>Download Resume</span>
                <HiOutlineArrowDownTray />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}