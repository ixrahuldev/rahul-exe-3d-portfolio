import type { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'innovatech-software-engineer',
    role: 'Software Engineer — Front-End Developer',
    company: 'Innovatech Technology Solutions',
    period: 'July 2024 – Present',
    location: 'Hyderabad, India',
    summary: 'Building mission-critical enterprise web applications and federated micro-frontend platforms for UAE government and utility sector clients.',
    achievements: [
      'Architected Micro-Frontend ecosystems using Vite Plugin Federation, decoupling Gas Registry, Finance, Compliance, Economics, and Incident Reporting into independently deployable codebases.',
      'Integrated Generative AI Document Validation (AiFileView widget) that triggers background LLM parsing on Emirates IDs and permits with live confidence scores.',
      'Engineered a real-time AI Chat Drawer powered by Server-Sent Events (SSE) with optimized text-decoding logic for low-latency streaming responses.',
      'Designed and published a shared component library of 80+ reusable UI components, improving consistency and reducing bundle size across all micro-frontends.',
      'Delivered a 30% reduction in page load time through code splitting, lazy loading, and skeleton loaders.',
      'Implemented granular RBAC with a custom GateKeeper component enforcing privilege-based rendering across multi-level approval workflows.'
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Micro-Frontends',
      'Module Federation',
      'Vite',
      'Redux Toolkit',
      'RTK Query',
      'MUI',
      'Ant Design',
      'SSE',
      'ApexCharts',
      'AWS S3'
    ]
  },
  {
    id: 'presidency-university-education',
    role: 'B.Tech in Computer Science & Engineering',
    company: 'Presidency University',
    period: 'July 2019 – August 2023',
    location: 'Bangalore, Karnataka, India',
    summary: 'Graduated with strong foundations in data structures, algorithms, computer architecture, distributed systems, and web technologies.',
    achievements: [
      'Led student tech initiatives focusing on interactive frontend interfaces and modern JavaScript engineering.',
      'Specialized in responsive web systems and interactive graphics programming.'
    ],
    techStack: [
      'Data Structures',
      'Algorithms',
      'JavaScript',
      'TypeScript',
      'Object-Oriented Design',
      'Database Management Systems'
    ]
  }
];
