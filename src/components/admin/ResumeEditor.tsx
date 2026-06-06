"use client";

import type { ResumeItem, ResumeSection, SiteContent } from "@/types";
import FileUploadField from "./FileUploadField";
import styles from "./admin.module.css";

type Resume = SiteContent["resume"];

type Props = {
  resume: Resume;
  onChange: (resume: Resume) => void;
};

export default function ResumeEditor({ resume, onChange }: Props) {
  function updateSection(index: number, patch: Partial<ResumeSection>) {
    const sections = [...resume.sections];
    sections[index] = { ...sections[index], ...patch };
    onChange({ ...resume, sections });
  }

  function updateItem(sectionIndex: number, itemIndex: number, patch: Partial<ResumeItem>) {
    const items = [...resume.sections[sectionIndex].items];
    items[itemIndex] = { ...items[itemIndex], ...patch };
    updateSection(sectionIndex, { items });
  }

  return (
    <section className={styles.section}>
      <h2 className={`hand ${styles.sectionTitle}`}>Resume</h2>
      <div className={styles.row}>
        <a href={resume.downloadUrl} target="_blank" rel="noopener noreferrer">
          current PDF
        </a>
        <FileUploadField
          accept="application/pdf"
          onUploaded={(url) => onChange({ ...resume, downloadUrl: url })}
        />
      </div>

      {resume.sections.map((section, si) => (
        <div key={section.id} className={styles.card}>
          <input
            className={styles.sectionHeading}
            value={section.heading}
            onChange={(e) => updateSection(si, { heading: e.target.value })}
          />
          {section.items.map((item, ii) => (
            <div key={ii} className={styles.subCard}>
              <input
                value={item.primary ?? ""}
                placeholder="title (e.g. Researcher, SIAM-Simons Program)"
                onChange={(e) =>
                  updateItem(si, ii, { primary: e.target.value || undefined })
                }
              />
              <input
                value={item.secondary ?? ""}
                placeholder="subtitle (e.g. Simpson College · May – July 2025)"
                onChange={(e) =>
                  updateItem(si, ii, { secondary: e.target.value || undefined })
                }
              />
              <textarea
                rows={Math.max(2, item.bullets.length + 1)}
                value={item.bullets.join("\n")}
                placeholder="bullets, one per line"
                onChange={(e) =>
                  updateItem(si, ii, {
                    bullets: e.target.value.split("\n").filter((b) => b.trim() !== ""),
                  })
                }
              />
              <button
                type="button"
                className={styles.danger}
                onClick={() =>
                  updateSection(si, {
                    items: section.items.filter((_, i) => i !== ii),
                  })
                }
              >
                delete entry
              </button>
            </div>
          ))}
          <div className={styles.row}>
            <button
              type="button"
              className={styles.secondary}
              onClick={() =>
                updateSection(si, {
                  items: [...section.items, { bullets: [] }],
                })
              }
            >
              + add entry
            </button>
            <button
              type="button"
              className={styles.danger}
              onClick={() =>
                onChange({
                  ...resume,
                  sections: resume.sections.filter((_, i) => i !== si),
                })
              }
            >
              delete section
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className={styles.secondary}
        onClick={() =>
          onChange({
            ...resume,
            sections: [
              ...resume.sections,
              { id: `section-${Date.now()}`, heading: "New Section", items: [] },
            ],
          })
        }
      >
        + add section
      </button>
    </section>
  );
}
