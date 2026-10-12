import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, CheckCircle2, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { Tech3DCanvas } from './Tech3DCanvas';
import styles from './TechStackView.module.css';

interface TechStackViewProps {
  onBack: () => void;
  onOpenProjects: () => void;
}

interface TechData {
  id: string;
  name: string;
  iconLabel: string;
  color: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  pillars: string[];
  skills: {
    category: string;
    items: string[];
  }[];
}

const TECH_LIST: TechData[] = [
  {
    id: 'react',
    name: 'React',
    iconLabel: '⚛',
    color: '#00B4D8',
    title: 'React Ecosystem',
    subtitle: 'High-performance UI architecture, concurrent rendering & reactive state engines.',
    description:
      'Engineered large-scale enterprise portals with React 18/19, leveraging component composition, custom hook abstractions, and optimized virtual DOM reconciliation for sub-second user flows.',
    metrics: [
      { label: 'Enterprise Delivery', value: '2+ Years' },
      { label: 'Render Loops', value: '60 FPS' },
      { label: 'Core Components', value: '80+ UI Lib' },
    ],
    pillars: [
      'Component Composition & Clean Architecture',
      'Concurrent Mode & Suspense Boundaries',
      'Optimized Virtual DOM Reconciliation',
      'Event-Driven Reactive State Workflows',
    ],
    skills: [
      {
        category: 'Core & Architecture',
        items: ['React 18 / 19', 'Hooks Architecture', 'Context Engine', 'Server-Sent Events'],
      },
      {
        category: 'State & Data Fetching',
        items: ['Redux Toolkit', 'RTK Query', 'Redux-Saga', 'React Query / TanStack'],
      },
      {
        category: 'UI & Systems',
        items: ['MUI / Material UI', 'Ant Design', 'Framer Motion', 'Tailwind / Vanilla CSS'],
      },
      {
        category: 'Forms & Validation',
        items: ['React Hook Form', 'Yup Validation', 'Zod Schemas', 'Controlled Flows'],
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconLabel: 'TS',
    color: '#3B82F6',
    title: 'TypeScript Architecture',
    subtitle: 'End-to-end type safety, strict domain modeling & compile-time correctness.',
    description:
      'Architected mission-critical enterprise systems using strict TypeScript patterns. Zero use of loose types, enforcing complete domain type safety, discriminated unions, and automated schema inference.',
    metrics: [
      { label: 'Type Strictness', value: '100% Strict' },
      { label: 'Runtime Safety', value: 'Zod + Yup' },
      { label: 'Toolchain', value: 'TS 5.x Ready' },
    ],
    pillars: [
      'Strict Domain Modeling & Discriminated Unions',
      'Advanced Generic Types & Utility Combinators',
      'Runtime Schema Validation with Type Inference',
      'AST-Driven Linters & Zero-Any Enforcement',
    ],
    skills: [
      {
        category: 'Type System',
        items: ['Generics & Constraints', 'Conditional Types', 'Mapped Types', 'Template Literals'],
      },
      {
        category: 'Validation & Schemas',
        items: ['Zod Schema Inference', 'Yup Contracts', 'Type Guards', 'Branded Types'],
      },
      {
        category: 'Tooling & Build',
        items: ['TypeScript 5.x', 'tsc Compiler', 'TS ESLint Strict', 'Typecheck Pipelines'],
      },
    ],
  },
  {
    id: 'micro-frontends',
    name: 'Micro-Frontends',
    iconLabel: '◈',
    color: '#F97316',
    title: 'Micro-Frontend Systems',
    subtitle: 'Decoupled domain applications orchestrated via Module Federation & host shell architecture.',
    description:
      'Engineered scalable micro-frontend architectures with Vite Plugin Federation and Webpack 5. Implemented shared design libraries, centralized authentication contexts, and privilege-based GateKeeper RBAC.',
    metrics: [
      { label: 'Topology', value: 'Host + Federated' },
      { label: 'Rollback Risk', value: 'Zero Systemwide' },
      { label: 'Deployment', value: 'Autonomous S3' },
    ],
    pillars: [
      'Vite & Webpack Module Federation Architecture',
      'Central Host Shell (taqa-shell-ui) Orchestration',
      'GateKeeper Role-Based Access Control (RBAC)',
      'Shared Design System Library (80+ Components)',
    ],
    skills: [
      {
        category: 'Federation Engines',
        items: ['Vite Plugin Federation', 'Webpack 5 MF', 'Dynamic Remotes', 'Shared Dependencies'],
      },
      {
        category: 'Core Host Services',
        items: ['Shared Auth Tokens', 'Theme Broadcasting', 'Cross-App Routing', 'Shared Loaders'],
      },
      {
        category: 'Governance & CI/CD',
        items: ['Independent Deployments', 'Version Locking', 'AWS S3 Hosting', 'Jenkins Pipelines'],
      },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    iconLabel: '⬡',
    color: '#22C55E',
    title: 'Node.js & Backend Services',
    subtitle: 'High-concurrency microservices, SSE real-time streaming & persistent data layers.',
    description:
      'Developed low-latency backend microservices and API gateways handling authentication, document validation queues, and real-time Server-Sent Events (SSE) data streams.',
    metrics: [
      { label: 'Concurrency', value: 'Async Event Loop' },
      { label: 'Real-Time', value: 'SSE Streaming' },
      { label: 'Data Stores', value: 'MongoDB + Redis' },
    ],
    pillars: [
      'Asynchronous Event-Driven Non-blocking I/O',
      'Server-Sent Events (SSE) Real-Time Data Channels',
      'JWT Authentication & Privilege Middleware',
      'Scalable MongoDB Aggregations & Indexing',
    ],
    skills: [
      {
        category: 'Runtime & Frameworks',
        items: ['Node.js 20+ LTS', 'Express.js', 'REST API Design', 'SSE Channels'],
      },
      {
        category: 'Databases & Auth',
        items: ['MongoDB / Mongoose', 'JWT Authentication', 'RBAC Middleware', 'Bcrypt Security'],
      },
      {
        category: 'DevOps & Tooling',
        items: ['Docker Containers', 'NPM Workspaces', 'Postman Testing', 'Axios Interceptors'],
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    iconLabel: '🐍',
    color: '#FBBF24',
    title: 'Python & FastAPI Stack',
    subtitle: 'High-throughput async APIs, document validation pipelines & LLM workflow integration.',
    description:
      'Engineered asynchronous Python pipelines for document validation, LLM-backed confidence scoring on regulatory certificates, and high-performance automated data processing.',
    metrics: [
      { label: 'API Framework', value: 'FastAPI Async' },
      { label: 'Validation', value: 'Pydantic v2' },
      { label: 'AI Integration', value: 'LLM Document OCR' },
    ],
    pillars: [
      'High-Speed Async API Design with FastAPI',
      'Type-Safe Data Serialization via Pydantic v2',
      'AI / LLM Document Verification Scoring',
      'Asynchronous Event Processing with AsyncIO',
    ],
    skills: [
      {
        category: 'Core Frameworks',
        items: ['Python 3.12', 'FastAPI', 'Starlette', 'Uvicorn Server'],
      },
      {
        category: 'Data & Schemas',
        items: ['Pydantic v2', 'NumPy', 'JSON Schema', 'PDF Processing'],
      },
      {
        category: 'AI & Automation',
        items: ['LLM Document Scoring', 'LangChain Tools', 'PyTest Test Suites', 'AsyncIO Tasks'],
      },
    ],
  },
];

export const TechStackView: React.FC<TechStackViewProps> = ({
  onBack,
  onOpenProjects,
}) => {
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  const activeTech = TECH_LIST[activeTechIndex] || TECH_LIST[0];

  const handlePrev = useCallback(() => {
    setActiveTechIndex((prev) => (prev - 1 + TECH_LIST.length) % TECH_LIST.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveTechIndex((prev) => (prev + 1) % TECH_LIST.length);
  }, []);

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

  return (
    <div className={styles.pageContainer} role="region" aria-label="Technical Stack 3D Showcase">
      {/* Top Header Bar matching Figma */}
      <header className={styles.topHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.brandTitle}>
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
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to universe"
          >
            <ArrowLeft size={15} />
            <span>Back to universe</span>
          </button>
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

      {/* Main Layout: Left Vertical Rail + Center 3D Object + Right Technical Mastery Console */}
      <div className={styles.mainLayout}>
        {/* Left Vertical Navigation Rail matching Figma */}
        <nav className={styles.leftRail} aria-label="Tech Stack Navigation">
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
                <span
                  className={styles.railIconBadge}
                  style={
                    isActive
                      ? {
                          borderColor: tech.color,
                          backgroundColor: `${tech.color}25`,
                          boxShadow: `0 0 14px ${tech.color}70`,
                        }
                      : undefined
                  }
                >
                  {tech.id === 'react' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#38BDF8" strokeWidth="1.6" />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="10"
                        ry="4"
                        stroke="#38BDF8"
                        strokeWidth="1.6"
                        transform="rotate(60 12 12)"
                      />
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="10"
                        ry="4"
                        stroke="#38BDF8"
                        strokeWidth="1.6"
                        transform="rotate(120 12 12)"
                      />
                    </svg>
                  ) : (
                    <span className={styles.iconGlyph}>{tech.iconLabel}</span>
                  )}
                </span>
                <span className={styles.railLabel}>{tech.name}</span>
              </button>
            );
          })}

          {/* Projects Entry Point */}
          <button
            type="button"
            className={`${styles.railItem} ${styles.railItemProjects}`}
            onClick={onOpenProjects}
            aria-label="Navigate to Projects"
          >
            <span className={styles.railIconBadgeProjects}>
              {'</>'}
            </span>
            <span className={styles.railLabel}>Projects</span>
          </button>
        </nav>

        {/* Center: Interactive 3D Animated Canvas */}
        <div className={styles.centerStage}>
          <Tech3DCanvas activeTechId={activeTech.id} />
        </div>

        {/* Right: Technical Mastery Console (Pure Tech & Architecture - No Project Details) */}
        <aside className={styles.rightCard}>
          {/* Card Header with Tech Icon & Title */}
          <div className={styles.cardHeader}>
            <div
              className={styles.headerIconBox}
              style={{
                borderColor: `${activeTech.color}60`,
                backgroundColor: `${activeTech.color}18`,
              }}
            >
              {activeTech.id === 'react' ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="#38BDF8" />
                  <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="#38BDF8" strokeWidth="1.8" />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="11"
                    ry="4.5"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                    transform="rotate(60 12 12)"
                  />
                  <ellipse
                    cx="12"
                    cy="12"
                    rx="11"
                    ry="4.5"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                    transform="rotate(120 12 12)"
                  />
                </svg>
              ) : activeTech.id === 'typescript' ? (
                <ShieldCheck size={28} color="#3B82F6" />
              ) : activeTech.id === 'micro-frontends' ? (
                <Cpu size={28} color="#F97316" />
              ) : (
                <Zap size={28} color={activeTech.color} />
              )}
            </div>
            <div>
              <h2 className={styles.techTitle}>{activeTech.title}</h2>
              <p className={styles.techSubtitle}>{activeTech.subtitle}</p>
            </div>
          </div>

          {/* Metric Stats Chips */}
          <div className={styles.metricsGrid}>
            {activeTech.metrics.map((m, mIdx) => (
              <div key={mIdx} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Section: Architectural Pillars */}
          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>Architectural Capabilities</h3>
            <ul className={styles.pillarList}>
              {activeTech.pillars.map((pillar, pIdx) => (
                <li key={pIdx} className={styles.pillarItem}>
                  <CheckCircle2
                    size={16}
                    color={activeTech.color}
                    className={styles.pillarCheckIcon}
                  />
                  <span className={styles.pillarText}>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Categorized Skills & Libraries */}
          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>Specialized Libraries & Tools</h3>
            <div className={styles.categoriesGroup}>
              {activeTech.skills.map((cat, cIdx) => (
                <div key={cIdx} className={styles.categorySubgroup}>
                  <span className={styles.categoryHeading}>{cat.category}</span>
                  <div className={styles.skillsPillGroup}>
                    {cat.items.map((skill) => (
                      <span key={skill} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Control */}
          <div className={styles.cardFooter}>
            <span className={styles.navHint}>Use arrows or keys to explore stack</span>
            <div className={styles.paginationPill}>
              <button
                type="button"
                className={styles.pArrowBtn}
                onClick={handlePrev}
                aria-label="Previous tech stack"
              >
                <ChevronLeft size={15} />
              </button>
              <span className={styles.pageNumber}>
                {String(activeTechIndex + 1).padStart(2, '0')} / {String(TECH_LIST.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className={styles.pArrowBtn}
                onClick={handleNext}
                aria-label="Next tech stack"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
