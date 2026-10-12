import React from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './Header.module.css';

export interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeSection?: string;
  onSelectNav?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onSelectNav,
}) => {
  return (
    <header className={styles.header} role="banner">
      {/* Left Wordmark / Logo matching Figma */}
      <a
        href="#"
        className={styles.brand}
        onClick={(e) => {
          e.preventDefault();
          if (onSelectNav) onSelectNav('home');
        }}
        aria-label="RAHUL.exe Home"
      >
        <svg
          className={styles.sparkleIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          {/* 8-pointed asterisk / starburst from Figma */}
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        </svg>
        <span className={styles.brandName}>RAHUL.exe</span>
      </a>

      {/* Right Controls: Pill Theme Toggle */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.themeTogglePill}
          onClick={onToggleTheme}
          aria-label={`Toggle theme (currently ${theme})`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span className={`${styles.themeOption} ${theme === 'light' ? styles.themeOptionActive : ''}`}>
            <Sun size={13} />
          </span>
          <span className={`${styles.themeOption} ${theme === 'dark' ? styles.themeOptionActive : ''}`}>
            <Moon size={13} />
          </span>
        </button>
      </div>
    </header>
  );
};
