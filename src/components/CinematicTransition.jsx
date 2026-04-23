import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CinematicTransition = ({ frameUrl }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '30vh', overflow: 'hidden', background: '#000' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${frameUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          filter: 'blur(3px) grayscale(50%)',
          willChange: 'opacity'
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, #000 0%, transparent 50%, #000 100%)',
        zIndex: 1
      }} />
    </div>
  );
};

export default CinematicTransition;
