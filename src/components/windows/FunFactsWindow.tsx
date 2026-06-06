/* eslint-disable @next/next/no-img-element */
import styles from "./FunFactsWindow.module.css";

const PLAYLIST_URL =
  "https://open.spotify.com/playlist/4Qy8qzSkHnsSTLjS2sFnvj?si=PNY5zDRXRlSJ-Z64eqDQ2A";

const HOBBIES = ["traveling", "hiking", "reading", "walking"];

export default function FunFactsWindow() {
  return (
    <div className={styles.funFacts}>
      <section className={styles.row}>
        <a
          className={styles.vinyl}
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="My playlist on Spotify"
        >
          <span className={styles.groove} />
          <span className={styles.grooveInner} />
          <img className={styles.vinylLabel} src="/seed/playlist-cover.jpg" alt="" />
          <span className={styles.vinylHole} />
        </a>
        <div>
          <h3 className={`hand ${styles.heading}`}>what I&apos;m listening to</h3>
          <p className={styles.caption}>my 2026 favorites — give it a spin</p>
        </div>
      </section>

      <section className={styles.row}>
        <img
          className={styles.book}
          src="/seed/current-read.jpg"
          alt="The Math of Life and Death book cover"
        />
        <div>
          <h3 className={`hand ${styles.heading}`}>current read</h3>
          <p className={styles.caption}>
            The Math of Life and Death: 7 Mathematical Principles That Shape Our
            Lives <span className={styles.author}>by Kit Yates</span>
          </p>
          <p className={`hand ${styles.blurb}`}>
            Perfect read for any learner, no math skills required! Yates makes
            you rethink your day to day and realize that math is everywhere
          </p>
        </div>
      </section>

      <section className={styles.row}>
        <img
          className={styles.hobbyPhoto}
          src="/seed/hobbies.jpg"
          alt="Rachel on the steps of Old San Juan"
        />
        <div>
          <h3 className={`hand ${styles.heading}`}>hobbies</h3>
          <ul className={styles.hobbies}>
            {HOBBIES.map((h) => (
              <li key={h} className="hand">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
