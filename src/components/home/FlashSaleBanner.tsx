import React from 'react';
import { motion } from 'framer-motion';

export const FlashSaleBanner: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Flash Sale"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-85"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-10 text-yellow-300 text-3xl animate-bounce-slow">🔥</div>
        <div className="absolute top-16 right-16 text-pink-300 text-2xl animate-float">💥</div>
        <div className="absolute bottom-12 left-1/4 text-purple-300 text-xl animate-float-reverse">⚡</div>
        <div className="absolute top-1/3 right-1/4 text-blue-300 text-lg animate-pulse-slow">✨</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h2
            animate={{ 
              textShadow: [
                "0 0 20px rgba(251, 207, 232, 0.8)", 
                "0 0 40px rgba(233, 213, 255, 0.6)", 
                "0 0 20px rgba(251, 207, 232, 0.8)"
              ],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-8xl font-extrabold text-white mb-4 font-baloo drop-shadow-lg"
            style={{
              background: 'linear-gradient(45deg, #FEF9C3, #FBCFE8, #A7F3D0)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 2s linear infinite'
            }}
          >
            🔥 Flash Sale
          </motion.h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-poppins drop-shadow-md">
            Limited time offer! Get up to 50% off on selected items. Don't miss out on these amazing deals!
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 15px 40px rgba(167, 243, 208, 0.4)",
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-300 to-blue-300 text-white font-bold px-12 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-poppins animate-pulse-slow"
          >
            🛍️ Shop Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};