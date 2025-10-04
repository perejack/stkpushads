import React, { useState, useEffect } from 'react';
import { PopupAd } from './PopupAd';
import { surveyImageAds } from '../../config/surveyAdsConfig';

interface PopupAdManagerProps {
  enabled?: boolean;
  displayDuration?: number; // how long each popup shows
  delayBeforeFirstPopup?: number; // delay before first popup
}

/**
 * PopupAdManager - Manages sequential popup ads with custom timing
 * 
 * Timing:
 * - First popup: After 2 seconds, shows for 8 seconds
 * - Second popup: 3 seconds after first closes, shows for 8 seconds
 * - Third popup: 30 seconds after second closes
 * - Fourth popup: 30 seconds after third closes
 * - Then repeats cycle
 */
export const PopupAdManager: React.FC<PopupAdManagerProps> = ({
  enabled = true,
  displayDuration = 8000, // 8 seconds display
  delayBeforeFirstPopup = 2000 // 2 seconds before first popup
}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupCount, setPopupCount] = useState(0);

  useEffect(() => {
    if (!enabled || surveyImageAds.length === 0) return;

    let timer: NodeJS.Timeout;

    const scheduleNextPopup = () => {
      let delay: number;

      if (popupCount === 0) {
        // First popup: 2 seconds
        delay = delayBeforeFirstPopup;
      } else if (popupCount === 1) {
        // Second popup: 3 seconds after first closes (8s display + 3s wait)
        delay = displayDuration + 3000;
      } else {
        // Third, fourth, etc: 30 seconds after previous closes
        delay = displayDuration + 30000;
      }

      timer = setTimeout(() => {
        setShowPopup(true);
        setPopupCount((prev) => prev + 1);
        setCurrentAdIndex((prev) => (prev + 1) % surveyImageAds.length);
      }, delay);
    };

    scheduleNextPopup();

    return () => clearTimeout(timer);
  }, [enabled, popupCount, displayDuration, delayBeforeFirstPopup]);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  if (!enabled || surveyImageAds.length === 0) return null;

  const currentAd = surveyImageAds[currentAdIndex];

  return (
    <>
      {showPopup && currentAd && (
        <PopupAd
          imageUrl={currentAd.imageUrl}
          ctaText={currentAd.ctaText}
          ctaUrl={currentAd.ctaUrl}
          displayDuration={displayDuration}
          delayBeforeShow={0}
          onClose={handlePopupClose}
        />
      )}
    </>
  );
};

export default PopupAdManager;
