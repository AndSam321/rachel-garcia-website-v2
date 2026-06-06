"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={submit}>
        <h1 className={`hand ${styles.heading}`}>hi rachel 💌</h1>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="password"
          autoFocus
        />
        {error && <p className={`hand ${styles.error}`}>that&apos;s not it…</p>}
        <button type="submit" className={styles.button}>
          come in
        </button>
      </form>
    </main>
  );
}
