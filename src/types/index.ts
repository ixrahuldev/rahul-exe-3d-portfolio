export interface FeaturedProjectRef {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  linkText?: string;
  url?: string;
}

export interface TechModule {
  id: string;
  name: string;
  label: string;
  category: 'core' | 'frontend' | 'backend' | 'architecture' | 'navigation';
  tagline: string;
  description: string;
  skills: string[];
  color: string;
  icon: string;
  position3D: [number, number, number];
  labelOffset?: [number, number, number];
  featuredProject?: FeaturedProjectRef;
}

export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  client: string;
  period?: string;
  role: string;
  description: string;
  keyContributions: string[];
  techStack: string[];
  tags?: string[];
  category: 'Enterprise' | 'Micro-Frontend' | 'Creative 3D' | 'Full-Stack';
  image?: string;
  accentColor?: string;
  badgeLabel?: string;
  badgeSublabel?: string;
  overview?: string;
  keyFeatures?: string[];
  featured?: boolean;
  gallery?: string[];
  link?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}
