import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const FRAMES = [
  'https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg',
  'https://img.youtube.com/vi/gv7pmwEnosU/maxresdefault.jpg',
  'https://img.youtube.com/vi/Q7QrpGkwedg/hq1.jpg',
  'https://img.youtube.com/vi/Q7QrpGkwedg/hq2.jpg'
];

const AboutFilmSection = () => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="section-padding container" 
      style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Left: Text */}
        <motion.div style={{ y: textY, zIndex: 2 }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1rem 0', lineHeight: 1 }}
          >
            ABOUT THE FILM
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ 
              width: '50px', 
              height: '2px', 
              backgroundColor: 'var(--accent)',
              marginBottom: '2rem',
              boxShadow: '0 0 10px var(--accent-glow)'
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: 1.8,
              marginBottom: '3rem'
            }}
          >
            "THE SPINE" is a profound psychological drama that delves into the fragile nature of human existence. It unravels a narrative where silence speaks louder than words, tearing down the facade of normalcy.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { title: "Concealment & Suspicion", desc: "The hidden truths that erode trust." },
              { title: "Social Commentary", desc: "A mirror held to societal expectations." },
              { title: "Mental Health", desc: "The silent battles fought behind closed doors." }
            ].map((theme, idx) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 + (idx * 0.2) }}
              >
                <h4 style={{ 
                  fontFamily: 'var(--font-ui)', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem'
                }}>
                  {theme.title}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>
                  {theme.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Dynamic Slideshow */}
        <motion.div style={{ y: imageY, position: 'relative', aspectRatio: '4/5', zIndex: 1 }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.05)'
          }}>
            {/* Grain Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: 'url(data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.15"/%3E%3C/svg%3E)',
              pointerEvents: 'none',
              zIndex: 10,
              mixBlendMode: 'overlay'
            }} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrame}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${FRAMES[currentFrame]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'contrast(1.1) brightness(0.8)'
                }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFilmSection;
