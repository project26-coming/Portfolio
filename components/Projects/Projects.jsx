'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

const EASE = [0.16, 1, 0.3, 1];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  const headVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const headItem = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          variants={headVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p variants={headItem} className={styles.subtitle}>
            <span className={styles.subtitleDot} />
            My Work
          </motion.p>

          <motion.h2 variants={headItem} className={styles.heading}>
            Featured Projects
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}