import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Tech3DCanvas } from './Tech3DCanvas';
import styles from './TechStackView.module.css';

interface TechStackViewProps {
  onBack: () => void;
  onOpenProjects?: () => void;
}

export interface TechStackItem {
  id: string;
  number: string;
  name: string;
  color: string;
  title: string;
  subtitle: string;
  metrics: {
    value: string;
    label: string;
  }[];
  highlight: string;
  capabilities: string[];
  toolGroups: {
    title: string;
    items: string[];
  }[];
  nodes3D: {
    label: string;
    color: string;
    position: [number, number, number];
  }[];
}

// Tech-specific SVG icons matching Figma
export const TechIcon: React.FC<{ id: string; color?: string; size?: number }> = ({
  id,
  color = '#38BDF8',
  size = 20,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  } as const;

  switch (id) {
    case 'react':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.2" fill={color} />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.6" stroke={color} strokeWidth="1.6" />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.6"
            stroke={color}
            strokeWidth="1.6"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.6"
            stroke={color}
            strokeWidth="1.6"
            transform="rotate(120 12 12)"
          />
        </svg>
      );

    case 'typescript':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke={color} strokeWidth="1.8" />
          <path
            d="M6.5 9h5M9 9v7.5M14 9.5c.8-.6 2.2-.8 3.2 0 .8.6.8 1.8 0 2.4-1 .7-2.6.9-2.6 2.2 0 .7.6 1.4 1.8 1.4 1 0 2-.4 2.6-.9"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'micro-frontends':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="1.8" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="1.8" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="1.8" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="1.8" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg {...common}>
          <path
            d="M12 2.5L20.5 7.5V16.5L12 21.5L3.5 16.5V7.5L12 2.5Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 7.5V16.5M12 12L16.5 9.5M12 12L7.5 14.5"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'python':
      return (
        <svg {...common}>
          {/* Top Snake */}
          <path
            d="M11.5 2.5c-3.2 0-3.8 1.4-3.8 2.8v2.2h5.5v.8H5.8c-1.8 0-3.3 1.2-3.3 3.3 0 2.1 1.2 3.4 3.3 3.4h1.5v-2.2c0-1.8 1.5-3.3 3.3-3.3h5.2c1.4 0 2.4-1 2.4-2.4V5.3c0-1.6-1.5-2.8-6.7-2.8z"
            fill={color}
            opacity="0.9"
          />
          <circle cx="9.5" cy="5" r="0.9" fill="#060A12" />
          {/* Bottom Snake */}
          <path
            d="M12.5 21.5c3.2 0 3.8-1.4 3.8-2.8v-2.2h-5.5v-.8h7.4c1.8 0 3.3-1.2 3.3-3.3 0-2.1-1.2-3.4-3.3-3.4h-1.5v2.2c0 1.8-1.5 3.3-3.3 3.3H8.2c-1.4 0-2.4 1-2.4 2.4v3.6c0 1.6 1.5 2.8 6.7 2.8z"
            fill={color}
          />
          <circle cx="14.5" cy="19" r="0.9" fill="#060A12" />
        </svg>
      );

    default:
      return null;
  }
};

export const TECH_LIST: TechStackItem[] = [
  {
    id: 'react',
    number: '01',
    name: 'React',
    color: '#38BDF8',
    title: 'React Ecosystem',
    subtitle: 'Concurrent UI, reactive state, shipped at enterprise scale.',
    metrics: [
      { value: '2.4 yrs', label: 'ENTERPRISE' },
      { value: '60 FPS', label: 'RENDER LOOPS' },
      { value: '80+', label: 'CORE COMPONENTS' },
    ],
    highlight: 'In production for Abu Dhabi DoE and TAQA Water Solutions',
    capabilities: [
      'Component composition and shared libraries',
      'Concurrent mode and Suspense boundaries',
      'Micro-frontends via Module Federation',
      'Bilingual RTL and RBAC-driven UI',
    ],
    toolGroups: [
      {
        title: 'State and data',
        items: ['Redux Toolkit', 'RTK Query', 'Redux-Saga', 'TanStack Query'],
      },
      {
        title: 'UI and forms',
        items: ['MUI', 'Ant Design', 'Framer Motion', 'React Hook Form', 'Zod'],
      },
    ],
    nodes3D: [
      { label: 'Redux Toolkit', color: '#38BDF8', position: [-0.46, 0.22, 0.1] },
      { label: 'React 18 / 19', color: '#38BDF8', position: [-0.38, -0.36, 0.1] },
      { label: 'Module Federation', color: '#C084FC', position: [0.44, 0.36, 0.1] },
      { label: 'RTK Query', color: '#38BDF8', position: [0.40, -0.30, 0.1] },
    ],
  },
  {
    id: 'typescript',
    number: '02',
    name: 'TypeScript',
    color: '#3B82F6',
    title: 'TypeScript Architecture',
    subtitle: 'End-to-end type safety, strict domain modeling & compile-time correctness.',
    metrics: [
      { value: '100%', label: 'STRICT MODE' },
      { value: '0 any', label: 'TYPE DISCIPLINE' },
      { value: 'TS 5.x', label: 'COMPILER READY' },
    ],
    highlight: 'Zero runtime regressions across 12+ mission-critical releases',
    capabilities: [
      'Discriminated unions and exhaustive type checks',
      'Generic utilities and conditional mapped types',
      'Runtime schema validation with Zod and Yup',
      'AST transformation and automated type contracts',
    ],
    toolGroups: [
      {
        title: 'Type System',
        items: ['Generics & Constraints', 'Conditional Types', 'Mapped Types', 'Template Literals'],
      },
      {
        title: 'Validation & Tooling',
        items: ['Zod Schemas', 'Yup Contracts', 'TS ESLint Strict', 'Typecheck Pipelines'],
      },
    ],
    nodes3D: [
      { label: 'Strict Domain', color: '#38BDF8', position: [-0.44, 0.22, 0.05] },
      { label: 'Zod Schemas', color: '#3B82F6', position: [-0.38, -0.36, 0.08] },
      { label: 'Generics & Utility', color: '#60A5FA', position: [0.44, 0.36, 0.05] },
      { label: 'TS 5.x Toolchain', color: '#38BDF8', position: [0.40, -0.30, 0.08] },
    ],
  },
  {
    id: 'micro-frontends',
    number: '03',
    name: 'Micro-Frontends',
    color: '#F97316',
    title: 'Micro-Frontend Systems',
    subtitle: 'Decoupled domain applications orchestrated via Module Federation & host shell.',
    metrics: [
      { value: '4 Apps', label: 'FEDERATED SUITE' },
      { value: '0 Sec', label: 'SYSTEM DOWNTIME' },
      { value: 'Autonomous', label: 'DEPLOYMENTS' },
    ],
    highlight: 'Powering Abu Dhabi DoE unified licensing portal & multi-tenant shell',
    capabilities: [
      'Vite & Webpack 5 Module Federation architecture',
      'Central host shell with shared auth tokens',
      'GateKeeper RBAC & cross-application routing',
      'Shared component runtime with zero bundle duplication',
    ],
    toolGroups: [
      {
        title: 'Federation Engines',
        items: ['Vite Federation', 'Webpack 5 MF', 'Dynamic Remotes', 'Shared Scope'],
      },
      {
        title: 'Host Services',
        items: ['Central Auth', 'Theme Engine', 'Route Hub', 'S3 CDN'],
      },
    ],
    nodes3D: [
      { label: 'Host Shell', color: '#C084FC', position: [-0.44, 0.22, 0.05] },
      { label: 'Dynamic Remotes', color: '#38BDF8', position: [-0.38, -0.36, 0.08] },
      { label: 'Module Federation', color: '#F97316', position: [0.44, 0.36, 0.05] },
      { label: 'GateKeeper RBAC', color: '#10B981', position: [0.40, -0.30, 0.08] },
    ],
  },
  {
    id: 'nodejs',
    number: '04',
    name: 'Node.js',
    color: '#22C55E',
    title: 'Node.js & Backend Services',
    subtitle: 'High-concurrency microservices, SSE real-time streaming & persistent data layers.',
    metrics: [
      { value: 'Async', label: 'EVENT LOOP' },
      { value: '<50ms', label: 'API LATENCY' },
      { value: 'Real-Time', label: 'SSE STREAMS' },
    ],
    highlight: 'High-throughput telemetry ingestion & PDF certificate signing pipeline',
    capabilities: [
      'Non-blocking asynchronous I/O and stream processing',
      'Server-Sent Events (SSE) live telemetry channels',
      'JWT authentication & enterprise RBAC middleware',
      'MongoDB aggregation pipelines and Redis caching',
    ],
    toolGroups: [
      {
        title: 'Runtime & APIs',
        items: ['Node.js 20+ LTS', 'Express.js', 'REST APIs', 'SSE Channels'],
      },
      {
        title: 'Data & Security',
        items: ['MongoDB', 'Redis', 'JWT Auth', 'Docker Containers'],
      },
    ],
    nodes3D: [
      { label: 'Event Loop', color: '#22C55E', position: [-0.44, 0.22, 0.05] },
      { label: 'SSE Streams', color: '#4ADE80', position: [-0.38, -0.36, 0.08] },
      { label: 'Express & REST', color: '#38BDF8', position: [0.44, 0.36, 0.05] },
      { label: 'MongoDB & Redis', color: '#16A34A', position: [0.40, -0.30, 0.08] },
    ],
  },
  {
    id: 'python',
    number: '05',
    name: 'Python',
    color: '#FBBF24',
    title: 'Python & FastAPI Stack',
    subtitle: 'High-throughput async APIs, document validation pipelines & LLM workflow integration.',
    metrics: [
      { value: '3.12', label: 'ASYNC PYTHON' },
      { value: '100%', label: 'PYDANTIC V2' },
      { value: 'LLM OCR', label: 'AI WORKFLOWS' },
    ],
    highlight: 'Automated compliance verification engine for regulatory utility filings',
    capabilities: [
      'High-speed async API design with FastAPI and Starlette',
      'Type-safe data serialization via Pydantic v2',
      'LLM certificate validation & OCR confidence scoring',
      'AsyncIO background worker queues and batch processing',
    ],
    toolGroups: [
      {
        title: 'Frameworks & Data',
        items: ['FastAPI', 'Starlette', 'Pydantic v2', 'NumPy'],
      },
      {
        title: 'AI & Automation',
        items: ['LangChain Tools', 'LLM Document OCR', 'AsyncIO Tasks', 'PyTest'],
      },
    ],
    nodes3D: [
      { label: 'FastAPI Async', color: '#FBBF24', position: [-0.44, 0.22, 0.05] },
      { label: 'AsyncIO Engine', color: '#38BDF8', position: [-0.38, -0.36, 0.08] },
      { label: 'LLM Pipelines', color: '#F59E0B', position: [0.44, 0.36, 0.05] },
      { label: 'Pydantic v2', color: '#60A5FA', position: [0.40, -0.30, 0.08] },
    ],
  },
];

export const TechStackView: React.FC<TechStackViewProps> = ({ onBack }) => {
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  const activeTech = TECH_LIST[activeTechIndex] || TECH_LIST[0];

  const handlePrev = useCallback(() => {
    setActiveTechIndex((prev) => (prev - 1 + TECH_LIST.length) % TECH_LIST.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveTechIndex((prev) => (prev + 1) % TECH_LIST.length);
  }, []);

  // Keyboard navigation matching hint bar
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

  return (
    <div className={styles.pageContainer} role="region" aria-label="Technical Stack 3D Showcase">
      {/* Top Header Bar matching Figma */}
      <header className={styles.topHeader}>
        <div className={styles.brandGroup}>
          <svg
            className={styles.sparkleIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
          </svg>
          <span className={styles.brandName}>RAHUL.exe</span>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={onBack}
          aria-label="Close tech stack view"
        >
          <X size={18} />
        </button>
      </header>

      {/* Main Layout: Left Constellations + Center 3D + Right Console */}
      <div className={styles.mainLayout}>
        {/* Left Vertical Navigation Rail matching Figma */}
        <nav className={styles.leftRail} aria-label="Constellations">
          <div className={styles.constellationsHeader}>
            <svg
              className={styles.constellationIcon}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="3" cy="8" r="1.5" />
              <circle cx="13" cy="4" r="1.5" />
              <circle cx="10" cy="13" r="1.5" />
              <line x1="4.5" y1="7.5" x2="11.5" y2="4.5" strokeOpacity="0.5" />
              <line x1="3.5" y1="9.5" x2="8.8" y2="12.2" strokeOpacity="0.5" />
            </svg>
            <span className={styles.constellationsTitle}>CONSTELLATIONS</span>
          </div>

          {TECH_LIST.map((tech, idx) => {
            const isActive = idx === activeTechIndex;
            return (
              <button
                key={tech.id}
                type="button"
                className={`${styles.railItem} ${isActive ? styles.railItemActive : ''}`}
                onClick={() => setActiveTechIndex(idx)}
                aria-pressed={isActive}
              >
                <div className={styles.railItemLeft}>
                  <div className={styles.railIconBox}>
                    <TechIcon id={tech.id} color={isActive ? '#38BDF8' : '#94A3B8'} size={18} />
                  </div>
                  <span className={styles.railName}>{tech.name}</span>
                </div>
                <span className={styles.railIndex}>{tech.number}</span>
              </button>
            );
          })}
        </nav>

        {/* Center: Interactive 3D Animated Canvas + Pedestal + Hints */}
        <div className={styles.centerStage}>
          <div className={styles.canvasWrapper}>
            <Tech3DCanvas activeTech={activeTech} onSelectTechIndex={setActiveTechIndex} />
          </div>

          {/* Bottom hint controls matching Figma */}
          <div className={styles.bottomHintBar}>
            <span className={styles.hintItem}>
              <span className={styles.hintKey}>DRAG</span>
              <span className={styles.hintDot}>·</span>
              <span className={styles.hintAction}>orbit</span>
            </span>
            <span className={styles.hintItem}>
              <span className={styles.hintKey}>SCROLL</span>
              <span className={styles.hintDot}>·</span>
              <span className={styles.hintAction}>zoom</span>
            </span>
            <span className={styles.hintItem}>
              <span className={styles.hintKey}>CLICK NODE</span>
              <span className={styles.hintDot}>·</span>
              <span className={styles.hintAction}>inspect</span>
            </span>
            <span className={styles.hintItem}>
              <span className={styles.hintKey}>← →</span>
              <span className={styles.hintDot}>·</span>
              <span className={styles.hintAction}>switch</span>
            </span>
          </div>
        </div>

        {/* Right: Technical Mastery Console matching Figma */}
        <aside className={styles.rightCard}>
          {/* Card Header with Squarish Icon + Titles */}
          <div className={styles.cardHeader}>
            <div className={styles.headerIconBox}>
              <TechIcon id={activeTech.id} color="#38BDF8" size={26} />
            </div>
            <div className={styles.headerTextGroup}>
              <h2 className={styles.techTitle}>{activeTech.title}</h2>
              <p className={styles.techSubtitle}>{activeTech.subtitle}</p>
            </div>
          </div>

          {/* Metrics Grid: 3 columns */}
          <div className={styles.metricsGrid}>
            {activeTech.metrics.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Highlight Callout Box matching Figma */}
          <div className={styles.highlightBox}>
            <span className={styles.highlightDot} />
            <span className={styles.highlightText}>{activeTech.highlight}</span>
          </div>

          {/* Architectural Capabilities Section with 01 02 03 04 indices */}
          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>ARCHITECTURAL CAPABILITIES</h3>
            <ul className={styles.capabilitiesList}>
              {activeTech.capabilities.map((cap, idx) => (
                <li key={cap} className={styles.capabilityItem}>
                  <span className={styles.capabilityIndex}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.capabilityText}>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Section with Groups and Pill Badges */}
          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>TOOLS</h3>
            <div className={styles.toolsGroup}>
              {activeTech.toolGroups.map((group) => (
                <div key={group.title} className={styles.toolSubgroup}>
                  <span className={styles.toolSubgroupHeading}>{group.title}</span>
                  <div className={styles.pillsRow}>
                    {group.items.map((tool) => (
                      <span key={tool} className={styles.toolPill}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};