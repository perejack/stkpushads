import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageAd, ImageAdConfig } from './ImageAd';
import { surveyImageAds } from '../../config/surveyAdsConfig';
import { adRotationConfig } from '../../config/adsConfig';

// Survey image ad placements
const surveyImageAdPlacements = {
  'homepage-image-survey': ['survey-hero-main', 'survey-instant-bonus'],
  'application-waiting-image': ['survey-quick-cash'],
  'success-page-image': ['survey-phone-money']
};

interface ImageAdContainerProps {
  placement: string;
  variant?: 'standard' | 'overlay' | 'split' | 'card' | 'banner';
  maxAds?: number;
  enableRotation?: boolean;
  className?: string;
}

/**
 * ImageAdContainer - Smart container for image-based ads
 * 
 * Features:
 * - Automatic ad rotation
 * - Placement-based filtering
 * - Beautiful image layouts
 * - Analytics tracking
 */
export const ImageAdContainer: React.FC<ImageAdContainerProps> = ({
  placement,
  variant = 'overlay',
  maxAds = 1,
  enableRotation = true,
  className = ''
}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [visibleAds, setVisibleAds] = useState<ImageAdConfig[]>([]);
  const [dismissedAds, setDismissedAds] = useState<string[]>([]);

  // Load dismissed ads from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dismissedImageAds');
    if (stored) {
      try {
        setDismissedAds(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing dismissed image ads:', e);
      }
    }
  }, []);

  // Get ads for this placement
  useEffect(() => {
    const placementConfig = (surveyImageAdPlacements as any)[placement];
    
    if (!placementConfig) {
      setVisibleAds([]);
      return;
    }

    // Filter ads by placement and dismissal status
    const placementAds = surveyImageAds.filter((ad: ImageAdConfig) => 
      placementConfig.includes(ad.id) && !dismissedAds.includes(ad.id)
    );
    
    // Randomize if enabled
    if (adRotationConfig.randomize) {
      const shuffled = [...placementAds].sort(() => Math.random() - 0.5);
      setVisibleAds(shuffled.slice(0, maxAds));
    } else {
      setVisibleAds(placementAds.slice(0, maxAds));
    }
  }, [placement, maxAds, dismissedAds]);

  // Auto-rotation
  useEffect(() => {
    if (!enableRotation || !adRotationConfig.enabled || visibleAds.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % visibleAds.length);
    }, adRotationConfig.intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [enableRotation, visibleAds.length]);

  const handleAdClose = (adId: string) => {
    const newDismissed = [...dismissedAds, adId];
    setDismissedAds(newDismissed);
    localStorage.setItem('dismissedImageAds', JSON.stringify(newDismissed));
  };

  if (visibleAds.length === 0) {
    return null;
  }

  // Single ad display
  if (maxAds === 1) {
    const currentAd = visibleAds[currentAdIndex];
    if (!currentAd) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          <ImageAd
            ad={currentAd}
            variant={variant}
            onClose={() => handleAdClose(currentAd.id)}
            dismissible={true}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Multiple ads display
  return (
    <div className={`space-y-6 ${className}`}>
      {visibleAds.map((ad, index) => (
        <motion.div
          key={ad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ImageAd
            ad={ad}
            variant={variant}
            onClose={() => handleAdClose(ad.id)}
            dismissible={true}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageAdContainer;
