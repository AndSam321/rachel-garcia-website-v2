import styles from "./Stars.module.css";

const STARS = [
  { top: "8%", left: "78%", size: 34, color: "var(--tan)", rotate: -12 },
  { top: "30%", left: "6%", size: 28, color: "var(--olive)", rotate: 20 },
  { top: "55%", left: "88%", size: 30, color: "var(--olive-deep)", rotate: -30 },
  { top: "78%", left: "12%", size: 24, color: "var(--tan)", rotate: 45 },
  { top: "88%", left: "70%", size: 32, color: "var(--olive)", rotate: 8 },
];

function Star({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path
        strokeLinecap="round"
        d="M12 3.5 L9.2 14.8 L19.5 8.4 L4.5 8.9 L14.9 15.2 Z"
      />
    </svg>
  );
}

export default function Stars() {
  return (
    <div className={styles.layer} aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className={styles.star}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            transform: `rotate(${s.rotate}deg)`,
          }}
        >
          <Star color={s.color} />
        </span>
      ))}
    </div>
  );
}
