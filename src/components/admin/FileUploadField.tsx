"use client";

import { useState } from "react";
import styles from "./admin.module.css";

type Props = {
  accept: string;
  onUploaded: (url: string, file: File) => void;
};

export default function FileUploadField({ accept, onUploaded }: Props) {
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("uploading");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    const { url } = await res.json();
    setStatus("idle");
    onUploaded(url, file);
  }

  return (
    <label className={styles.upload}>
      {status === "uploading" ? "uploading…" : "upload file"}
      {status === "error" && <span className={styles.uploadError}> failed, try again</span>}
      <input type="file" accept={accept} onChange={upload} hidden />
    </label>
  );
}
