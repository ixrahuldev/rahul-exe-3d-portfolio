import type { TechModule } from '../types';

export const TECH_MODULES: TechModule[] = [
  {
    id: 'about',
    name: 'About Rahul',
    label: 'About',
    category: 'navigation',
    tagline: 'Engineering at the Intersection of Systems and UX',
    description: 'Software Engineer based in Hyderabad with 2+ years of enterprise experience building critical government platforms and creative web experiments.',
    skills: [
      'Creative Development',
      'System Architecture',
      'Performance Optimization',
      'Agile / Scrum Delivery',
      'Mentorship'
    ],
    color: '#A855F7',
    icon: 'Sparkles',
    position3D: [-1.15, 1.35, 0.2],
    labelOffset: [0, 0.48, 0],
    featuredProject: {
      title: 'Engineering Philosophy',
      subtitle: 'Building systems that feel like the future',
      description: 'Bridging design fidelity, high performance, and robust type safety.',
      tag: 'PROFILE',
      linkText: 'Read Bio →',
      url: '#about'
    }
  },
  {
    id: 'projects',
    name: 'Key Projects',
    label: 'Projects',
    category: 'navigation',
    tagline: 'Enterprise & Interactive Portfolio Work',
    description: 'Explore the full spectrum of production government portals, micro-frontend shells, and interactive 3D web applications.',
    skills: [
      'Abu Dhabi DoE',
      'TAQA Water Solutions',
      'RahulBuilds.dev',
      'Three.js Portfolios'
    ],
    color: '#7C3AED',
    icon: 'FolderGit2',
    position3D: [1.25, 1.35, 0.2],
    labelOffset: [0, 0.48, 0],
    featuredProject: {
      title: 'RahulBuilds.dev Platform',
      subtitle: 'Physics canvas & magnetic micro-interactions',
      description: 'Full-stack portfolio with GSAP, Lenis, and JWT admin panel.',
      tag: 'CREATIVE TECH',
      linkText: 'Explore Projects →',
      url: '#projects'
    }
  },
  {
    id: 'experience',
    name: 'Experience & History',
    label: 'Experience',
    category: 'navigation',
    tagline: 'UAE Enterprise Delivery & Track Record',
    description: '2+ years architecting enterprise applications for UAE government and utility sector platforms, specializing in Micro-Frontends and modern React systems.',
    skills: [
      'Innovatech Solutions',
      'Abu Dhabi DoE',
      'TAQA Water Solutions',
      'Presidency University',
      'Agile / Scrum'
    ],
    color: '#3B82F6',
    icon: 'Code2',
    position3D: [1.25, -1.15, 0.2],
    labelOffset: [0, -0.48, 0],
    featuredProject: {
      title: 'Enterprise Track Record',
      subtitle: 'Innovatech Technology Solutions (July 2024 – Present)',
      description: 'Production frontend development for Abu Dhabi Department of Energy and TAQA Water Solutions.',
      tag: 'CAREER MILESTONE',
      linkText: 'View Career Details →',
      url: '#experience'
    }
  },
  {
    id: 'contact',
    name: 'Connect & Contact',
    label: 'Contact',
    category: 'navigation',
    tagline: 'Open for Select Opportunities & Collaborations',
    description: 'Get in touch for frontend architecture consulting, creative engineering projects, or high-impact engineering roles.',
    skills: [
      'rahulsodanapalli@gmail.com',
      '+91 86393 86059',
      'Hyderabad, India',
      'LinkedIn',
      'GitHub'
    ],
    color: '#E64BD7',
    icon: 'Sparkles',
    position3D: [-1.2, -1.15, 0.25],
    labelOffset: [0, -0.48, 0],
    featuredProject: {
      title: 'Direct Channels',
      subtitle: 'Available for Q2 Opportunities',
      description: 'Direct response via email or LinkedIn.',
      tag: 'CONTACT INFO',
      linkText: 'Open Contact Form →',
      url: '#contact'
    }
  },
  {
    id: 'tech-stack',
    name: 'Technical Stack',
    label: 'Tech Stack',
    category: 'core',
    tagline: 'Modern Frontend Ecosystem & 3D Interactive Architecture',
    description: 'Comprehensive overview of production-grade libraries, typed state engines, and micro-frontend toolchains.',
    skills: [
      'React.js',
      'TypeScript',
      'Micro-Frontends',
      'Node.js',
      'Python',
      'Three.js'
    ],
    color: '#06B6D4',
    icon: 'Atom',
    position3D: [1.85, 0.1, 0.2],
    labelOffset: [0, 0.48, 0],
    featuredProject: {
      title: 'React Ecosystem & Architecture',
      subtitle: 'Build fast, scalable user interfaces',
      description: 'Explore interactive 3D technical stack showcase.',
      tag: 'TECH STACK',
      linkText: 'Explore Tech Stack →',
      url: '#tech-stack'
    }
  }
];

export const DEFAULT_MODULE_ID = 'projects';
