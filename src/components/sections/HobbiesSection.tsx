import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Piano, Table, BookOpen, Heart, Music, Award, Bookmark, Sparkles } from 'lucide-react';

const HobbiesSection = () => {
  const [activeHobby, setActiveHobby] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hobbies = [
    {
      title: "Piano",
      icon: <Piano size={40} />,
      secondaryIcon: <Music size={24} />,
      color: "from-blue-500 to-blue-600",
      description: "Finding harmony in both music and code",
      details: [
        "Classical & Contemporary",
        "Digital Piano Composition",
        "Music Theory Enthusiast"
      ]
    },
    {
      title: "Table Tennis",
      icon: <Table size={40} />,
      secondaryIcon: <Award size={24} />,
      color: "from-green-500 to-green-600",
      description: "Quick reflexes, strategic thinking",
      details: [
        "Competitive Player",
        "Strategic Gameplay",
        "Team Coordination"
      ]
    },
    {
      title: "Reading",
      icon: <BookOpen size={40} />,
      secondaryIcon: <Bookmark size={24} />,
      color: "from-purple-500 to-purple-600",
      description: "Expanding horizons through books",
      details: [
        "Tech Literature",
        "Philosophy",
        "Personal Development"
      ]
    },
    {
      title: "Praying",
      icon: <Heart size={40} />,
      secondaryIcon: <Sparkles size={24} />,
      color: "from-red-500 to-rose-600",
      description: "Finding peace and purpose",
      details: [
        "Daily Meditation",
        "Spiritual Growth",
        "Community Connection"
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-neutral-900 pt-40 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Life Beyond Code
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"/>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              layoutId={`hobby-${index}`}
              onClick={() => setActiveHobby(index)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl
                         ${activeHobby === null ? 'h-[200px]' : activeHobby === index ? 'h-[400px]' : 'h-[100px]'}
                         transition-all duration-500 ease-in-out`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${hobby.color} opacity-90`} />
              
              <div className="relative p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 text-white">
                  {hobby.icon}
                  <h3 className="text-2xl font-bold">{hobby.title}</h3>
                </div>
                
                <AnimatePresence>
                  {activeHobby === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 text-white space-y-4"
                    >
                      <p className="text-lg">{hobby.description}</p>
                      <ul className="space-y-2">
                        {hobby.details.map((detail, i) => (
                          <motion.li
                            key={detail}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            {hobby.secondaryIcon}
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveHobby(null)}
          className={`mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg mx-auto block
                     transition-opacity duration-300 ${activeHobby === null ? 'opacity-0' : 'opacity-100'}`}
        >
          View All
        </motion.button>
      </div>
    </section>
  );
};

export default HobbiesSection;