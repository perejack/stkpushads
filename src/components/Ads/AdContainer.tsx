import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdBanner, AdConfig } from './AdBanner';
import { useAdManager } from './AdManager';
import { adRotationConfig } from '../../config/adsConfig';

interface AdContainerProps {
  placement: string;
  variant?: 'banner' | 'card' | 'inline' | 'sticky' | 'hero';
  maxAds?: number;
  enableRotation?: boolean;
  className?: string;
}

/**
 * AdContainer - Smart ad display component with rotation and management
 * 
 * Features:
 * - Automatic ad rotation
 * - Placement-based filtering
 * - Dismissal handling
 * - Analytics tracking
 * - Responsive design
 */
export const AdContainer: React.FC<AdContainerProps> = ({
  placement,
  variant = 'banner',
  maxAds = 1,
  enableRotation = true,
  className = ''
}) => {
  const { activeAds, dismissAd, getAdsByPlacement } = useAdManager();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [visibleAds, setVisibleAds] = useState<AdConfig[]>([]);

  // Get ads for this placement
  useEffect(() => {
    const placementAds = getAdsByPlacement(placement);
    
    // Randomize if enabled
    if (adRotationConfig.randomize) {
      const shuffled = [...placementAds].sort(() => Math.random() - 0.5);
      setVisibleAds(shuffled.slice(0, maxAds));
    } else {
      setVisibleAds(placementAds.slice(0, maxAds));
    }
  }, [placement, activeAds, maxAds, getAdsByPlacement]);

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
    dismissAd(adId);
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
          <AdBanner
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
    <div className={`space-y-4 ${className}`}>
      {visibleAds.map((ad, index) => (
        <motion.div
          key={ad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AdBanner
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

export default AdContainer;
