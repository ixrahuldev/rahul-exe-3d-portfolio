import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/layout/Hero';
import { TechUniverseCanvas } from '../components/three/TechUniverseCanvas';
import { ExplorationRail } from '../components/layout/ExplorationRail';
import { ProjectsCylinderCarousel } from '../components/projects/ProjectsCylinderCarousel';
import { ProjectDetailView } from '../components/projects/ProjectDetailView';
import { TechStackView } from '../components/tech/TechStackView';
import { DetailModal, type ModalType } from '../components/ui/DetailModal';
import { TECH_MODULES, DEFAULT_MODULE_ID } from '../data/techModules';
import { PROJECTS } from '../data/projects';
import type { TechModule, Project } from '../types';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Active top-level view: 'universe' (3D knot & orbiting modules), 'projects' (3D glass cylinders), 'project-detail' (exact Figma detail page), or 'tech-stack' (exact Figma 3D tech showcase)
  const [currentView, setCurrentView] = useState<'universe' | 'projects' | 'project-detail' | 'tech-stack'>('universe');

  // Selected technology module state for Tech Universe view
  const [selectedModuleId, setSelectedModuleId] = useState<string>(DEFAULT_MODULE_ID);

  // Selected project for detailed modal/page inspection
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);

  // Modal state for full informational overlays (projects, experience, about, contact)
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeNav, setActiveNav] = useState<string>('home');

  // Support direct browser hash routing & back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project/')) {
        const projId = hash.replace('project/', '');
        const found = PROJECTS.find((p) => p.id === projId);
        if (found) {
          setSelectedProject(found);
          setCurrentView('project-detail');
          setActiveNav('projects');
        }
      } else if (hash === 'projects') {
        setCurrentView('projects');
        setActiveNav('projects');
      } else if (hash === 'tech-stack') {
        setCurrentView('tech-stack');
        setActiveNav('tech-stack');
      } else if (hash === 'tech-universe' || hash === 'home' || !hash) {
        setCurrentView('universe');
        setActiveNav('tech-universe');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedModule: TechModule =
    TECH_MODULES.find((m) => m.id === selectedModuleId) || TECH_MODULES[0];

  const currentModuleIndex = Math.max(
    0,
    TECH_MODULES.findIndex((m) => m.id === selectedModuleId)
  );

  const handleSelectModule = (mod: TechModule) => {
    setSelectedModuleId(mod.id);
    if (mod.id === 'tech-stack') {
      // Transition to dedicated 3D Technical Stack screen matching exact Figma design
      setCurrentView('tech-stack');
      setActiveNav('tech-stack');
      window.location.hash = 'tech-stack';
      setActiveModal(null);
    } else if (mod.id === 'projects') {
      // Trigger zoom transition into 3D Cylinder carousel
      handleNavSelect('projects');
    } else if (mod.id === 'about') {
      setActiveModal('about');
    } else if (mod.id === 'experience') {
      setActiveModal('experience');
    } else if (mod.id === 'contact') {
      setActiveModal('contact');
    }
  };

  const handleSelectIndex = (index: number) => {
    if (TECH_MODULES[index]) {
      handleSelectModule(TECH_MODULES[index]);
    }
  };

  const handleNavSelect = (navId: string) => {
    setActiveNav(navId);

    if (navId === 'tech-stack') {
      setCurrentView('tech-stack');
      window.location.hash = 'tech-stack';
      setActiveModal(null);
    } else if (navId === 'projects') {
      // Zoom into Featured Projects 3D Cylinder view
      setCurrentView('projects');
      window.location.hash = 'projects';
      setActiveModal(null);
    } else if (navId === 'home' || navId === 'tech-universe') {
      // Zoom back out to 3D Tech Universe centerpiece
      setCurrentView('universe');
      setActiveNav('tech-universe');
      window.location.hash = 'tech-universe';
      setActiveModal(null);
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    } else if (navId === 'about') {
      setActiveModal('about');
    } else if (navId === 'experience') {
      setActiveModal('experience');
    } else if (navId === 'contact') {
      setActiveModal('contact');
    }
  };

  const handleOpenProjectDetails = (proj: Project) => {
    setSelectedProject(proj);
    setCurrentView('project-detail');
    setActiveModal(null);
    window.location.hash = `project/${proj.id}`;
  };

  const handleNextModulePrompt = () => {
    const nextIndex = (currentModuleIndex + 1) % TECH_MODULES.length;
    handleSelectModule(TECH_MODULES[nextIndex]);
  };

  return (
    <div className="app-container">
      {/* Global Header (hidden on full-page project detail and tech-stack views) */}
      {currentView !== 'project-detail' && currentView !== 'tech-stack' && (
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeNav}
          onSelectNav={handleNavSelect}
          onOpenContact={() => setActiveModal('contact')}
        />
      )}

      {/* Main Viewport: Cinematic Transition between Universe, Projects Cylinders & Project Detail */}
      <main className="main-viewport" role="main">
        {/* Tech Universe 3D Scene + Hero */}
        <div
          className={`view-wrapper universe-view-wrapper ${
            currentView === 'universe' ? 'active' : 'zooming-out'
          }`}
          aria-hidden={currentView !== 'universe'}
        >
          <Hero
            onExplore={() => handleNavSelect('projects')}
            onOpenProjects={() => handleNavSelect('projects')}
          />

          <TechUniverseCanvas
            selectedModule={selectedModule}
            modules={TECH_MODULES}
            onSelectModule={handleSelectModule}
          />
        </div>

        {/* Featured Projects 3D Cylinder Carousel matching exact Figma design */}
        <div
          className={`view-wrapper projects-view-wrapper ${
            currentView === 'projects' ? 'active' : 'inactive'
          }`}
          aria-hidden={currentView !== 'projects'}
        >
          {currentView === 'projects' && (
            <ProjectsCylinderCarousel
              projects={PROJECTS}
              initialIndex={0} // DoE Licensing Platform centered matching Figma
              onBack={() => handleNavSelect('tech-universe')}
              onOpenProjectDetails={handleOpenProjectDetails}
              isZoomingIn={true}
            />
          )}
        </div>

        {/* Project Detail Page matching exact Figma design */}
        <div
          className={`view-wrapper project-detail-view-wrapper ${
            currentView === 'project-detail' ? 'active' : 'inactive'
          }`}
          aria-hidden={currentView !== 'project-detail'}
        >
          {currentView === 'project-detail' && (
            <ProjectDetailView
              project={selectedProject || PROJECTS[0]}
              allProjects={PROJECTS}
              onBack={() => {
                setCurrentView('projects');
                window.location.hash = 'projects';
              }}
              onSelectProject={(proj) => {
                setSelectedProject(proj);
                window.location.hash = `project/${proj.id}`;
              }}
            />
          )}
        </div>

        {/* Technical Stack 3D Showcase matching exact Figma Image 2 */}
        <div
          className={`view-wrapper tech-stack-view-wrapper ${
            currentView === 'tech-stack' ? 'active' : 'inactive'
          }`}
          aria-hidden={currentView !== 'tech-stack'}
        >
          {currentView === 'tech-stack' && (
            <TechStackView
              onBack={() => handleNavSelect('tech-universe')}
              onOpenProjects={() => handleNavSelect('projects')}
            />
          )}
        </div>
      </main>

      {/* Bottom Exploration Rail (only displayed on Tech Universe view) */}
      {currentView === 'universe' && (
        <ExplorationRail
          modules={TECH_MODULES}
          currentIndex={currentModuleIndex}
          onSelectIndex={handleSelectIndex}
          onExplorePromptClick={handleNextModulePrompt}
        />
      )}

      {/* Interactive Detail Modal */}
      <DetailModal
        type={activeModal}
        selectedProject={selectedProject}
        onClose={() => {
          setActiveModal(null);
          if (currentView === 'universe') {
            setActiveNav('tech-universe');
          }
        }}
      />
    </div>
  );
};

export default App;
