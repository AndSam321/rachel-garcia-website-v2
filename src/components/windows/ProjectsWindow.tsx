/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/types";
import styles from "./ProjectsWindow.module.css";

export default function ProjectsWindow({ projects }: { projects: Project[] }) {
  return (
    <ul className={styles.list}>
      {projects.map((p) => (
        <li key={p.id} className={styles.project}>
          <div className={styles.heading}>
            <h3 className={`hand ${styles.title}`}>{p.title}</h3>
            <span className={`hand ${styles.year}`}>{p.year}</span>
          </div>
          {p.note && <p className={`hand ${styles.note}`}>{p.note}</p>}
          {p.attachment?.kind === "pdf" && (
            <a
              className={styles.attachment}
              href={p.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.attachment.label}
            </a>
          )}
          {p.attachment?.kind === "image" && (
            <img
              className={styles.photo}
              src={p.attachment.url}
              alt={p.attachment.label}
            />
          )}
          {!p.attachment && (
            <div className={styles.placeholder}>
              <span className="hand">manatee photo coming soon 🌊</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
