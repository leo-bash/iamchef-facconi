import styles from './Badge.module.css';

interface BadgeProps {
  label: string;
  onRemove?: () => void;
}

function Badge({ label, onRemove }: BadgeProps) {
  return (
    <span className={styles.badge}>
      {label}
      {onRemove && (
        <button className={styles.removeBtn} onClick={onRemove} aria-label={`Remove ${label}`}>
          X
        </button>
      )}
    </span>
  );
}

export default Badge;
