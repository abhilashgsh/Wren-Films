import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Volume2, VolumeX } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AboutFilmSection from './components/AboutFilmSection';
import CinematicTransition from './components/CinematicTransition';
import FeaturedFilmSection from './components/FeaturedFilmSection';
import FullMovieSection from './components/FullMovieSection';
import MoreFilmsSection from './components/MoreFilmsSection';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Simulate cinematic loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setAudioEnabled(!audioEnabled);
  };

  return (
    <>
      <CustomCursor />
      
      <div className="vignette"></div>

      {/* Ambient Sound */}
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/01/21/audio_31743c5820.mp3?filename=dark-ambient-116040.mp3" 
        loop 
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="app-container"
          >
            {/* Audio Toggle */}
            <button 
              className="audio-toggle"
              onClick={toggleAudio}
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.75rem',
                borderRadius: '50%',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => document.body.classList.add('hovering')}
              onMouseLeave={() => document.body.classList.remove('hovering')}
            >
              {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <HeroSection />
            <CinematicTransition frameUrl="https://img.youtube.com/vi/gv7pmwEnosU/maxresdefault.jpg" />
            
            <AboutFilmSection />
            <CinematicTransition frameUrl="https://img.youtube.com/vi/Q7QrpGkwedg/maxresdefault.jpg" />
            
            <FeaturedFilmSection />
            <CinematicTransition frameUrl="https://img.youtube.com/vi/Q7QrpGkwedg/hq1.jpg" />
            
            <FullMovieSection />
            <CinematicTransition frameUrl="https://img.youtube.com/vi/Q7QrpGkwedg/hq2.jpg" />
            
            <MoreFilmsSection />
            
            <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.5)' }}>WREN FILMS</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>© 2026 Wren Films Agartala. All Rights Reserved.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
