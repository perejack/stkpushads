import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();

  const handleAnalyticsClick = () => {
    navigate('/ad-analytics');
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <motion.button
            onClick={handleAnalyticsClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all"
            title="View Ad Analytics"
          >
            <Star className="w-6 h-6 text-white fill-white" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
