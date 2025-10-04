import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, TrendingUp, DollarSign, Award, Sparkles } from 'lucide-react';

export interface AdConfig {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
  bgGradient: string;
  icon?: React.ReactNode;
  badge?: string;
  impressionTracking?: string;
  clickTracking?: string;
}

interface AdBannerProps {
  ad: AdConfig;
  variant?: 'banner' | 'card' | 'inline' | 'sticky' | 'hero';
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  ad,
  variant = 'banner',
  onClose,
  dismissible = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Track impression
    if (ad.impressionTracking && !hasInteracted) {
      trackImpression(ad.id);
    }
  }, [ad.id, ad.impressionTracking, hasInteracted]);

  const trackImpression = (adId: string) => {
    // Google Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_impression', {
        ad_id: adId,
        ad_title: ad.title,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleClick = () => {
    setHasInteracted(true);
    
    // Track click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_click', {
        ad_id: ad.id,
        ad_title: ad.title,
        ad_url: ad.ctaUrl,
        timestamp: new Date().toISOString()
      });
    }

    // Open in new tab
    window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
    
    // Track dismissal
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_dismissed', {
        ad_id: ad.id,
        ad_title: ad.title,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (!isVisible) return null;

  // Banner variant - horizontal layout
  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}
      >
        <div className={`${ad.bgGradient} p-4 md:p-6`}>
          {/* Sponsored Label */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600">
            Sponsored
          </div>

          {dismissible && (
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Close ad"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            {/* Icon/Image */}
            <div className="flex-shrink-0">
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  {ad.icon || <Sparkles className="w-8 h-8 text-white" />}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white">{ad.title}</h3>
                {ad.badge && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {ad.badge}
                  </span>
                )}
              </div>
              <p className="text-white/90 text-sm md:text-base mb-4">{ad.description}</p>
              <button
                onClick={handleClick}
                className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto md:mx-0 shadow-lg"
              >
                {ad.ctaText}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Card variant - vertical layout
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative overflow-hidden rounded-xl shadow-xl w-full max-w-sm mx-auto ${className}`}
      >
        <div className={`${ad.bgGradient} p-4 sm:p-6`}>
          {/* Sponsored Label */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600">
            Sponsored
          </div>

          {dismissible && (
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
              aria-label="Close ad"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}

          <div className="text-center mt-4 sm:mt-6">
            {/* Large Image */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto rounded-xl object-cover shadow-2xl" />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  {ad.icon || <Award className="w-16 h-16 sm:w-20 sm:h-20 text-white" />}
                </div>
              )}
            </div>

            {/* Badge */}
            {ad.badge && (
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                {ad.badge}
              </div>
            )}
            
            <button
              onClick={handleClick}
              className="w-full bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-2xl"
            >
              {ad.ctaText}
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Inline variant - compact horizontal
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={`relative overflow-hidden rounded-lg ${className}`}
      >
        <div className={`${ad.bgGradient} p-4`}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-white/70 flex-shrink-0">Sponsored</span>
            
            {ad.imageUrl ? (
              <img src={ad.imageUrl} alt={ad.title} className="w-10 h-10 rounded object-cover" />
            ) : (
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center flex-shrink-0">
                {ad.icon || <TrendingUp className="w-5 h-5 text-white" />}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{ad.title}</h4>
              <p className="text-xs text-white/80 truncate">{ad.description}</p>
            </div>

            <button
              onClick={handleClick}
              className="flex-shrink-0 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all"
            >
              {ad.ctaText}
            </button>

            {dismissible && (
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close ad"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Sticky variant - fixed position
  if (variant === 'sticky') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-auto sm:right-4 sm:w-96 max-w-[calc(100vw-1rem)] z-50 ${className}`}
          >
            <div className={`${ad.bgGradient} rounded-xl shadow-2xl p-3 sm:p-4`}>
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium text-gray-600">
                Sponsored
              </div>

              {dismissible && (
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 p-1 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-label="Close ad"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                </button>
              )}

              <div className="flex items-center gap-2 sm:gap-3 mt-5 sm:mt-6">
                {ad.imageUrl ? (
                  <img src={ad.imageUrl} alt={ad.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    {ad.icon || <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 truncate">{ad.title}</h4>
                  <p className="text-[10px] sm:text-xs text-white/90 mb-1.5 sm:mb-2 line-clamp-2">{ad.description}</p>
                  <button
                    onClick={handleClick}
                    className="bg-white text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-1"
                  >
                    {ad.ctaText}
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Hero variant - large featured ad
  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}
      >
        <div className={`${ad.bgGradient} p-8 md:p-12`}>
          {/* Sponsored Label */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600">
            Sponsored
          </div>

          {dismissible && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Close ad"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}

          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            {/* Image/Icon */}
            <div className="flex-shrink-0">
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-2xl" />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                  {ad.icon || <Award className="w-20 h-20 text-white" />}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {ad.badge && (
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-4">
                  {ad.badge}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ad.title}</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl">{ad.description}</p>
              <button
                onClick={handleClick}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto md:mx-0 shadow-2xl"
              >
                {ad.ctaText}
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    );
  }

  return null;
};

export default AdBanner;
