import React from 'react';
import styles from './ActionButton.module.css';

export interface ActionButtonProps {
  icon: string;
  label: string;
  count: number;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  count,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={styles.actionButton}
      onClick={onClick}
      aria-label={`${label}: ${count}`}
      disabled={disabled}
    >
      <div className={styles.leftSection}>
        <span className={styles.icon}>
          <img src={icon} alt={label} />
        </span>
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.countSection}>{count}</div>
    </button>
  );
};

export default ActionButton;
