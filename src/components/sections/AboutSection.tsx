import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
}

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => (
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: `${percentage}%` }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="h-2 bg-blue-500 rounded-full"
  />
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const skills: Skill[] = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Three.js", level: 75 },
    { name: "UI/UX Design", level: 80 },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelector(".profile-image"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="container mx-auto px-6 pt-40">
        {" "}
        {/* Increased padding-top */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-image rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/Profile.jpg"
              alt="Profile"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                About Me
              </h2>
              <div className="w-20 h-1 bg-blue-500" />
            </motion.div>

            <motion.p
              className="text-neutral-700 dark:text-neutral-300"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              I'm a frontend developer with a passion for creating immersive web
              experiences. My journey in web development started with a
              curiosity for design and has evolved into a deep appreciation for
              clean code and user-centric solutions.
            </motion.p>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-blue-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                    <SkillBar skill={skill.name} percentage={skill.level} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Download CV
              </button>
              <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                View Projects
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
