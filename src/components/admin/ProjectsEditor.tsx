"use client";

import type { Project } from "@/types";
import FileUploadField from "./FileUploadField";
import styles from "./admin.module.css";

type Props = {
  projects: Project[];
  onChange: (projects: Project[]) => void;
};

export default function ProjectsEditor({ projects, onChange }: Props) {
  function updateProject(index: number, patch: Partial<Project>) {
    const next = [...projects];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function addProject() {
    onChange([
      ...projects,
      { id: `project-${Date.now()}`, title: "", year: "", note: "" },
    ]);
  }

  function removeProject(index: number) {
    onChange(projects.filter((_, i) => i !== index));
  }

  return (
    <section className={styles.section}>
      <h2 className={`hand ${styles.sectionTitle}`}>Projects</h2>
      {projects.map((p, i) => (
        <div key={p.id} className={styles.card}>
          <div className={styles.row}>
            <input
              className={styles.grow}
              value={p.title}
              placeholder="title"
              onChange={(e) => updateProject(i, { title: e.target.value })}
            />
            <input
              className={styles.year}
              value={p.year}
              placeholder="year"
              onChange={(e) => updateProject(i, { year: e.target.value })}
            />
          </div>
          <div className={styles.row}>
            <input
              className={styles.grow}
              value={p.note ?? ""}
              placeholder="note (e.g. more to come)"
              onChange={(e) => updateProject(i, { note: e.target.value || undefined })}
            />
          </div>
          <div className={styles.row}>
            {p.attachment ? (
              <>
                <input
                  className={styles.grow}
                  value={p.attachment.label}
                  placeholder="attachment label"
                  onChange={(e) =>
                    updateProject(i, {
                      attachment: { ...p.attachment!, label: e.target.value },
                    })
                  }
                />
                <a href={p.attachment.url} target="_blank" rel="noopener noreferrer">
                  view
                </a>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => updateProject(i, { attachment: undefined })}
                >
                  remove file
                </button>
              </>
            ) : (
              <FileUploadField
                accept="application/pdf,image/*"
                onUploaded={(url, file) =>
                  updateProject(i, {
                    attachment: {
                      kind: file.type === "application/pdf" ? "pdf" : "image",
                      url,
                      label: file.type === "application/pdf" ? "view PDF" : file.name,
                    },
                  })
                }
              />
            )}
          </div>
          <button
            type="button"
            className={styles.danger}
            onClick={() => removeProject(i)}
          >
            delete project
          </button>
        </div>
      ))}
      <button type="button" className={styles.secondary} onClick={addProject}>
        + add project
      </button>
    </section>
  );
}
