import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

const Model = () => {
  const { scene } = useGLTF('/models/character.glb');
  return (
    <group scale={2} position={[0, -2, 0]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/character.glb');

const HeroSection = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const dragBoundsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dragBoundsRef.current;
    if (element) {
      const bounds = element.getBoundingClientRect();
      setPosition({ x: bounds.width * 0.62, y: bounds.height * 0.3 });
    }
  }, []);

  return (
    <div
      ref={dragBoundsRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900"
      style={{
        height: `calc(100vh - ${navbarHeight}px)`,
        marginTop: `${navbarHeight}px`,
      }}
    >
      <Draggable bounds="parent" position={position}>
        <motion.div
          className="absolute z-20 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md cursor-move"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h1
            className="text-4xl font-bold text-blue-600 text-center"
            style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}
          >
            Hi, my name is Joshua.
          </h1>
          <p className="mt-4 text-gray-700 text-center">
            I love creating beautiful user experiences.
          </p>
          <motion.button
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mx-auto block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.button>
        </motion.div>
      </Draggable>

      <div className="w-full h-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <Model />
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroSection;