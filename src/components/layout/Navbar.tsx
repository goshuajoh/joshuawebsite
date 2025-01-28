import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { throttle } from 'lodash';
import useMediaQuery from '../../hooks/useMediaQuery';
import { motion, useScroll } from 'framer-motion';

const themeColors = {
  light: [
    'rgba(59, 130, 246, 0.1)',  // blue
    'rgba(99, 102, 241, 0.1)',  // indigo
    'rgba(236, 72, 153, 0.1)',  // pink
    'rgba(34, 197, 94, 0.1)',   // green
    'rgba(245, 158, 11, 0.1)'   // amber
  ],
  dark: [
    'rgba(96, 165, 250, 0.1)',  // blue
    'rgba(129, 140, 248, 0.1)', // indigo
    'rgba(244, 114, 182, 0.1)', // pink
    'rgba(74, 222, 128, 0.1)',  // green
    'rgba(251, 191, 36, 0.1)'   // amber
  ]
};

const CustomCursor = ({ 
    position, 
    theme 
  }: { 
    position: { x: number; y: number };
    theme: 'light' | 'dark';
  }) => (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          fontSize: '24px',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.05s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        😺
      </div>
      <div
        className="fixed pointer-events-none z-40 blur-xl opacity-50"
        style={{
          left: position.x,
          top: position.y,
          width: '80px',
          height: '80px',
          background: theme === 'light' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(96, 165, 250, 0.3)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      />
    </>
  );

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [colorIndex, setColorIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { scrollYProgress } = useScroll();

  const rotateColor = () => {
    setColorIndex((prev) => (prev + 1) % themeColors[theme].length);
  };

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavLinks = () => (
    <div className={`${isMobile ? 'flex flex-col space-y-6' : 'flex items-center gap-12'}`}>
      {['Home', 'About Me', 'Projects', 'Hobbies', 'Contact'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(' ', '-')}`}
          className="hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition-colors relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 
                         transition-all group-hover:w-full"></span>
        </a>
      ))}
    </div>
  );

  return (
    <>
    <CustomCursor position={mousePos} theme={theme} />

      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Navigation bar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 ${isMobile ? 'w-full px-4' : ''}`}>
        <div
          className={`${
            isMobile 
              ? `fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform 
                 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`
              : 'rounded-full border border-gray-200 dark:border-gray-700 backdrop-blur-sm px-8 py-4'
          }`}
          style={{ backgroundColor: themeColors[theme][colorIndex] }}
          onClick={rotateColor}
        >
          <div className={`${isMobile ? 'flex flex-col p-6 space-y-6' : 'flex items-center gap-12'}`}>
            <span className="font-bold text-lg whitespace-nowrap text-neutral-900 dark:text-white">
              Joshua Goh
            </span>

            {isMobile ? (
              isMenuOpen && <NavLinks />
            ) : (
              <NavLinks />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;