import styles from "./FolderIcon.module.css";

type Props = {
  label: string;
  onOpen: () => void;
};

export default function FolderIcon({ label, onOpen }: Props) {
  return (
    <button type="button" className={styles.folder} onClick={onOpen}>
      <svg
        className={styles.icon}
        viewBox="0 0 64 48"
        fill="var(--blue-light)"
        stroke="var(--blue-slate)"
        strokeWidth="2"
      >
        <path d="M4 10 q0 -4 4 -4 h16 l5 6 h27 q4 0 4 4 v24 q0 4 -4 4 H8 q-4 0 -4 -4 Z" />
      </svg>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
