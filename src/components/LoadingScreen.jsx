import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FRAMES = [
  'https://img.youtube.com/vi/Q7QrpGkwedg/hq1.jpg',
  'https://img.youtube.com/vi/gv7pmwEnosU/hq1.jpg',
  'https://img.youtube.com/vi/Q7QrpGkwedg/hq2.jpg',
  'https://img.youtube.com/vi/gv7pmwEnosU/hq2.jpg',
  'https://img.youtube.com/vi/Q7QrpGkwedg/hq3.jpg'
];

const LoadingScreen = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    // Flash frames quickly
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, 150); // very fast flash
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      {/* Flashing Background Frames */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-10%', width: '120%', height: '120%',
        backgroundImage: `url(${FRAMES[currentFrame]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        mixBlendMode: 'screen',
        filter: 'contrast(1.5) grayscale(100%)',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ 
          opacity: [0, 1, 0.8, 1], 
          scale: 1,
          filter: 'blur(0px)'
        }}
        transition={{ 
          duration: 2.5, 
          times: [0, 0.4, 0.8, 1],
          ease: "easeOut"
        }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <h1 style={{ fontSize: '4rem', letterSpacing: '8px', margin: 0, textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
          WREN FILMS
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ 
            fontFamily: 'var(--font-ui)', 
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginTop: '1rem'
          }}
        >
          Presents
        </motion.p>
      </motion.div>
      
      {/* Film reel noise & dust overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url(data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.1"/%3E%3C/svg%3E)',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          animation: 'flicker 0.1s infinite',
          zIndex: 2
        }}
      />
      <style>{`
        @keyframes flicker {
          0% { opacity: 0.1; }
          50% { opacity: 0.15; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
