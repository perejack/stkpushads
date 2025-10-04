import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, MousePointer, XCircle, BarChart3, DollarSign } from 'lucide-react';
import { adsConfig } from '../../config/adsConfig';

interface AdAnalytics {
  impressions: number;
  clicks: number;
  dismissals: number;
  ctr: number;
  revenue?: number;
}

interface AdPerformance {
  id: string;
  title: string;
  analytics: AdAnalytics;
}

/**
 * AdAnalyticsDashboard - Admin dashboard for monitoring ad performance
 * 
 * Features:
 * - Real-time analytics
 * - Click-through rates (CTR)
 * - Impression tracking
 * - Dismissal rates
 * - Revenue estimation
 */
export const AdAnalyticsDashboard: React.FC = () => {
  const [adPerformance, setAdPerformance] = useState<AdPerformance[]>([]);
  const [totalStats, setTotalStats] = useState({
    impressions: 0,
    clicks: 0,
    dismissals: 0,
    avgCtr: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const performance: AdPerformance[] = [];
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalDismissals = 0;

    adsConfig.forEach(ad => {
      const key = `ad_analytics_${ad.id}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        const analytics = JSON.parse(stored);
        const ctr = analytics.impressions > 0 
          ? (analytics.clicks / analytics.impressions) * 100 
          : 0;

        performance.push({
          id: ad.id,
          title: ad.title,
          analytics: {
            ...analytics,
            ctr: parseFloat(ctr.toFixed(2))
          }
        });

        totalImpressions += analytics.impressions || 0;
        totalClicks += analytics.clicks || 0;
        totalDismissals += analytics.dismissals || 0;
      } else {
        performance.push({
          id: ad.id,
          title: ad.title,
          analytics: {
            impressions: 0,
            clicks: 0,
            dismissals: 0,
            ctr: 0
          }
        });
      }
    });

    const avgCtr = totalImpressions > 0 
      ? (totalClicks / totalImpressions) * 100 
      : 0;

    setAdPerformance(performance);
    setTotalStats({
      impressions: totalImpressions,
      clicks: totalClicks,
      dismissals: totalDismissals,
      avgCtr: parseFloat(avgCtr.toFixed(2))
    });
  };

  const clearAnalytics = () => {
    if (window.confirm('Are you sure you want to clear all analytics data?')) {
      adsConfig.forEach(ad => {
        localStorage.removeItem(`ad_analytics_${ad.id}`);
      });
      loadAnalytics();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ad Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your ad performance and optimize conversions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalStats.impressions.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Impressions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalStats.clicks.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Clicks</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`text-sm font-semibold ${totalStats.avgCtr > 2 ? 'text-green-500' : 'text-orange-500'}`}>
                {totalStats.avgCtr > 2 ? 'Good' : 'Fair'}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalStats.avgCtr}%
            </h3>
            <p className="text-sm text-gray-600">Average CTR</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">
                {totalStats.impressions > 0 
                  ? `${((totalStats.dismissals / totalStats.impressions) * 100).toFixed(1)}%`
                  : '0%'}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalStats.dismissals.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Dismissals</p>
          </motion.div>
        </div>

        {/* Individual Ad Performance */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Ad Performance</h2>
            <button
              onClick={clearAnalytics}
              className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Clear Data
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dismissals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adPerformance.map((ad, index) => (
                  <motion.tr
                    key={ad.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                      <div className="text-xs text-gray-500">{ad.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {ad.analytics.impressions.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MousePointer className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {ad.analytics.clicks.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ad.analytics.ctr > 3 
                          ? 'bg-green-100 text-green-800'
                          : ad.analytics.ctr > 1
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ad.analytics.ctr}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {ad.analytics.dismissals.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ad.analytics.impressions > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ad.analytics.impressions > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Optimization Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Good CTR:</strong> Above 2% is considered good for display ads. Above 3% is excellent.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>High Dismissals:</strong> If dismissal rate is above 30%, consider adjusting ad placement or frequency.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Low Impressions:</strong> Check if ad placements are visible and not blocked by other elements.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>A/B Testing:</strong> Rotate different ad creatives and track which performs best.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdAnalyticsDashboard;
