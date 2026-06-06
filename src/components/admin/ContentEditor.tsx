"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/types";
import ProjectsEditor from "./ProjectsEditor";
import ResumeEditor from "./ResumeEditor";
import styles from "./admin.module.css";

export default function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    setStatus("saving");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(res.ok ? "saved" : "error");
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  }

  function update(patch: Partial<SiteContent>) {
    setContent((prev) => ({ ...prev, ...patch }));
    setStatus("idle");
  }

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <h1 className={`hand ${styles.pageTitle}`}>rachel&apos;s control room 🎛️</h1>
        <div className={styles.topActions}>
          <button type="button" className={styles.secondary} onClick={logout}>
            log out
          </button>
          <button type="button" className={styles.primary} onClick={save}>
            {status === "saving" ? "saving…" : "save changes"}
          </button>
        </div>
      </header>
      {status === "saved" && <p className={`hand ${styles.flash}`}>saved! ✓</p>}
      {status === "error" && (
        <p className={`hand ${styles.flashError}`}>something went wrong saving — try again</p>
      )}

      <section className={styles.section}>
        <h2 className={`hand ${styles.sectionTitle}`}>Bio</h2>
        <label className={styles.field}>
          greeting
          <input
            value={content.bio.greeting}
            onChange={(e) => update({ bio: { ...content.bio, greeting: e.target.value } })}
          />
        </label>
        <label className={styles.field}>
          intro line
          <input
            value={content.bio.intro}
            onChange={(e) => update({ bio: { ...content.bio, intro: e.target.value } })}
          />
        </label>
        <label className={styles.field}>
          tagline
          <textarea
            rows={2}
            value={content.bio.tagline}
            onChange={(e) => update({ bio: { ...content.bio, tagline: e.target.value } })}
          />
        </label>
      </section>

      <section className={styles.section}>
        <h2 className={`hand ${styles.sectionTitle}`}>Contacts</h2>
        {content.contacts.map((c, i) => (
          <div key={c.id} className={styles.row}>
            <span className={styles.rowKind}>{c.kind}</span>
            <input
              className={styles.grow}
              value={c.label}
              placeholder="label"
              onChange={(e) => {
                const contacts = [...content.contacts];
                contacts[i] = { ...c, label: e.target.value };
                update({ contacts });
              }}
            />
            <input
              className={styles.grow}
              value={c.href}
              placeholder="link"
              onChange={(e) => {
                const contacts = [...content.contacts];
                contacts[i] = { ...c, href: e.target.value };
                update({ contacts });
              }}
            />
          </div>
        ))}
      </section>

      <ProjectsEditor
        projects={content.projects}
        onChange={(projects) => update({ projects })}
      />

      <ResumeEditor resume={content.resume} onChange={(resume) => update({ resume })} />
    </main>
  );
}
