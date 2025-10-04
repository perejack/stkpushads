import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, TrendingUp } from 'lucide-react';

export interface ImageAdConfig {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  overlayGradient?: string;
  badge?: string;
  textPosition?: 'left' | 'right' | 'center' | 'bottom';
  imagePosition?: 'left' | 'right' | 'top' | 'background';
  impressionTracking?: string;
  clickTracking?: string;
}

interface ImageAdProps {
  ad: ImageAdConfig;
  variant?: 'standard' | 'overlay' | 'split' | 'card' | 'banner';
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
}

/**
 * ImageAd - Beautiful image-based ads with headlines and CTAs
 * 
 * Variants:
 * - standard: Image on left/right, content on opposite side
 * - overlay: Text overlaid on image with gradient
 * - split: 50/50 split layout
 * - card: Vertical card with image on top
 * - banner: Horizontal banner with background image
 */
export const ImageAd: React.FC<ImageAdProps> = ({
  ad,
  variant = 'standard',
  onClose,
  dismissible = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (ad.impressionTracking && !hasInteracted) {
      trackImpression(ad.id);
    }
  }, [ad.id, ad.impressionTracking, hasInteracted]);

  const trackImpression = (adId: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_ad_impression', {
        ad_id: adId,
        ad_title: ad.title,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleClick = () => {
    setHasInteracted(true);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_ad_click', {
        ad_id: ad.id,
        ad_title: ad.title,
        ad_url: ad.ctaUrl,
        timestamp: new Date().toISOString()
      });
    }

    window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_ad_dismissed', {
        ad_id: ad.id,
        ad_title: ad.title,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (!isVisible) return null;

  // Overlay Variant - Clean image with CTA button only
  if (variant === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer group ${className}`}
        onClick={handleClick}
      >
        {/* Sponsored Label */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 z-20 shadow-lg">
          Sponsored
        </div>

        {dismissible && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 shadow-lg"
            aria-label="Close ad"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Clean Image - No overlay text */}
        <div className="relative">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* CTA Button at bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-gray-900 px-6 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl"
              onClick={handleClick}
            >
              {ad.ctaText}
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Split Variant - 50/50 image and content
  if (variant === 'split') {
    const imageOnRight = ad.imagePosition === 'right';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl shadow-2xl bg-white ${className}`}
      >
        {/* Sponsored Label */}
        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white z-20">
          Sponsored
        </div>

        {dismissible && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 shadow-lg"
            aria-label="Close ad"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        )}

        <div className={`flex flex-col md:flex-row ${imageOnRight ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Side */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className={`w-full h-full object-cover ${
                !imageLoaded ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-500`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>

          {/* Content Side */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {ad.badge && (
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4 w-fit">
                {ad.badge}
              </div>
            )}
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {ad.title}
            </h2>
            
            {ad.subtitle && (
              <p className="text-xl text-gray-700 mb-4 font-medium">
                {ad.subtitle}
              </p>
            )}
            
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              {ad.description}
            </p>
            
            <button
              onClick={handleClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-fit shadow-lg"
            >
              {ad.ctaText}
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Card Variant - Vertical card with image on top
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative overflow-hidden rounded-2xl shadow-xl bg-white ${className}`}
      >
        {/* Sponsored Label */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 z-20 shadow-md">
          Sponsored
        </div>

        {dismissible && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 shadow-md"
            aria-label="Close ad"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        )}

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className={`w-full h-full object-cover transition-all duration-500 hover:scale-110 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {ad.badge && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {ad.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
            {ad.title}
          </h3>
          
          {ad.subtitle && (
            <p className="text-base text-gray-700 mb-2 font-medium">
              {ad.subtitle}
            </p>
          )}
          
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {ad.description}
          </p>
          
          <button
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            {ad.ctaText}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Banner Variant - Horizontal banner with background image
  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer group ${className}`}
        onClick={handleClick}
      >
        {/* Sponsored Label */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-gray-700 z-20">
          Sponsored
        </div>

        {dismissible && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-3 right-3 p-1.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
            aria-label="Close ad"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        )}

        <div className="relative h-32 md:h-40">
          {/* Background Image */}
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${
            ad.overlayGradient || 'bg-gradient-to-r from-black/70 via-black/50 to-transparent'
          }`} />

          {/* Content */}
          <div className="relative h-full flex items-center px-6 md:px-8">
            <div className="flex-1">
              {ad.badge && (
                <div className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {ad.badge}
                </div>
              )}
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                {ad.title}
              </h3>
              
              <p className="text-sm md:text-base text-white/90 mb-3">
                {ad.description}
              </p>
              
              <button
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2 text-sm md:text-base shadow-lg"
                onClick={handleClick}
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

  // Standard Variant - Default layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl shadow-lg bg-white ${className}`}
    >
      {/* Sponsored Label */}
      <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-white z-20">
        Sponsored
      </div>

      {dismissible && (
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20 shadow-md"
          aria-label="Close ad"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 p-6">
        {/* Image */}
        <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-110 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          {ad.badge && (
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {ad.badge}
            </div>
          )}
          
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {ad.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            {ad.description}
          </p>
          
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all inline-flex items-center gap-2 shadow-md"
          >
            {ad.ctaText}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageAd;
