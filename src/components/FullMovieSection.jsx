import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FullMovieSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="full-movie" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Blurred moving film frames background */}
      <motion.div
        animate={isMobile ? {} : { 
          x: ['-5%', '0%', '-5%'],
          y: ['0%', '-5%', '0%'],
          scale: [1.1, 1.15, 1.1]
        }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '-10%', left: '-10%', width: '120%', height: '120%',
          backgroundImage: 'url(https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isMobile ? 'blur(20px) brightness(0.2)' : 'blur(30px) brightness(0.3) contrast(1.2)',
          zIndex: 0,
          willChange: 'transform'
        }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
          >
            Watch the Full Film
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontSize: '1.1rem', marginTop: '1rem', fontStyle: 'italic', letterSpacing: '1px' }}
          >
            "In the silence of the unspoken, truth echoes."
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            borderRadius: '20px',
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02))',
            boxShadow: '0 30px 60px rgba(0,0,0,0.9), 0 0 100px rgba(255,255,255,0.05)'
          }}
        >
          {/* Ambient Glow */}
          <div 
            className="ambient-glow"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '110%',
              height: '110%',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
              zIndex: -1
            }}
          />

          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '18px',
            overflow: 'hidden',
            backgroundColor: '#000',
            position: 'relative'
          }}>
            <iframe
              src="https://www.youtube.com/embed/Q7QrpGkwedg?rel=0&modestbranding=1"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                position: 'absolute',
                top: 0,
                left: 0
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Wren Films Full Movie"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FullMovieSection;
