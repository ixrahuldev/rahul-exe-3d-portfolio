import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Project } from '../../types';
import styles from './ProjectsCylinderCarousel.module.css';

export interface ProjectsCylinderCarouselProps {
  projects: Project[];
  initialIndex?: number;
  onBack?: () => void;
  onOpenProjectDetails: (project: Project) => void;
  isZoomingIn?: boolean;
}

export const ProjectsCylinderCarousel: React.FC<ProjectsCylinderCarouselProps> = ({
  projects,
  initialIndex = 2, // 2 is DoE Licensing Platform, matching Figma image
  onBack,
  onOpenProjectDetails,
  isZoomingIn = true,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const totalCount = projects.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const isWheelingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);
  }, [totalCount]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCount);
  }, [totalCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape' && onBack) {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, onBack]);

  // Mouse wheel / trackpad rotation with smooth debounce
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow slight delta tolerance
      if (Math.abs(e.deltaX) < 15 && Math.abs(e.deltaY) < 15) return;
      e.preventDefault();

      if (isWheelingRef.current) return;
      isWheelingRef.current = true;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      setTimeout(() => {
        isWheelingRef.current = false;
      }, 350);
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [handlePrev, handleNext]);

  // Touch and pointer drag for intuitive rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  // Helper to calculate 3D transformation for each cylinder relative to active index
  const getCylinderTransformStyle = (index: number) => {
    // Offset in range [-2, 2] for 5 items
    let offset = (index - activeIndex) % totalCount;
    if (offset > Math.floor(totalCount / 2)) {
      offset -= totalCount;
    } else if (offset < -Math.floor(totalCount / 2)) {
      offset += totalCount;
    }

    // Geometry matching the curved 3D arc in Figma
    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 10;
    let pointerEvents: 'auto' | 'none' = 'auto';

    if (offset === 0) {
      // Center Active Cylinder
      translateX = 0;
      translateZ = 70;
      rotateY = 0;
      scale = 1.05;
      opacity = 1;
      zIndex = 20;
    } else if (offset === -1) {
      // Inner Left (RWQRS)
      translateX = -250;
      translateZ = -30;
      rotateY = 12;
      scale = 0.86;
      opacity = 0.88;
      zIndex = 14;
    } else if (offset === 1) {
      // Inner Right (IRS)
      translateX = 250;
      translateZ = -30;
      rotateY = -12;
      scale = 0.86;
      opacity = 0.88;
      zIndex = 14;
    } else if (offset === -2) {
      // Outer Left (TAQA)
      translateX = -470;
      translateZ = -140;
      rotateY = 24;
      scale = 0.72;
      opacity = 0.7;
      zIndex = 8;
    } else if (offset === 2) {
      // Outer Right (Gas Registry)
      translateX = 470;
      translateZ = -140;
      rotateY = -24;
      scale = 0.72;
      opacity = 0.7;
      zIndex = 8;
    } else {
      // Hidden behind in depth if more than 5
      translateX = offset < 0 ? -600 : 600;
      translateZ = -300;
      rotateY = offset < 0 ? 35 : -35;
      scale = 0.5;
      opacity = 0;
      zIndex = 1;
      pointerEvents = 'none';
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents,
    };
  };

  return (
    <div
      className={`${styles.projectsContainer} ${isZoomingIn ? styles.zoomInAnimation : ''}`}
      aria-label="Featured Projects 3D Cylinder Showcase"
    >
      {/* Top Header with Back Button & Title */}
      <div className={styles.topHeader}>
        {onBack && (
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to Tech Universe"
          >
            <ArrowLeft size={15} className={styles.backArrow} />
            <span>Back to Universe</span>
          </button>
        )}
        <div className={styles.headingGroup}>
          <h2 className={styles.mainTitle}>Featured Projects</h2>
          <p className={styles.subTitle}>Real-world solutions. Built with modern technologies.</p>
        </div>
      </div>

      {/* 3D Stage Arena */}
      <div
        className={styles.stageWrapper}
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Left Arrow Button (<) */}
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous project"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        {/* Right Arrow Button (>) */}
        <button
          type="button"
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next project"
        >
          <ChevronRight size={20} strokeWidth={2.4} />
        </button>

        {/* Floating Luminous Water Drops / Specular Beads */}
        <div className={`${styles.floatingOrb} ${styles.orb1}`} aria-hidden="true" />
        <div className={`${styles.floatingOrb} ${styles.orb2}`} aria-hidden="true" />
        <div className={`${styles.floatingOrb} ${styles.orb3}`} aria-hidden="true" />

        {/* 3D Floor Light Dais: Concentric Glowing Rings */}
        <div className={styles.floorDais} aria-hidden="true">
          <svg
            className={styles.ringSvg}
            viewBox="0 0 760 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="ringGlowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7939F5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#13C9F4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#7939F5" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cyanRingStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#13C9F4" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#13C9F4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#13C9F4" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="purpleRingStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#7939F5" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Inner Glowing Core */}
            <ellipse cx="380" cy="110" rx="340" ry="85" fill="url(#ringGlowGradient)" />

            {/* Primary Inner Cyan Ring */}
            <ellipse
              cx="380"
              cy="110"
              rx="230"
              ry="54"
              stroke="url(#cyanRingStroke)"
              strokeWidth="2.4"
            />

            {/* Secondary Violet Ring */}
            <ellipse
              cx="380"
              cy="110"
              rx="300"
              ry="72"
              stroke="url(#purpleRingStroke)"
              strokeWidth="2"
            />

            {/* Outer Subtle Perimeter Ring */}
            <ellipse
              cx="380"
              cy="110"
              rx="360"
              ry="86"
              stroke="#B49AFF"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              strokeDasharray="4 6"
            />
          </svg>
        </div>

        {/* Cylinder Track with 5 Glass Cylinder Pods */}
        <div className={styles.cylinderTrack}>
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            const style = getCylinderTransformStyle(idx);
            const displayTitle = proj.shortTitle || proj.title;
            const tags = proj.tags || proj.techStack.slice(0, 3);

            return (
              <div
                key={proj.id}
                className={styles.cylinderItem}
                style={style}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                role="group"
                aria-label={`${proj.title} cylinder`}
              >
                {/* Glass Cylinder Outer Shell */}
                <div className={`${styles.glassPod} ${isActive ? styles.activePod : ''}`}>
                  {/* Top Glowing Glass Rim */}
                  <div className={styles.topGlassRim} aria-hidden="true" />

                  {/* Photorealistic Curved Lateral Glass Specular Sheen */}
                  <div className={styles.glassSheenOverlay} aria-hidden="true" />

                  {/* Top Holographic Screen (Upper 52%) */}
                  <div className={styles.podDisplayScreen}>
                    {proj.image && (
                      <img
                        src={proj.image}
                        alt={`${proj.title} preview`}
                        className={styles.podDisplayImage}
                        loading="lazy"
                      />
                    )}
                    <div className={styles.imageGradientFade} aria-hidden="true" />
                  </div>

                  {/* Lower Dark Console (Bottom 48%) */}
                  <div className={styles.podContent}>
                    <h3 className={styles.podTitle}>{displayTitle}</h3>

                    {/* Tech Badges in Figma Pill style */}
                    <div className={styles.tagRow}>
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className={styles.techTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Center Active Cylinder CTA */}
                    {isActive ? (
                      <button
                        type="button"
                        className={styles.viewDetailsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProjectDetails(proj);
                        }}
                        aria-label={`View details for ${proj.title}`}
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} className={styles.btnArrow} />
                      </button>
                    ) : (
                      <div style={{ height: '32px' }} aria-hidden="true" />
                    )}
                  </div>

                  {/* Bottom Glowing Glass Rim */}
                  <div className={styles.bottomGlassRim} aria-hidden="true" />
                </div>

                {/* Contact Shadow beneath cylinder base on floor */}
                <div className={styles.contactShadow} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation: 02 / 05 Progress Bar & Handwritten Note */}
      <div className={styles.footerRow}>
        {/* Bottom Left: Pagination Counter & Segmented Progress Bar */}
        <div className={styles.paginationGroup}>
          <span className={styles.indexCounter}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
          </span>
          <div className={styles.progressTrack}>
            {projects.map((_, pIdx) => (
              <span
                key={pIdx}
                className={`${styles.progressSegment} ${
                  pIdx === activeIndex ? styles.progressSegmentActive : ''
                }`}
                onClick={() => setActiveIndex(pIdx)}
                aria-label={`Go to slide ${pIdx + 1}`}
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
        </div>

        {/* Bottom Right: Hand-drawn Sketch "Scroll to rotate ~>" */}
        <div className={styles.rotateNoteGroup} aria-hidden="true">
          <span className={styles.rotateNoteText}>Scroll to rotate</span>
          <svg
            className={styles.rotateNoteArrow}
            viewBox="0 0 42 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Playful curved looping arrow */}
            <path d="M4 22 C 16 26, 28 20, 36 8" />
            <path d="M26 6 L 37 8 L 32 18" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCylinderCarousel;
