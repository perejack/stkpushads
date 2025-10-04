import { DollarSign, TrendingUp, Award, Briefcase, Gift, Zap } from 'lucide-react';
import { AdConfig } from '../components/Ads/AdBanner';
import { ImageAdConfig } from '../components/Ads/ImageAd';

/**
 * Ad Configuration
 * 
 * IMPORTANT: Update these ads with your actual survey platform and money-making opportunities
 * 
 * Google Ads Policy Compliance:
 * - All ads are clearly labeled as "Sponsored"
 * - Ads are non-intrusive and dismissible
 * - No misleading claims or deceptive content
 * - Clear call-to-action buttons
 * - Proper disclosure of sponsored content
 */

export const adsConfig: AdConfig[] = [
  {
    id: 'survey-platform-main',
    title: 'Earn KES 500+ Daily with Surveys',
    description: 'Complete simple surveys and get paid instantly to M-PESA. No experience needed!',
    ctaText: 'Start Earning Now',
    ctaUrl: 'https://your-survey-platform.com?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    badge: '🔥 Hot Offer',
    impressionTracking: 'survey-platform-impression',
    clickTracking: 'survey-platform-click'
  },
  {
    id: 'money-opportunity-1',
    title: 'Make Money While You Wait',
    description: 'Turn your spare time into cash. Join thousands earning extra income daily.',
    ctaText: 'Learn More',
    ctaUrl: 'https://your-opportunity-platform.com?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500',
    icon: <DollarSign className="w-8 h-8 text-white" />,
    badge: 'Verified',
    impressionTracking: 'money-opp-1-impression',
    clickTracking: 'money-opp-1-click'
  },
  {
    id: 'survey-bonus',
    title: 'KES 200 Sign-Up Bonus',
    description: 'Get instant bonus when you complete your first survey. Limited time offer!',
    ctaText: 'Claim Bonus',
    ctaUrl: 'https://your-survey-platform.com/bonus?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-orange-600 via-red-500 to-pink-600',
    icon: <Gift className="w-8 h-8 text-white" />,
    badge: '⚡ Limited Time',
    impressionTracking: 'survey-bonus-impression',
    clickTracking: 'survey-bonus-click'
  },
  {
    id: 'freelance-opportunity',
    title: 'Freelance Jobs Available',
    description: 'Find quick gigs and freelance work. Get paid for your skills today.',
    ctaText: 'Browse Jobs',
    ctaUrl: 'https://your-freelance-platform.com?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600',
    icon: <Briefcase className="w-8 h-8 text-white" />,
    badge: 'New',
    impressionTracking: 'freelance-impression',
    clickTracking: 'freelance-click'
  },
  {
    id: 'instant-tasks',
    title: 'Quick Tasks, Instant Pay',
    description: 'Complete micro-tasks and earn money in minutes. Perfect for quick cash!',
    ctaText: 'Start Tasks',
    ctaUrl: 'https://your-task-platform.com?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-500',
    icon: <Zap className="w-8 h-8 text-white" />,
    badge: '⚡ Fast Pay',
    impressionTracking: 'instant-tasks-impression',
    clickTracking: 'instant-tasks-click'
  },
  {
    id: 'referral-program',
    title: 'Refer & Earn KES 1,000',
    description: 'Invite friends to our survey platform and earn generous commissions.',
    ctaText: 'Join Program',
    ctaUrl: 'https://your-survey-platform.com/referral?ref=swiftloan', // UPDATE THIS URL
    bgGradient: 'bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-600',
    icon: <Award className="w-8 h-8 text-white" />,
    badge: '💰 High Payout',
    impressionTracking: 'referral-impression',
    clickTracking: 'referral-click'
  }
];

/**
 * Ad Placement Configuration
 * 
 * Strategic placements for maximum visibility and conversion:
 * - homepage-hero: Large hero ad on homepage (high visibility)
 * - homepage-sidebar: Sidebar ad on homepage
 * - application-waiting: During loan processing (captive audience)
 * - application-success: After loan approval (high engagement)
 * - application-steps: Between application steps
 * - sticky-footer: Persistent bottom ad (non-intrusive)
 */

export const adPlacements = {
  'homepage-hero': ['survey-platform-main'],
  'homepage-sidebar': ['money-opportunity-1', 'survey-bonus'],
  'application-waiting': ['instant-tasks', 'survey-platform-main'],
  'application-success': ['referral-program', 'freelance-opportunity'],
  'application-steps': ['survey-bonus', 'money-opportunity-1'],
  'sticky-footer': ['survey-platform-main', 'instant-tasks']
};

/**
 * Ad Rotation Settings
 */
export const adRotationConfig = {
  enabled: true,
  intervalSeconds: 30, // Rotate ads every 30 seconds
  randomize: true // Randomize ad order
};

/**
 * Ad Display Rules
 */
export const adDisplayRules = {
  maxAdsPerPage: 3, // Maximum ads to show on a single page
  minTimeBetweenAds: 5000, // Minimum 5 seconds between showing ads
  respectDismissals: true, // Don't show dismissed ads
  dismissalExpiryDays: 7 // Show dismissed ads again after 7 days
};

/**
 * IMAGE-BASED ADS CONFIGURATION
 * 
 * These ads use images with overlays, perfect for visual campaigns
 * Upload your images to a CDN or use placeholder services
 */
export const imageAdsConfig: ImageAdConfig[] = [
  {
    id: 'survey-hero-image',
    title: 'Start Earning Today',
    subtitle: 'Get Paid for Your Opinion',
    description: 'Join thousands earning KES 500+ daily by completing simple surveys. Instant M-PESA payments!',
    ctaText: 'Start Earning Now',
    ctaUrl: 'https://your-survey-platform.com?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-t from-purple-900/90 via-purple-600/60 to-transparent',
    badge: '🔥 Hot Offer',
    textPosition: 'bottom'
  },
  {
    id: 'money-opportunity-image',
    title: 'Turn Your Time Into Money',
    subtitle: 'Flexible Work, Instant Pay',
    description: 'Complete tasks, answer surveys, and earn money on your schedule. Perfect for students and professionals.',
    ctaText: 'Get Started Free',
    ctaUrl: 'https://your-opportunity-platform.com?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-r from-green-900/90 via-emerald-600/60 to-transparent',
    badge: '✓ Verified',
    textPosition: 'left',
    imagePosition: 'right'
  },
  {
    id: 'bonus-offer-image',
    title: 'KES 200 Welcome Bonus',
    subtitle: 'Limited Time Offer',
    description: 'Sign up today and get KES 200 instantly credited to your account. Start earning immediately!',
    ctaText: 'Claim Your Bonus',
    ctaUrl: 'https://your-survey-platform.com/bonus?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-br from-orange-900/90 via-red-600/60 to-transparent',
    badge: '⚡ Limited Time',
    textPosition: 'center'
  },
  {
    id: 'freelance-work-image',
    title: 'Find Freelance Gigs',
    subtitle: 'Your Skills, Your Income',
    description: 'Browse hundreds of freelance opportunities. Get paid for writing, design, programming, and more.',
    ctaText: 'Browse Jobs',
    ctaUrl: 'https://your-freelance-platform.com?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-t from-blue-900/90 via-indigo-600/60 to-transparent',
    badge: 'New Opportunities',
    textPosition: 'bottom',
    imagePosition: 'background'
  },
  {
    id: 'instant-tasks-image',
    title: 'Quick Tasks, Fast Cash',
    subtitle: 'Earn in Minutes',
    description: 'Complete micro-tasks and get paid instantly. Perfect for earning extra cash during your free time.',
    ctaText: 'Start Tasks Now',
    ctaUrl: 'https://your-task-platform.com?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-r from-yellow-900/90 via-amber-600/60 to-transparent',
    badge: '⚡ Fast Pay',
    textPosition: 'left',
    imagePosition: 'right'
  },
  {
    id: 'referral-program-image',
    title: 'Refer Friends, Earn More',
    subtitle: 'KES 1,000 Per Referral',
    description: 'Share your unique link and earn generous commissions for every friend who joins and completes surveys.',
    ctaText: 'Join Referral Program',
    ctaUrl: 'https://your-survey-platform.com/referral?ref=swiftloan', // UPDATE THIS URL
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop', // REPLACE WITH YOUR IMAGE
    overlayGradient: 'bg-gradient-to-br from-cyan-900/90 via-blue-600/60 to-transparent',
    badge: '💰 High Payout',
    textPosition: 'center'
  }
];

/**
 * IMAGE AD PLACEMENT CONFIGURATION
 * 
 * Strategic placements for image-based ads
 */
export const imageAdPlacements = {
  'homepage-hero-image': ['survey-hero-image', 'money-opportunity-image'],
  'application-waiting-image': ['bonus-offer-image', 'instant-tasks-image'],
  'application-success-image': ['referral-program-image', 'freelance-work-image'],
  'homepage-feature-image': ['money-opportunity-image', 'freelance-work-image']
};

export default adsConfig;
