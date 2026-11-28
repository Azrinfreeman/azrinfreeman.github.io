import { useState } from 'react';
import { BackendPlayground } from './components/BackendPlayground';
import { ContactFooter } from './components/ContactFooter';
import { HeroShowreel } from './components/HeroShowreel';
import { Navbar } from './components/Navbar';
import { ProcessAndStack } from './components/ProcessAndStack';
import { ProjectModal } from './components/ProjectModal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ServicesSection } from './components/ServicesSection';
import type {
  AudienceMode,
  Currency,
  EstimatorProjectType,
  ProjectCategory,
  ProjectItem,
  ThemeMode,
} from './types';

function readInitialTheme(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);
  const [audience, setAudience] = useState<AudienceMode>('client');
  const [category, setCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currency, setCurrency] = useState<Currency>('RM');
  const [estimatorType, setEstimatorType] = useState<EstimatorProjectType>('api-stripe');

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // The current page can still switch themes without browser storage.
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: 'start' });
    }
  };

  const handleSelectAudience = (mode: AudienceMode) => {
    setAudience(mode);
    if (mode === 'researcher') {
      setEstimatorType('edtech-unity');
    } else if (mode === 'client') {
      setEstimatorType('api-stripe');
    }
  };

  const handleJumpToEdtech = () => {
    setCategory('edtech');
    setEstimatorType('edtech-unity');
    scrollToSection('projects');
  };

  const handleEstimateType = (type: EstimatorProjectType) => {
    setEstimatorType(type);
    setSelectedProject(null);
    window.requestAnimationFrame(() => scrollToSection('estimate'));
  };

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="button button-primary sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main id="main-content" tabIndex={-1}>
        <HeroShowreel
          audience={audience}
          onSelectAudience={handleSelectAudience}
          onJumpToEdtech={handleJumpToEdtech}
          onOpenProject={setSelectedProject}
        />

        <ProjectShowcase
          activeCategory={category}
          onSelectCategory={setCategory}
          onOpenProject={setSelectedProject}
          onEstimateSimilar={handleEstimateType}
        />

        <BackendPlayground />

        <ServicesSection
          currency={currency}
          onChangeCurrency={setCurrency}
          onEstimateService={handleEstimateType}
        />

        <div className="section-tint divider border-t">
          <ScopeEstimator
            selectedType={estimatorType}
            onChangeType={setEstimatorType}
            currency={currency}
            onChangeCurrency={setCurrency}
          />
        </div>

        <ProcessAndStack />
      </main>

      <ContactFooter />

      {selectedProject && (
        <ProjectModal
          key={selectedProject.id}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEstimateSimilar={handleEstimateType}
        />
      )}
    </div>
  );
}

export default App;
