import React from 'react';
import styles from './SkillChip.module.css';

export interface SkillChipProps {
  label: string;
  dotColor?: string;
  onClick?: () => void;
  className?: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  label,
  dotColor,
  onClick,
  className = ''
}) => {
  return (
    <span
      className={`${styles.chip} ${className}`.trim()}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {dotColor && (
        <span
          className={styles.dot}
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};
