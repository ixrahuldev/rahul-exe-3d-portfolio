import React from 'react';
import styles from './Hero.module.css';

export interface HeroProps {
  onExplore?: () => void;
  onOpenProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className={styles.hero} aria-label="Introduction">
      {/* Eyebrow */}
      <div className={styles.eyebrow}>
        <span>Hi, I'm Rahul</span>
      </div>

      {/* Main Heading matching exact Figma typography and colors */}
      <h1 className={styles.heading}>
        I build systems<br />
        that feel like<br />
        <span className={styles.headingPrefix}>the </span>
        <span className={styles.futureWord}>future</span>
        <span className={styles.headingPeriod}>.</span>
      </h1>

      {/* Supporting Technology Line */}
      <div className={styles.subheadline}>
        <span>Frontend Engineer</span>
        <span className={styles.tagDivider}>•</span>
        <span>React</span>
        <span className={styles.tagDivider}>•</span>
        <span>TypeScript</span>
        <span className={styles.tagDivider}>•</span>
        <span>Micro-Frontends</span>
      </div>

      {/* Concise Professional Introduction */}
      <p className={styles.description}>
        I craft modern web applications with clean code, scalable architecture and a focus on real user impact.
      </p>
      {/* <div className={styles.actions}>
        <button
          type="button"
          className={styles.exploreBtn}
          onClick={onExplore}
          aria-label="Explore My Work"
        >
          <span>Explore My Work</span>
          <ArrowRight size={15} />
        </button>
      </div> */}

      {/* Playful Handwritten Annotation with curved arrow pointing to 3D center */}
      <div className={styles.handwrittenContainer} aria-hidden="true">
        <div className={styles.handwrittenText}>
          <span>Better</span>
          <span>Experiences</span>
          <span>Ahead</span>
        </div>
        <svg
          className={styles.handwrittenArrow}
          viewBox="0 0 50 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 24 C 18 28, 34 22, 44 8" />
          <path d="M33 6 L 45 8 L 40 19" />
        </svg>
      </div>
    </section>
  );
};
