"use client";

import { useState } from "react";
import Image from "next/image";
import FolderIcon from "./FolderIcon";
import Stars from "./Stars";
import Window from "./Window";
import ContactWindow from "./windows/ContactWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ResumeWindow from "./windows/ResumeWindow";
import FunFactsWindow from "./windows/FunFactsWindow";
import styles from "./Desktop.module.css";
import type { SiteContent } from "@/types";

export type WindowId = "contact" | "projects" | "resume" | "funfacts";

const WINDOW_META: Record<WindowId, { title: string; initialPosition: { x: number; y: number } }> = {
  contact: { title: "Contacts", initialPosition: { x: 80, y: 90 } },
  projects: { title: "Projects", initialPosition: { x: 200, y: 60 } },
  resume: { title: "Resume", initialPosition: { x: 320, y: 110 } },
  funfacts: { title: "Fun Facts", initialPosition: { x: 440, y: 140 } },
};

export default function Desktop({ content }: { content: SiteContent }) {
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>([]);

  function openWindow(id: WindowId) {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    bringToFront(id);
  }

  function closeWindow(id: WindowId) {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setZOrder((prev) => prev.filter((w) => w !== id));
  }

  function bringToFront(id: WindowId) {
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }

  return (
    <main className={styles.desktop}>
      <Stars />

      <section className={styles.hero}>
        <p className={`hand ${styles.greeting}`}>{content.bio.greeting}</p>
        <p className={`hand ${styles.myNameIs}`}>{content.bio.intro}</p>
        <h1 className={styles.name}>
          <Image
            src="/seed/rachel-name.png"
            alt="Rachel Garcia"
            width={600}
            height={242}
            className={styles.nameImg}
            priority
          />
        </h1>
        <p className={`hand ${styles.tagline}`}>{content.bio.tagline}</p>
      </section>

      <div className={styles.folders}>
        <div className={styles.folderProjects}>
          <FolderIcon label="Projects" onOpen={() => openWindow("projects")} />
        </div>
        <div className={styles.folderResume}>
          <FolderIcon label="Resume" onOpen={() => openWindow("resume")} />
        </div>
        <div className={styles.folderFunFacts}>
          <FolderIcon label="Fun Facts" onOpen={() => openWindow("funfacts")} />
        </div>
        <div className={styles.folderContact}>
          <FolderIcon label="Contact Me" onOpen={() => openWindow("contact")} />
        </div>
      </div>

      {openWindows.map((id) => (
        <Window
          key={id}
          title={WINDOW_META[id].title}
          zIndex={zOrder.indexOf(id)}
          initialPosition={WINDOW_META[id].initialPosition}
          onClose={() => closeWindow(id)}
          onFocus={() => bringToFront(id)}
        >
          {id === "contact" && <ContactWindow contacts={content.contacts} />}
          {id === "projects" && <ProjectsWindow projects={content.projects} />}
          {id === "resume" && <ResumeWindow resume={content.resume} />}
          {id === "funfacts" && <FunFactsWindow />}
        </Window>
      ))}

      <figure className={styles.polaroid}>
        <Image
          src="/seed/headshot.jpg"
          alt="Rachel Garcia"
          width={480}
          height={320}
          className={styles.polaroidImg}
          priority
        />
        <figcaption className={`hand ${styles.polaroidCaption}`}>me!</figcaption>
      </figure>

      <footer className={styles.credit}>
        <a href="https://github.com/AndSam321" target="_blank" rel="noopener noreferrer">
          made by Andrew Samountry
        </a>
      </footer>
    </main>
  );
}
