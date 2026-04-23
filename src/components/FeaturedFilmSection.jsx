import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import TrailerModal from './TrailerModal';

const FeaturedFilmSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <section className="section-padding container" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-ui)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem' }}
        >
          Featured Masterpiece
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: 0, textShadow: '0 5px 20px rgba(255,255,255,0.1)' }}
        >
          THE SPINE
        </motion.h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => setIsModalOpen(true)}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px', // Wider billboard style
            aspectRatio: isMobile ? '4/5' : '16/9', // Adapted for mobile
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            cursor: 'none',
            willChange: 'transform, box-shadow'
          }}
          whileHover={isMobile ? { scale: 0.98 } : {
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(255,255,255,0.1)',
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          whileTap={isMobile ? { scale: 0.95 } : {}}
          className={isMobile ? "" : "hoverable film-billboard"}
        >
          {/* Base Image with proper object-fit to prevent awkward cropping */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            <img 
              src="https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg" 
              alt="The Spine Movie Frame"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: isMobile ? 'center 30%' : 'center center', // Adjust focal point slightly upwards on mobile
                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform',
                filter: 'brightness(0.9) contrast(1.1)'
              }}
              className="billboard-img"
              loading="lazy"
            />
          </div>

          {/* Grain Texture */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: 'url(data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.1"/%3E%3C/svg%3E)',
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
              zIndex: 1
            }} />
          )}

          {/* Top Vignette overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '40%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
            zIndex: 2
          }} />

          {/* Bottom Dark Fade Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, width: '100%', height: isMobile ? '60%' : '50%',
            background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 30%, transparent 100%)',
            zIndex: 2
          }} />

          {/* Content Container */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, width: '100%', height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: isMobile ? 'center' : 'flex-start',
            padding: isMobile ? '2rem 1.5rem' : '4rem',
            textAlign: isMobile ? 'center' : 'left',
            zIndex: 3
          }}>
            
            <motion.h3 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                margin: 0, 
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                lineHeight: 1
              }}
            >
              THE SPINE
            </motion.h3>
            <motion.p 
              style={{ 
                fontFamily: 'var(--font-ui)', 
                color: 'var(--text-secondary)', 
                marginTop: '0.5rem',
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                maxWidth: '600px',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)'
              }}
            >
              A chilling journey into the unknown. Witness the truth unfold in silence.
            </motion.p>
          </div>

          {/* Play Button - Centered */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div
              style={{
                width: isMobile ? '60px' : '90px',
                height: isMobile ? '60px' : '90px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
              className="billboard-play"
            >
              <Play fill="currentColor" size={isMobile ? 24 : 36} style={{ marginLeft: '4px' }} />
            </div>
          </div>
          
          {!isMobile && (
            <style>{`
              .film-billboard:hover .billboard-img {
                transform: scale(1.05);
              }
              .film-billboard:hover .billboard-play {
                transform: scale(1.15);
                backgroundColor: rgba(255,255,255,0.2);
                border-color: rgba(255,255,255,0.6);
                box-shadow: 0 0 40px rgba(255,255,255,0.2);
              }
            `}</style>
          )}

        </motion.div>
      </div>

      <TrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoId="gv7pmwEnosU"
      />
    </section>
  );
};

export default FeaturedFilmSection;
