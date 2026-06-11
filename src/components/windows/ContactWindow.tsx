"use client";

import { useEffect, useState } from "react";
import type { Contact, ContactKind } from "@/types";
import { decodeEmail } from "@/lib/emailObfuscation";
import styles from "./ContactWindow.module.css";

const ICONS: Record<ContactKind, { color: string; icon: React.ReactNode }> = {
  email: {
    color: "var(--blue)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  substack: {
    color: "var(--tan)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16v2.5H4zM4 9h16v2.5H4zM4 14h16v6l-8-3.5L4 20z" />
      </svg>
    ),
  },
  github: {
    color: "var(--ink)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  linkedin: {
    color: "var(--blue-slate)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48a2.49 2.49 0 0 1-.02-4.98ZM3 9.75h4v10.5H3zM9.5 9.75h3.8v1.44h.06c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.57 4.76 5.91v5.1h-4v-4.52c0-1.08-.02-2.47-1.55-2.47-1.55 0-1.79 1.18-1.79 2.39v4.6h-4Z" />
      </svg>
    ),
  },
};

export default function ContactWindow({ contacts }: { contacts: Contact[] }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => setRevealed(true), []);

  return (
    <ul className={styles.list}>
      {contacts.map((c) => {
        const isHiddenEmail = c.kind === "email" && !revealed;
        const label = isHiddenEmail ? "Email Rachel" : decode(c);
        const href = isHiddenEmail ? undefined : link(c);

        return (
          <li key={c.id}>
            <a
              className={styles.row}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: ICONS[c.kind].color }}
            >
              <span className={styles.icon}>{ICONS[c.kind].icon}</span>
              <span className={`hand ${styles.label}`}>{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function decode(c: Contact): string {
  return c.kind === "email" ? decodeEmail(c.label) : c.label;
}

function link(c: Contact): string {
  return c.kind === "email" ? `mailto:${decodeEmail(c.href)}` : c.href;
}
