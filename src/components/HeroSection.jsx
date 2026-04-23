import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollToMovie = () => {
    const movieSection = document.getElementById('full-movie');
    if (movieSection) {
      movieSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background Video or Static Image for Mobile */}
      <motion.div 
        style={{ 
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          y: isMobile ? 0 : y, // Disable parallax on mobile
          zIndex: 0
        }}
        initial={{ scale: 1.05 }}
        animate={isMobile ? {} : { 
          scale: [1.05, 1.1, 1.05],
          x: [0, 5, -5, 0],
          y: [0, -5, 5, 0]
        }}
        transition={isMobile ? {} : { 
          scale: { duration: 20, ease: "linear", repeat: Infinity },
          x: { duration: 10, ease: "easeInOut", repeat: Infinity },
          y: { duration: 12, ease: "easeInOut", repeat: Infinity }
        }}
      >
        {isMobile ? (
          <img 
            src="https://img.youtube.com/vi/gv7pmwEnosU/maxresdefault.jpg"
            alt="Wren Films Cinematic Frame"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <iframe
            src="https://www.youtube.com/embed/gv7pmwEnosU?autoplay=1&mute=1&controls=0&loop=1&playlist=gv7pmwEnosU&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none'
            }}
            allow="autoplay; encrypted-media"
            title="Wren Films Trailer"
            loading="lazy"
          />
        )}
      </motion.div>

      {/* Film Frame Texture Blend - Only on Desktop to save resources */}
      {!isMobile && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'overlay',
            zIndex: 1,
            animation: 'flicker 4s infinite'
          }}
        />
      )}

      {/* Dark Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <motion.div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          opacity,
          padding: '0 20px'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: isMobile ? 'none' : 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: isMobile ? 'none' : 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            margin: 0,
            textShadow: '0 10px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.2)',
            lineHeight: 1
          }}
        >
          WREN FILMS
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0px' }}
          animate={{ opacity: 1, letterSpacing: isMobile ? '6px' : '12px' }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          style={{
            fontFamily: 'var(--font-ui)',
            textTransform: 'uppercase',
            fontSize: 'clamp(0.7rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            marginTop: '1.5rem',
            marginBottom: '3rem',
            textShadow: '0 5px 15px rgba(0,0,0,0.9)'
          }}
        >
          "Stories Beyond Frames"
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
          onClick={handleScrollToMovie}
          className="btn-primary hoverable"
        >
          <Play fill="currentColor" size={20} />
          Watch Now
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--text-secondary)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
