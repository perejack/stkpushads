import React from 'react';
import { motion } from 'framer-motion';
import { AdBanner } from './AdBanner';
import { adsConfig } from '../../config/adsConfig';
import { Sparkles } from 'lucide-react';

/**
 * AdShowcase - Demo page to preview all ad variants
 * Access at /admin/ad-showcase to see all ad designs
 */
export const AdShowcase: React.FC = () => {
  const demoAd = adsConfig[0]; // Use first ad for demo

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-4"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">Ad Showcase</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ad Integration Preview
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preview all ad variants and placements. Use this page to test designs before going live.
          </p>
        </div>

        {/* Hero Variant */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Ad Variant</h2>
            <p className="text-gray-600">
              Large, attention-grabbing format. Best for homepage top placement.
            </p>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">High Visibility</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Desktop & Mobile</span>
            </div>
          </div>
          <AdBanner ad={demoAd} variant="hero" dismissible={false} />
        </section>

        {/* Card Variant */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Ad Variant</h2>
            <p className="text-gray-600">
              Vertical card format. Perfect for sidebars and waiting screens.
            </p>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">High Engagement</span>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Captive Audience</span>
            </div>
          </div>
          <div className="max-w-sm">
            <AdBanner ad={demoAd} variant="card" dismissible={false} />
          </div>
        </section>

        {/* Banner Variant */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Banner Ad Variant</h2>
            <p className="text-gray-600">
              Horizontal banner format. Great for content sections and between features.
            </p>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Balanced</span>
              <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">Versatile</span>
            </div>
          </div>
          <AdBanner ad={demoAd} variant="banner" dismissible={false} />
        </section>

        {/* Inline Variant */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inline Ad Variant</h2>
            <p className="text-gray-600">
              Compact horizontal format. Blends naturally with content flow.
            </p>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Non-Intrusive</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Natural Flow</span>
            </div>
          </div>
          <AdBanner ad={demoAd} variant="inline" dismissible={false} />
        </section>

        {/* Sticky Variant */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sticky Ad Variant</h2>
            <p className="text-gray-600">
              Fixed position at bottom. Persistent but non-intrusive presence.
            </p>
            <div className="mt-2 flex gap-2 text-sm">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Always Visible</span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">High Impressions</span>
            </div>
          </div>
          <div className="bg-gray-200 rounded-xl p-8 relative" style={{ minHeight: '400px' }}>
            <div className="text-center text-gray-500">
              <p className="mb-2">Scroll down to see sticky ad in action</p>
              <p className="text-sm">(In production, this appears at bottom-right of screen)</p>
            </div>
            <AdBanner ad={demoAd} variant="sticky" dismissible={false} />
          </div>
        </section>

        {/* All Ads Grid */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Available Ads</h2>
            <p className="text-gray-600">
              Preview all configured ads in card format.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adsConfig.map((ad) => (
              <AdBanner key={ad.id} ad={ad} variant="card" dismissible={false} />
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ad Placement Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Do's
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Place ads at natural content breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Use hero ads for maximum visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Show ads during waiting periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Make all ads dismissible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Test different variants</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Don't block main content with ads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Don't show too many ads per page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Don't use misleading claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Don't hide the "Sponsored" label</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Don't force users to view ads</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Performance Benchmarks</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">2-3%</div>
                <div className="text-sm text-gray-600">Good CTR</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">&lt;30%</div>
                <div className="text-sm text-gray-600">Dismissal Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">3-5</div>
                <div className="text-sm text-gray-600">Ads Per Page</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-1">30s</div>
                <div className="text-sm text-gray-600">Rotation Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            Ready to go live? Update your URLs in <code className="bg-gray-200 px-2 py-1 rounded">src/config/adsConfig.tsx</code>
          </p>
          <p className="text-sm">
            Monitor performance at <code className="bg-gray-200 px-2 py-1 rounded">/admin/ad-analytics</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdShowcase;
