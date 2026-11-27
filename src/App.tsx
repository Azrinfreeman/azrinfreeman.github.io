import { useEffect, useState } from 'react';
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
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(readInitialTheme);
  const [audience, setAudience] = useState<AudienceMode>('client');
  const [category, setCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currency, setCurrency] = useState<Currency>('RM');
  const [estimatorType, setEstimatorType] = useState<EstimatorProjectType>('api-stripe');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures
    }
  }, [theme]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    window.setTimeout(() => scrollToSection('estimate'), 60);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main>
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

        <ServicesSection
          currency={currency}
          onChangeCurrency={setCurrency}
          onEstimateService={handleEstimateType}
        />

        <ScopeEstimator
          selectedType={estimatorType}
          onChangeType={setEstimatorType}
          currency={currency}
          onChangeCurrency={setCurrency}
        />

        <ProcessAndStack />
      </main>

      <ContactFooter />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEstimateSimilar={handleEstimateType}
      />
    </div>
  );
}

export default App;
