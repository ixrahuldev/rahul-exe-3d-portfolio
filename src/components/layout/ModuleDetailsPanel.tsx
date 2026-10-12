import React from 'react';
import { ArrowRight, Atom, Code2, Layers, Boxes, Server, Cpu, FolderGit2, Sparkles } from 'lucide-react';
import type { TechModule } from '../../types';
import { SkillChip } from '../ui/SkillChip';
import styles from './ModuleDetailsPanel.module.css';

export interface ModuleDetailsPanelProps {
  module: TechModule;
  onSelectProject?: (projectId?: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Atom: <Atom size={22} />,
  Code2: <Code2 size={22} />,
  Layers: <Layers size={22} />,
  Boxes: <Boxes size={22} />,
  Server: <Server size={22} />,
  Cpu: <Cpu size={22} />,
  FolderGit2: <FolderGit2 size={22} />,
  Sparkles: <Sparkles size={22} />
};

export const ModuleDetailsPanel: React.FC<ModuleDetailsPanelProps> = ({
  module,
  onSelectProject
}) => {
  const iconNode = ICON_MAP[module.icon] || <Atom size={22} />;

  return (
    <aside className={styles.panel} aria-label="Selected Module Information">
      {/* Eyebrow Label */}
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLabel}>SELECTED MODULE</span>
        <span className={styles.badge} style={{ borderColor: module.color, color: module.color }}>
          ACTIVE
        </span>
      </div>

      {/* Module Title & Icon */}
      <div className={styles.moduleHeader}>
        <div className={styles.moduleIconBox} style={{ color: module.color }}>
          {iconNode}
        </div>
        <div className={styles.titleGroup}>
          <h2 className={styles.moduleTitle}>{module.name}</h2>
          <span className={styles.moduleTagline}>{module.tagline}</span>
        </div>
      </div>

      {/* Description */}
      <p className={styles.moduleDescription}>
        {module.description}
      </p>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Key Skills */}
      <div className={styles.skillsContainer}>
        <span className={styles.sectionLabel}>KEY SKILLS</span>
        <div className={styles.chipsWrapper}>
          {module.skills.map((skill) => (
            <SkillChip key={skill} label={skill} dotColor={module.color} />
          ))}
        </div>
      </div>

      {/* Subtle Divider */}
      {module.featuredProject && (
        <>
          <div className={styles.divider} />

          {/* Featured Project */}
          <div className={styles.featuredSection}>
            <span className={styles.sectionLabel}>{module.featuredProject.tag}</span>
            <div className={styles.projectCard}>
              <div className={styles.projectBadgeRow}>
                <span className={styles.projectTitle}>{module.featuredProject.title}</span>
              </div>
              <p className={styles.projectSubtitle}>{module.featuredProject.subtitle}</p>
              <button
                type="button"
                className={styles.projectAction}
                onClick={() => onSelectProject?.(module.featuredProject?.url)}
                aria-label={`View ${module.featuredProject.title}`}
              >
                <span>{module.featuredProject.linkText || 'View Project →'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
