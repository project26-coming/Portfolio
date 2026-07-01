'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './About.module.css';

const EASE = [0.16, 1, 0.3, 1];

const CARDS = [
  {
    id: 'mit',
    eyebrow: 'Education',
    title: 'MIT Manipal',
    detail: 'B.Tech, Data Science',
    icon: GraduationIcon,
  },
  {
    id: 'iitm',
    eyebrow: 'Dual Degree',
    title: 'IIT Madras',
    detail: 'BS, Data Science & Applications',
    icon: LayersIcon,
  },
  {
    id: 'ai',
    eyebrow: 'Focus',
    title: 'AI & Machine Learning',
    detail: 'Deep Learning • Analytics • Modeling',
    icon: BrainIcon,
  },
  {
    id: 'dev',
    eyebrow: 'Build',
    title: 'Software Development',
    detail: 'Full-Stack • React • Next.js',
    icon: CodeIcon,
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const columnVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section className={styles.about} id="about">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.left}
          variants={columnVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p variants={item} className={styles.smallTitle}>
            <span className={styles.smallTitleDot} />
            About Me
          </motion.p>

          <motion.h2 variants={item} className={styles.heading}>
            Hi, I&apos;m <span className={styles.name}>Kadimetla Varsha</span>
          </motion.h2>

          <motion.p variants={item} className={styles.description}>
            I&apos;m a Data Science undergraduate pursuing my B.Tech at{' '}
            <strong>MIT Manipal</strong>, alongside a BS in Data Science &amp;
            Applications from <strong>IIT Madras</strong>. My work centers on
            Artificial Intelligence, Machine Learning, Data Analytics, and
            Software Development — I enjoy turning research-grade ideas into
            real, working applications, and I&apos;m always learning
            something new along the way.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.right}
          variants={gridVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {CARDS.map(({ id, eyebrow, title, detail, icon: Icon }) => (
            <motion.div
              key={id}
              className={styles.card}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion ? undefined : { y: -8, transition: { duration: 0.35, ease: EASE } }
              }
            >
              <div className={styles.cardGlow} aria-hidden="true" />

              <div className={styles.cardIcon}>
                <Icon />
              </div>

              <p className={styles.cardEyebrow}>{eyebrow}</p>
              <p className={styles.cardTitle}>{title}</p>
              <span className={styles.cardDetail}>{detail}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Inline icon components (no external icon dependency) ---------- */

function GraduationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 2 8l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 8v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 2 7l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m2 12 10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m2 17 10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4.5a3 3 0 0 0-3 3v.2A3.2 3.2 0 0 0 4 10.7v.6A3 3 0 0 0 4.5 17a3 3 0 0 0 3 3H9M15 4.5a3 3 0 0 1 3 3v.2A3.2 3.2 0 0 1 20 10.7v.6A3 3 0 0 1 19.5 17a3 3 0 0 1-3 3H15M9 4.5v15M15 4.5v15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="m8 6-6 6 6 6M16 6l6 6-6 6M13.5 4 10.5 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}