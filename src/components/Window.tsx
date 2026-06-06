"use client";

import type { ReactNode } from "react";
import { useDrag } from "@/lib/useDrag";
import { useIsMobile } from "@/lib/useIsMobile";
import styles from "./Window.module.css";

type Props = {
  title: string;
  zIndex: number;
  initialPosition: { x: number; y: number };
  onClose: () => void;
  onFocus: () => void;
  children: ReactNode;
};

export default function Window({
  title,
  zIndex,
  initialPosition,
  onClose,
  onFocus,
  children,
}: Props) {
  const isMobile = useIsMobile();
  const { position, dragHandlers } = useDrag(initialPosition);

  if (isMobile) {
    return (
      <section className={styles.sheet} style={{ zIndex: 100 + zIndex }}>
        <header className={styles.titleBar}>
          <span className={styles.title}>{title}</span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    );
  }

  return (
    <section
      className={styles.window}
      style={{ left: position.x, top: position.y, zIndex: 100 + zIndex }}
      onPointerDown={onFocus}
    >
      <header className={`${styles.titleBar} ${styles.draggable}`} {...dragHandlers}>
        <span className={styles.title}>{title}</span>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Close"
        >
          ✕
        </button>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
