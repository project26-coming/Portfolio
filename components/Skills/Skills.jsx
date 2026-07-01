'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Skills.module.css';
import { VscCode } from "react-icons/vsc";

import {
  FaPython,
  FaJava,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaChartBar,
  FaChartPie,
  FaDatabase,
  FaCode,
} from "react-icons/fa";

import { TbBrandCpp } from "react-icons/tb";

import {
  SiJavascript,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiScikitlearn,
  SiNextdotjs,
  SiJupyter,
} from "react-icons/si";
const EASE = [0.16, 1, 0.3, 1];

const categories = [
  {
    title: 'Programming Languages',
    skills: [
      { icon: <FaPython />, name: "Python" },
{ icon: <FaJava />, name: "Java" },
{ icon: <FaCode />, name: "C" },
{ icon: <TbBrandCpp />, name: "C++" },
{ icon: <SiJavascript />, name: "JavaScript" },
    ],
  },
  {
    title: 'Data Science',
    skills: [
      { icon: <SiPandas />, name: 'Pandas' },
      { icon: <SiNumpy />, name: 'NumPy' },
      { icon: <SiTensorflow />, name: 'TensorFlow' },
      { icon: <SiScikitlearn />, name: 'Scikit-learn' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { icon: <FaDatabase />, name: "SQL" },
{ icon: <FaDatabase />, name: "PL/SQL" },
{ icon: <SiMysql />, name: "MySQL" },
    ],
  },
  {
    title: 'Data Visualization',
    skills: [
      { icon: <FaChartBar />, name: "Matplotlib" },
{ icon: <FaChartBar />, name: "Seaborn" },
{ icon: <FaChartPie />, name: "Power BI" },
{ icon: <FaChartBar />, name: "Tableau" },
    ],
  },
  {
    title: 'Web Development',
    skills: [
      { icon: <FaReact />, name: 'React' },
      { icon: <SiNextdotjs />, name: 'Next.js' },
      { icon: <FaHtml5 />, name: 'HTML' },
      { icon: <FaCss3Alt />, name: 'CSS' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { icon: <FaGitAlt />, name: "Git" },
{ icon: <FaGithub />, name: "GitHub" },
{ icon: <VscCode />, name: "VS Code" },
{ icon: <SiJupyter />, name: "Jupyter Notebook" },
    ],
  },
];

export default function Skills() {
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
    show: { transition: { staggerChildren: 0.06 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section className={styles.skills} id="skills">
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
            My Skills
          </motion.p>

          <motion.h2 variants={headItem} className={styles.heading}>
            Technologies I Work With
          </motion.h2>
        </motion.div>

        {categories.map((category) => (
          <div key={category.title} className={styles.category}>
            <motion.h3
              className={styles.categoryTitle}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className={styles.categoryBar} aria-hidden="true" />
              {category.title}
            </motion.h3>

            <motion.div
              className={styles.grid}
              variants={gridVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {category.skills.map((skill) => (
                <motion.div
                  className={styles.card}
                  key={skill.name}
                  variants={cardVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -10, transition: { duration: 0.35, ease: EASE } }
                  }
                >
                  <span className={styles.cardSheen} aria-hidden="true" />

                  <div className={styles.iconRing}>
                    <div className={styles.icon}>{skill.icon}</div>
                  </div>

                  <h4 className={styles.cardName}>{skill.name}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}