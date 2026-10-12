export type AppView = 'universe' | 'projects' | 'about' | 'experience' | 'contact';

export interface RouteConfig {
  id: AppView;
  title: string;
  path: string;
}

export const APP_ROUTES: RouteConfig[] = [
  { id: 'universe', title: 'Tech Universe', path: '#tech-universe' },
  { id: 'projects', title: 'Projects', path: '#projects' },
  { id: 'experience', title: 'Experience', path: '#experience' },
  { id: 'about', title: 'About', path: '#about' },
  { id: 'contact', title: 'Contact', path: '#contact' },
];
