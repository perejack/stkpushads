import React from 'react';
import { motion } from 'framer-motion';
import { AdContainer } from './AdContainer';

interface AdSidebarProps {
  placement: string;
  className?: string;
}

/**
 * AdSidebar - Sticky sidebar for ads
 * Perfect for desktop views, displays multiple ads vertically
 */
export const AdSidebar: React.FC<AdSidebarProps> = ({ placement, className = '' }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`hidden lg:block ${className}`}
    >
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            💰 Earn Extra Income
          </h3>
          <p className="text-sm text-gray-600">
            Discover opportunities while you wait
          </p>
        </div>

        {/* Ads */}
        <AdContainer
          placement={placement}
          variant="card"
          maxAds={3}
          enableRotation={false}
        />

        {/* Trust Badge */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-700">Verified Opportunities</span>
          </div>
          <p className="text-xs text-gray-600">
            All opportunities are vetted for legitimacy and payment reliability.
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

export default AdSidebar;
