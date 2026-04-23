import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import TrailerModal from './TrailerModal';

const FeaturedFilmSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section className="section-padding container" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem' }}
        >
          Featured Masterpiece
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 0, textShadow: '0 5px 20px rgba(255,255,255,0.1)' }}
        >
          THE SPINE
        </motion.h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
          onClick={() => setIsModalOpen(true)}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            aspectRatio: '2/3',
            borderRadius: '20px',
            cursor: 'none',
            transformStyle: 'preserve-3d',
            rotateX: mousePosition.y * -20,
            rotateY: mousePosition.x * 20,
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.05)',
            transition: 'box-shadow 0.3s ease',
          }}
          whileHover={{
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 80px rgba(255,255,255,0.15)',
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          className="hoverable"
        >
          {/* Poster Image */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundImage: 'url("https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.2) brightness(0.8) grayscale(0.2)'
            }}
          >
            {/* Dynamic glare effect */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                pointerEvents: 'none',
                zIndex: 2
              }}
            />
          </div>

          {/* Overlay & Content */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem 2rem',
            zIndex: 1
          }}>
            {/* Play Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              className="play-icon"
            >
              <Play fill="currentColor" size={32} style={{ marginLeft: '4px' }} />
            </motion.div>
            <style>{`
              .hoverable:hover .play-icon {
                opacity: 1 !important;
                transform: translate(-50%, -50%) scale(1) !important;
                transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
              }
            `}</style>

            <motion.h3 style={{ fontSize: '2.5rem', margin: 0, transform: 'translateZ(30px)' }}>THE SPINE</motion.h3>
            <motion.p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-secondary)', marginTop: '0.5rem', transform: 'translateZ(20px)' }}>
              A chilling journey into the unknown.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoId="gv7pmwEnosU" // Assuming same trailer or another Wren Films ID
      />
    </section>
  );
};

export default FeaturedFilmSection;
