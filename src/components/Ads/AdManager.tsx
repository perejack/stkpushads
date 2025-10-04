import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdConfig } from './AdBanner';

interface AdManagerContextType {
  ads: AdConfig[];
  activeAds: AdConfig[];
  dismissedAds: string[];
  dismissAd: (adId: string) => void;
  getAdsByPlacement: (placement: string) => AdConfig[];
  trackAdInteraction: (adId: string, interactionType: 'impression' | 'click' | 'dismiss') => void;
}

const AdManagerContext = createContext<AdManagerContextType | undefined>(undefined);

export const useAdManager = () => {
  const context = useContext(AdManagerContext);
  if (!context) {
    throw new Error('useAdManager must be used within AdManagerProvider');
  }
  return context;
};

interface AdManagerProviderProps {
  children: ReactNode;
  ads: AdConfig[];
}

export const AdManagerProvider: React.FC<AdManagerProviderProps> = ({ children, ads }) => {
  const [dismissedAds, setDismissedAds] = useState<string[]>([]);
  const [activeAds, setActiveAds] = useState<AdConfig[]>(ads);

  // Load dismissed ads from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dismissedAds');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDismissedAds(parsed);
      } catch (e) {
        console.error('Error parsing dismissed ads:', e);
      }
    }
  }, []);

  // Update active ads when dismissed ads change
  useEffect(() => {
    const filtered = ads.filter(ad => !dismissedAds.includes(ad.id));
    setActiveAds(filtered);
  }, [ads, dismissedAds]);

  const dismissAd = (adId: string) => {
    const newDismissed = [...dismissedAds, adId];
    setDismissedAds(newDismissed);
    localStorage.setItem('dismissedAds', JSON.stringify(newDismissed));
    
    // Track dismissal
    trackAdInteraction(adId, 'dismiss');
  };

  const getAdsByPlacement = (placement: string): AdConfig[] => {
    // Filter ads by placement metadata if available
    return activeAds.filter(ad => {
      const adWithPlacement = ad as any;
      return !adWithPlacement.placement || adWithPlacement.placement === placement;
    });
  };

  const trackAdInteraction = (adId: string, interactionType: 'impression' | 'click' | 'dismiss') => {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', `ad_${interactionType}`, {
        ad_id: adId,
        timestamp: new Date().toISOString(),
        page_path: window.location.pathname
      });
    }

    // Store in localStorage for analytics
    const key = `ad_analytics_${adId}`;
    const stored = localStorage.getItem(key);
    let analytics = stored ? JSON.parse(stored) : { impressions: 0, clicks: 0, dismissals: 0 };
    
    if (interactionType === 'impression') analytics.impressions++;
    if (interactionType === 'click') analytics.clicks++;
    if (interactionType === 'dismiss') analytics.dismissals++;
    
    localStorage.setItem(key, JSON.stringify(analytics));
  };

  return (
    <AdManagerContext.Provider
      value={{
        ads,
        activeAds,
        dismissedAds,
        dismissAd,
        getAdsByPlacement,
        trackAdInteraction
      }}
    >
      {children}
    </AdManagerContext.Provider>
  );
};

export default AdManagerProvider;
