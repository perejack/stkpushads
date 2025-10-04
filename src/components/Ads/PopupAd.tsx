import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface PopupAdProps {
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  displayDuration?: number; // milliseconds
  delayBeforeShow?: number; // milliseconds
  onClose?: () => void;
}

/**
 * PopupAd - Stylish popup ad that appears at top, stays briefly, then disappears
 * 
 * Features:
 * - Smooth slide-down animation
 * - Auto-dismiss after duration
 * - Click to visit URL
 * - Manual close button
 * - Non-intrusive design
 */
export const PopupAd: React.FC<PopupAdProps> = ({
  imageUrl,
  ctaText,
  ctaUrl,
  displayDuration = 8000, // 8 seconds default
  delayBeforeShow = 3000, // 3 seconds delay
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Track impression
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'popup_ad_impression', {
          timestamp: new Date().toISOString()
        });
      }
    }, delayBeforeShow);

    return () => clearTimeout(showTimer);
  }, [delayBeforeShow]);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, displayDuration);

    return () => clearTimeout(hideTimer);
  }, [isVisible, displayDuration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleClick = () => {
    // Track click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'popup_ad_click', {
        ad_url: ctaUrl,
        timestamp: new Date().toISOString()
      });
    }

    window.open(ctaUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - No blur, just slight darkening */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-[9998]"
            onClick={handleClose}
          />

          {/* Popup Ad */}
          <div className="fixed top-0 left-0 right-0 flex justify-center z-[9999] px-2 sm:px-4">
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.9 }}
              animate={{ 
                y: isClosing ? -100 : 16, 
                opacity: isClosing ? 0 : 1,
                scale: isClosing ? 0.9 : 1
              }}
              exit={{ y: -100, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.3
              }}
              className="w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px]"
            >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Sponsored Label */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 z-20 shadow-md">
                Sponsored
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 shadow-md group"
                aria-label="Close ad"
              >
                <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
              </button>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: displayDuration / 1000, ease: "linear" }}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 z-10"
              />

              {/* Image */}
              <div 
                className="relative cursor-pointer group"
                onClick={handleClick}
              >
                <img
                  src={imageUrl}
                  alt="Survey Ad"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* CTA Button Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                  >
                    {ctaText}
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Pulse Animation Border */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.4)",
                    "0 0 0 10px rgba(16, 185, 129, 0)",
                    "0 0 0 0 rgba(16, 185, 129, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupAd;
