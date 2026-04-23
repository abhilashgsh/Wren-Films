import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const FILMS = [
  { id: 1, title: 'ECHOES', year: '2025', duration: '12m', image: 'https://img.youtube.com/vi/Q7QrpGkwedg/hq1.jpg' },
  { id: 2, title: 'SILENT VOICES', year: '2024', duration: '18m', image: 'https://img.youtube.com/vi/Q7QrpGkwedg/hq2.jpg' },
  { id: 3, title: 'NEON NIGHTS', year: '2024', duration: '22m', image: 'https://img.youtube.com/vi/Q7QrpGkwedg/hq3.jpg' },
  { id: 4, title: 'THE AWAKENING', year: '2023', duration: '15m', image: 'https://img.youtube.com/vi/gv7pmwEnosU/hq1.jpg' },
  { id: 5, title: 'SHADOW PLAY', year: '2023', duration: '20m', image: 'https://img.youtube.com/vi/gv7pmwEnosU/hq2.jpg' },
];

const MoreFilmsSection = () => {
  return (
    <section className="section-padding" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '2rem' }}>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}
        >
          More from Wren Films
        </motion.h2>
      </div>

      <div 
        className="hide-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          overflowX: 'auto', 
          padding: '0 4vw 4rem 4vw',
          scrollSnapType: 'x mandatory'
        }}
      >
        {FILMS.map((film, index) => (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            style={{ 
              minWidth: '300px',
              maxWidth: '350px',
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              position: 'relative',
              willChange: 'transform, opacity'
            }}
            className="hoverable"
          >
            <motion.div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${film.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease'
                }}
                className="film-thumb"
              />
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  opacity: 0.6,
                  transition: 'opacity 0.3s'
                }}
                className="film-overlay"
              />
              
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }} className="film-play">
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(5px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white'
                }}>
                  <Play size={20} fill="currentColor" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>{film.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', marginTop: '0.25rem' }}>
                    <span>{film.year}</span>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                    <span>{film.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <style>{`
              .hoverable:hover .film-thumb {
                transform: scale(1.1);
              }
              .hoverable:hover .film-overlay {
                opacity: 0.8;
              }
              .hoverable:hover .film-play {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
              }
            `}</style>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MoreFilmsSection;
