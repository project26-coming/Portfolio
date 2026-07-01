import styles from "./ProjectCard.module.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.card}>

      <div className={styles.content}>
        <span className={styles.status}>
          {project.status}
        </span>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className={styles.tech}>
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className={styles.buttons}>
          <a
            href={project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          {project.demo && (
  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaExternalLinkAlt />
    Live Demo
  </a>
)}
        </div>
      </div>
    </div>
  );
}