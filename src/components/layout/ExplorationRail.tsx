import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { TechModule } from '../../types';
import styles from './ExplorationRail.module.css';

export interface ExplorationRailProps {
  modules: TechModule[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onExplorePromptClick?: () => void;
}

export const ExplorationRail: React.FC<ExplorationRailProps> = ({
  modules,
  currentIndex,
  onSelectIndex,
  onExplorePromptClick
}) => {
  const displayModules = modules.length > 8 ? modules.slice(0, 8) : modules;
  const safeIndex = Math.min(currentIndex, displayModules.length - 1);
  const formattedIndex = String(safeIndex + 1).padStart(2, '0');
  const formattedTotal = String(displayModules.length).padStart(2, '0');

  return (
    <footer className={styles.railContainer} aria-label="Universe Exploration Indicator">
      {/* Left Group: 01 / 08 —— TECH UNIVERSE and Progress Dots */}
      <div className={styles.leftGroup}>
        <div className={styles.indicatorLabelGroup}>
          <span className={styles.numericCounter}>
            {formattedIndex} / {formattedTotal}
          </span>
          <span className={styles.dividerLine} aria-hidden="true">—</span>
          <span className={styles.railTitle}>TECH UNIVERSE</span>
        </div>

        {/* 8-marker progress track attached on the left as in Figma */}
        <div className={styles.markersTrack} role="tablist" aria-label="Technology modules progress">
          <div className={styles.trackLine} aria-hidden="true" />
          {displayModules.map((mod, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={mod.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Select ${mod.name} module`}
                className={`${styles.markerBtn} ${isActive ? styles.markerActive : ''}`}
                onClick={() => onSelectIndex(idx)}
                title={mod.name}
              >
                <span className={styles.markerCircle} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Prompt */}
      <button
        type="button"
        className={styles.rightPrompt}
        onClick={onExplorePromptClick}
        aria-label="Select a module to explore"
      >
        <span>Select a module to explore</span>
        <ArrowUpRight size={16} className={styles.promptIcon} />
      </button>
    </footer>
  );
};
