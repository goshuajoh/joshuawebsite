import React from 'react';
import { motion } from 'framer-motion';

const AnimationPlayground = () => {
  return (
    <section id="playground" className="min-h-screen bg-white dark:bg-neutral-900 pt-40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center dark:text-white mb-20">Animation Playground</h2>
        
        {/* Grid of animation examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Floating Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl
                        transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg
                          overflow-hidden group">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Hover Card</span>
              </div>
            </div>
          </div>

          {/* Morphing Blob */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl">
            <div className="relative w-full h-48 flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-blue-500/30 rounded-full 
                            animate-[morph_8s_linear_infinite]
                            [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]" />
              <div className="absolute w-32 h-32 bg-purple-500/30 rounded-full 
                            animate-[morph_8s_linear_infinite_reverse]
                            [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]" />
            </div>
          </div>

          {/* Glowing Border */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl group">
            <div className="relative w-full h-48 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500
                          before:absolute before:inset-[-2px] before:bg-gradient-to-br before:from-blue-500 
                          before:to-purple-500 before:rounded-lg before:z-[-1] before:transition-all
                          before:duration-300 before:opacity-0 before:blur-xl
                          group-hover:before:opacity-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Glow Effect</span>
              </div>
            </div>
          </div>

          {/* Text Reveal */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl overflow-hidden">
            <div className="relative w-full h-48 flex items-center justify-center group">
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Scroll Reveal
              </motion.span>
            </div>
          </div>

          {/* Gradient Wave */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-[wave_15s_linear_infinite]
                              bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]" />
              </div>
            </div>
          </div>

          {/* Particle System */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl">
            <div className="relative w-full h-48 bg-neutral-900 rounded-lg overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimationPlayground;