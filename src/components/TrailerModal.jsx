import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, videoId }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <button
            onClick={onClose}
            className="hoverable"
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'none',
              zIndex: 10,
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
            style={{
              width: '100%',
              maxWidth: '1200px',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 100px rgba(255,255,255,0.1)',
              position: 'relative'
            }}
          >
            <div className="ambient-glow" style={{ 
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
              width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', zIndex: -1 
            }}></div>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="autoplay; encrypted-media; fullscreen"
              title="Wren Films Video"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
