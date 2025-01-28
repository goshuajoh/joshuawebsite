import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "Description of project one goes here",
    image: "/images/project1.jpg",
    github: "https://github.com/yourproject1",
    demo: "https://demo1.com",
    tech: ["React", "TypeScript", "Three.js"]
  },
  // Add more projects...
];

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative group">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center gap-4">
        <a 
          href={project.github}
          className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={24} />
        </a>
        <a 
          href={project.demo}
          className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={24} />
        </a>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {project.title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-300 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span 
            key={tech}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                     rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return projects.length - 1;
      if (newIndex >= projects.length) return 0;
      return newIndex;
    });
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="min-h-screen bg-neutral-100 dark:bg-neutral-900 pt-40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"/>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  navigate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  navigate(-1);
                }
              }}
              className="absolute w-full max-w-3xl"
            >
              <ProjectCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-4 p-2 rounded-full bg-white dark:bg-neutral-800 shadow-lg
                     hover:bg-blue-500 hover:text-white transition-colors z-10"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 p-2 rounded-full bg-white dark:bg-neutral-800 shadow-lg
                     hover:bg-blue-500 hover:text-white transition-colors z-10"
            onClick={() => navigate(1)}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-blue-500' 
                  : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-blue-300'
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;