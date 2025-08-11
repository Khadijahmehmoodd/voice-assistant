'use client';
import styles from './spinner.module.css';

export default function OvalSpinner({ size = 80 }: { size?: number }) {
  return (
    <div
      role="status"
      aria-label="loading"
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderWidth: Math.max(2, Math.round(size / 12)),
      }}
    />
  );
}