import '@fontsource/quicksand';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import HobbiesSection from './components/sections/HobbiesSection';
import ContactSection from './components/sections/ContactSection';
import AnimationPlayground from './components/sections/AnimationPlayground';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <HobbiesSection />
        <ContactSection />
        <AnimationPlayground />
      </Layout>
    </ThemeProvider>
  );
};

export default App;