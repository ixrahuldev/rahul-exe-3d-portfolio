import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../../types';
import styles from './ProjectDetailView.module.css';

interface ProjectDetailViewProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
}) => {
  const currentIndex = Math.max(
    0,
    allProjects.findIndex((p) => p.id === project.id)
  );
  const totalCount = allProjects.length;

  // Gallery images with fallbacks
  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.image
    ? [project.image]
    : ['/projects/doe-licensing.jpg'];

  // Default to the last thumbnail (e.g. index 1 for DoE which is the skyline matching Figma active state)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(() =>
    gallery.length > 1 ? 1 : 0
  );

  // Reset image index when project changes
  useEffect(() => {
    setSelectedImageIndex(gallery.length > 1 ? 1 : 0);
  }, [project.id, gallery.length]);

  // Navigate to previous project
  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
    onSelectProject(allProjects[prevIndex]);
  }, [currentIndex, totalCount, allProjects, onSelectProject]);

  // Navigate to next project
  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalCount;
    onSelectProject(allProjects[nextIndex]);
  }, [currentIndex, totalCount, allProjects, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, onBack]);

  // Current main showcase image
  const activeImage = gallery[selectedImageIndex] || gallery[0];

  // Tech tags to display
  const displayTags =
    project.tags && project.tags.length > 0
      ? project.tags
      : project.techStack.slice(0, 4);

  // Key features fallback
  const features =
    project.keyFeatures && project.keyFeatures.length > 0
      ? project.keyFeatures
      : project.keyContributions.slice(0, 4);

  // Overview text
  const overviewText = project.overview || project.description;

  return (
    <div className={styles.pageContainer} role="region" aria-label="Project Detail View">
      {/* Background glow layers */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Top Header Navigation */}
      <header className={styles.cardHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Back to projects"
        >
          <ArrowLeft size={16} className={styles.backIcon} />
          <span>Back to projects</span>
        </button>

        <button
          type="button"
          className={styles.closeButton}
          onClick={onBack}
          aria-label="Close project view"
        >
          <X size={18} />
        </button>
      </header>

      {/* Two-Column Showcase Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column: Visual Showcase + Thumbnails + Client Badge */}
        <div className={styles.leftColumn}>
          <div className={styles.imageShowcaseFrame}>
              <img
                key={activeImage}
                src={activeImage}
                alt={project.title}
                className={styles.showcaseImage}
              />
              <div className={styles.imageInnerGlow} aria-hidden="true" />
            </div>

            {/* Bottom Overlay Row: Thumbnails and DoE / Client Frosted Glass Badge */}
            <div className={styles.mediaBottomRow}>
              {/* Thumbnails Gallery */}
              <div className={styles.thumbnailGroup}>
                {gallery.map((thumbUrl, idx) => {
                  const isActive = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumbnailBtn} ${
                        isActive ? styles.thumbnailActive : ''
                      }`}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Showcase view ${idx + 1}`}
                      aria-pressed={isActive}
                    >
                      <img
                        src={thumbUrl}
                        alt={`${project.title} angle ${idx + 1}`}
                        className={styles.thumbnailImg}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Client Info Frosted Glass Pill Badge */}
              <div className={styles.clientGlassBadge}>
                <span className={styles.badgeAcronym}>
                  {project.badgeLabel || 'DoE'}
                </span>
                <div className={styles.badgeLabelTexts}>
                  <span>
                    {project.badgeSublabel
                      ? project.badgeSublabel.split('\n')[0]
                      : project.client.split(',')[0]}
                  </span>
                  <span>
                    {project.badgeSublabel && project.badgeSublabel.includes('\n')
                      ? project.badgeSublabel.split('\n')[1]
                      : 'Abu Dhabi'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Info, Tech Stack, Overview, Key Features & Footer */}
          <div className={styles.rightColumn}>
            {/* Title & Subtitle */}
            <div className={styles.titleSection}>
              <h1 className={styles.projectTitle}>{project.title}</h1>
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
            </div>

            {/* Tech Badges Pill Row */}
            <div className={styles.techPillRow}>
              {displayTags.map((tag, tIdx) => (
                <span key={tIdx} className={styles.techPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Section: Project Overview */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>Project Overview</h2>
              <p className={styles.overviewText}>{overviewText}</p>
            </div>

            {/* Section: Key Features */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>Key Features</h2>
              <ul className={styles.featureList}>
                {features.map((feat, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <span className={styles.checkIconWrapper} aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="#38BDF8"
                          strokeWidth="1.8"
                          fill="rgba(14, 165, 233, 0.2)"
                        />
                        <path
                          d="M6 10.2L8.8 13L14 7.5"
                          stroke="#38BDF8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={styles.featureText}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Row: Visit Live Project CTA & Index Pagination */}
            <div className={styles.footerRow}>
              <a
                href={project.link || 'https://rahulsodanapalli.vercel.app'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitButton}
              >
                <span>Visit Live Project</span>
                <ArrowRight size={15} className={styles.visitArrow} />
              </a>

              <div className={styles.paginationArea}>
                <span className={styles.counterText}>
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(totalCount).padStart(2, '0')}
                </span>
                <div className={styles.arrowControls}>
                  <button
                    type="button"
                    className={styles.navArrowBtn}
                    onClick={handlePrev}
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className={styles.navArrowBtn}
                    onClick={handleNext}
                    aria-label="Next project"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
