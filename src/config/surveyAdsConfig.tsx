import { DollarSign, TrendingUp, Award, Briefcase, Gift, Zap, Target } from 'lucide-react';
import { AdConfig } from '../components/Ads/AdBanner';
import { ImageAdConfig } from '../components/Ads/ImageAd';
import surveyImage1 from '../components/Ads/survay1.jpeg';
import surveyImage2 from '../components/Ads/survay2.jpeg';
import surveyImage3 from '../components/Ads/survay3.jpeg';
import surveyImage4 from '../components/Ads/survay4.jpeg';

/**
 * SURVEY ADS CONFIGURATION - HIGHLY CLICKABLE
 * 
 * Psychology-driven survey ads designed to maximize clicks
 * 
 * UPDATE YOUR SURVEY PLATFORM URL BELOW!
 */

const SURVEY_PLATFORM_URL = 'https://www.earntasking.online/?ref=swiftloan'; // ✅ UPDATED!

/**
 * TEXT-BASED SURVEY ADS
 * Short, punchy, clickbait-style ads
 */
export const surveyTextAds: AdConfig[] = [
  {
    id: 'survey-instant-cash',
    title: '',
    description: '',
    ctaText: 'Start Earning Now',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500',
    imageUrl: surveyImage4,
    badge: '🔥 INSTANT PAY',
    impressionTracking: 'survey-instant-cash-impression',
    clickTracking: 'survey-instant-cash-click'
  },
  {
    id: 'survey-bonus-offer',
    title: '🎁 KES 200 FREE Bonus Right Now',
    description: 'Just for signing up! Complete 1 survey, get paid today. Limited spots!',
    ctaText: 'Claim My KES 200',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-orange-600 via-red-500 to-pink-600',
    icon: <Gift className="w-8 h-8 text-white" />,
    badge: '⚡ ONLY 50 SPOTS LEFT',
    impressionTracking: 'survey-bonus-impression',
    clickTracking: 'survey-bonus-click'
  },
  {
    id: 'survey-quick-money',
    title: '⚡ Need Money TODAY? Do This!',
    description: 'People are making KES 1,000+ daily. Takes 15 minutes. Start now!',
    ctaText: 'Show Me How',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500',
    icon: <Zap className="w-8 h-8 text-white" />,
    badge: '🚀 TRENDING NOW',
    impressionTracking: 'survey-quick-money-impression',
    clickTracking: 'survey-quick-money-click'
  },
  {
    id: 'survey-easy-money',
    title: '✅ Easiest Way to Make Money Online',
    description: 'No skills needed. Just your phone. Get paid to M-PESA in minutes!',
    ctaText: 'Start Earning',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600',
    icon: <Target className="w-8 h-8 text-white" />,
    badge: '✓ VERIFIED',
    impressionTracking: 'survey-easy-money-impression',
    clickTracking: 'survey-easy-money-click'
  },
  {
    id: 'survey-while-waiting',
    title: '',
    description: '',
    ctaText: 'Earn While Waiting',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-500',
    imageUrl: surveyImage2,
    badge: '💡 SMART MOVE',
    impressionTracking: 'survey-while-waiting-impression',
    clickTracking: 'survey-while-waiting-click'
  },
  {
    id: 'survey-success-bonus',
    title: '',
    description: '',
    ctaText: 'Get Extra Cash',
    ctaUrl: SURVEY_PLATFORM_URL,
    bgGradient: 'bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-600',
    imageUrl: surveyImage3,
    badge: '💰 BONUS TIME',
    impressionTracking: 'survey-success-impression',
    clickTracking: 'survey-success-click'
  }
];

/**
 * IMAGE-BASED SURVEY ADS
 * Using YOUR custom survey images!
 */
export const surveyImageAds: ImageAdConfig[] = [
  {
    id: 'survey-hero-main',
    title: 'Make KES 500+ Today',
    subtitle: 'Answer Questions, Get Paid Instantly',
    description: 'Join 50,000+ Kenyans earning money with simple surveys. No experience needed. Money sent to M-PESA in minutes!',
    ctaText: 'Start Earning Now →',
    ctaUrl: SURVEY_PLATFORM_URL,
    imageUrl: surveyImage1,
    overlayGradient: 'bg-gradient-to-t from-green-900/95 via-emerald-600/70 to-transparent',
    badge: '🔥 50,000+ USERS',
    textPosition: 'bottom'
  },
  {
    id: 'survey-instant-bonus',
    title: 'KES 200 FREE Bonus',
    subtitle: 'Just for Signing Up Today',
    description: 'Limited time offer! Get KES 200 instantly credited to your account. Complete your first survey and withdraw immediately!',
    ctaText: 'Claim KES 200 Now →',
    ctaUrl: SURVEY_PLATFORM_URL,
    imageUrl: surveyImage2,
    overlayGradient: 'bg-gradient-to-br from-orange-900/95 via-red-600/70 to-transparent',
    badge: '⚡ LIMITED TIME',
    textPosition: 'center'
  },
  {
    id: 'survey-phone-money',
    title: 'Your Phone = Money Machine',
    subtitle: 'Earn KES 1,000+ Per Day',
    description: 'Turn your smartphone into a money-making machine. Complete surveys anytime, anywhere. Instant M-PESA payments!',
    ctaText: 'Start Making Money →',
    ctaUrl: SURVEY_PLATFORM_URL,
    imageUrl: surveyImage3,
    overlayGradient: 'bg-gradient-to-r from-purple-900/95 via-pink-600/70 to-transparent',
    badge: '💰 HIGH PAYING',
    textPosition: 'left',
    imagePosition: 'right'
  },
  {
    id: 'survey-quick-cash',
    title: 'Need Cash Right Now?',
    subtitle: '10 Minutes = KES 500',
    description: 'Fastest way to make money online in Kenya. No waiting, no hassle. Answer questions, get paid instantly to M-PESA!',
    ctaText: 'Get Cash Now →',
    ctaUrl: SURVEY_PLATFORM_URL,
    imageUrl: surveyImage4,
    overlayGradient: 'bg-gradient-to-t from-blue-900/95 via-cyan-600/70 to-transparent',
    badge: '⚡ INSTANT PAY',
    textPosition: 'bottom'
  }
];

/**
 * SURVEY AD PLACEMENTS
 * Strategic positions for maximum visibility and clicks
 */
export const surveyAdPlacements = {
  // Homepage - First thing users see
  'homepage-hero-survey': ['survey-bonus-offer'],
  'homepage-image-survey': ['survey-hero-main', 'survey-instant-bonus'],
  
  // Application flow - Captive audience (USE IMAGE AD HERE)
  'application-waiting-survey': ['survey-instant-cash'],
  'application-waiting-image': ['survey-quick-cash'],
  
  // Success page - Users are happy, receptive
  'success-page-survey': ['survey-success-bonus'],
  'success-page-image': ['survey-phone-money'],
  
  // Sticky - Always visible
  'sticky-survey': ['survey-quick-money', 'survey-easy-money']
};

/**
 * CLICKBAIT PSYCHOLOGY TRIGGERS
 * 
 * These elements make ads irresistible:
 * 1. Specific numbers (KES 500, 10 minutes)
 * 2. Urgency (LIMITED TIME, ONLY 50 SPOTS)
 * 3. Social proof (50,000+ users)
 * 4. Instant gratification (RIGHT NOW, TODAY)
 * 5. Easy/Simple (No skills, Just your phone)
 * 6. Free money (FREE Bonus, KES 200)
 * 7. Emojis for attention (💰🔥⚡)
 */

export default surveyTextAds;
