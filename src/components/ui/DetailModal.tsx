import React, { useEffect } from 'react';
import { X, Mail, Phone, Globe, CheckCircle, Code } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { EXPERIENCES } from '../../data/experience';
import styles from './DetailModal.module.css';

import type { Project } from '../../types';

export type ModalType = 'projects' | 'experience' | 'about' | 'contact' | null;

export interface DetailModalProps {
  type: ModalType;
  selectedProject?: Project | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ type, selectedProject, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.eyebrow}>
              {type === 'projects' && 'Production Portfolio'}
              {type === 'experience' && 'Career History'}
              {type === 'about' && 'Profile Overview'}
              {type === 'contact' && 'Get In Touch'}
            </span>
            <h2 id="modal-title" className={styles.title}>
              {type === 'projects' && 'Enterprise & Creative Projects'}
              {type === 'experience' && 'Work Experience & Education'}
              {type === 'about' && 'About Rahul Sodanapalli'}
              {type === 'contact' && 'Direct Contact Channels'}
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Projects View */}
          {type === 'projects' && (
            <>
              {(selectedProject
                ? [selectedProject, ...PROJECTS.filter((p) => p.id !== selectedProject.id)]
                : PROJECTS
              ).map((proj) => {
                const isCurrent = selectedProject && proj.id === selectedProject.id;
                return (
                  <div
                    key={proj.id}
                    className={styles.itemCard}
                    style={
                      isCurrent
                        ? {
                            border: '1.5px solid var(--accent-violet, #7939F5)',
                            boxShadow: '0 8px 24px rgba(121, 57, 245, 0.18)',
                          }
                        : undefined
                    }
                  >
                  <div className={styles.itemHeader}>
                    <div>
                      <h3 className={styles.itemTitle}>{proj.title}</h3>
                      <p className={styles.itemSubtitle}>{proj.subtitle}</p>
                    </div>
                    <span className={styles.itemMeta}>{proj.client}</span>
                  </div>
                  <p className={styles.itemDescription}>{proj.description}</p>
                  <ul className={styles.bulletList}>
                    {proj.keyContributions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <div className={styles.tagsRow}>
                    {proj.techStack.map((tech) => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                </div>
              )
            })}
            </>
          )}

          {/* Experience View */}
          {type === 'experience' && (
            <>
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <div>
                      <h3 className={styles.itemTitle}>{exp.role}</h3>
                      <p className={styles.itemSubtitle}>{exp.company}</p>
                    </div>
                    <span className={styles.itemMeta}>{exp.period} · {exp.location}</span>
                  </div>
                  <p className={styles.itemDescription}>{exp.summary}</p>
                  <ul className={styles.bulletList}>
                    {exp.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                  <div className={styles.tagsRow}>
                    {exp.techStack.map((tech) => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* About View */}
          {type === 'about' && (
            <div className={styles.itemCard}>
              <h3 className={styles.itemTitle}>Frontend Engineer · React & TypeScript · Micro-Frontends</h3>
              <p className={styles.itemDescription}>
                I am a front-end engineer with 2+ years of enterprise experience building dynamic, resilient, and user-friendly web platforms for UAE government and utility sector clients (Abu Dhabi Department of Energy & TAQA Water Solutions).
              </p>
              <p className={styles.itemDescription}>
                My primary focus lies in architecting scalable Micro-Frontend ecosystems (Vite Plugin Federation, Module Federation), designing high-performance component systems (80+ reusable UI components), and integrating generative AI workflows into production web portals.
              </p>
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Key Competencies:</h4>
                <ul className={styles.bulletList}>
                  <li>Micro-Frontend Architecture: Module Federation, Vite Plugin Federation, RBAC gating</li>
                  <li>State & Data: Redux Toolkit, RTK Query, Axios Interceptors, Server-Sent Events (SSE)</li>
                  <li>UI & Design Engineering: MUI, Ant Design, Framer Motion, GSAP, WCAG Accessibility, RTL Support</li>
                  <li>Full-Stack & Cloud: Node.js, Express, MongoDB, Jenkins CI/CD, AWS S3 deployments</li>
                </ul>
              </div>
            </div>
          )}

          {/* Contact View */}
          {type === 'contact' && (
            <div className={styles.contactGrid}>
              <a href="mailto:rahulsodanapalli@gmail.com" className={styles.contactCard}>
                <div className={styles.contactIcon}><Mail size={20} /></div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>rahulsodanapalli@gmail.com</span>
                </div>
              </a>

              <a href="tel:+918639386059" className={styles.contactCard}>
                <div className={styles.contactIcon}><Phone size={20} /></div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>+91 86393 86059</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rahul-sodanapalli-0a49062b3"
                target="_blank"
                rel="noreferrer"
                className={styles.contactCard}
              >
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.78v8.37H6.46v-8.37M7.85 6.47a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                  </svg>
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <span className={styles.contactValue}>rahul-sodanapalli</span>
                </div>
              </a>

              <a
                href="https://github.com/rahulsodanapalli"
                target="_blank"
                rel="noreferrer"
                className={styles.contactCard}
              >
                <div className={styles.contactIcon}>
                  <Code size={20} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>GitHub</span>
                  <span className={styles.contactValue}>@rahulsodanapalli</span>
                </div>
              </a>

              <a
                href="https://rahulsodanapalli.vercel.app"
                target="_blank"
                rel="noreferrer"
                className={styles.contactCard}
              >
                <div className={styles.contactIcon}><Globe size={20} /></div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Live Portfolio</span>
                  <span className={styles.contactValue}>rahulsodanapalli.vercel.app</span>
                </div>
              </a>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}><CheckCircle size={20} /></div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Availability</span>
                  <span className={styles.contactValue}>Available for Q2 Roles</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
