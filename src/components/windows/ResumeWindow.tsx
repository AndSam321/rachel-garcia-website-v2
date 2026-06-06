import type { SiteContent } from "@/types";
import styles from "./ResumeWindow.module.css";

export default function ResumeWindow({ resume }: { resume: SiteContent["resume"] }) {
  return (
    <div className={styles.resume}>
      <a
        className={styles.download}
        href={resume.downloadUrl}
        download="Rachel-Garcia-Resume.pdf"
      >
        download PDF ↓
      </a>
      {resume.sections.map((section) => (
        <section key={section.id} className={styles.section}>
          <h3 className={`hand ${styles.heading}`}>{section.heading}</h3>
          {section.items.map((item, i) => (
            <div key={i} className={styles.item}>
              {item.primary && <p className={styles.primary}>{item.primary}</p>}
              {item.secondary && <p className={styles.secondary}>{item.secondary}</p>}
              {item.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
