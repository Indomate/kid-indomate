import React from 'react';
import { motion } from 'framer-motion';

export const NewCollectionBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-cute-cloud-pink via-white to-cute-cloud-purple py-16 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-10 text-pink-300 text-xl animate-float">🌟</div>
        <div className="absolute top-12 right-16 text-purple-300 text-lg animate-bounce-slow">💫</div>
        <div className="absolute bottom-10 left-1/4 text-yellow-300 text-2xl animate-float-reverse">✨</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cute-charcoal mb-4 font-baloo drop-shadow-sm">
            New collection launching soon!
          </h2>
          <p className="text-cute-charcoal opacity-80 text-lg mb-8 max-w-2xl mx-auto font-poppins leading-relaxed">
            A sustainable, eco-friendly and zero waste brand headquartered in the City of London, England. Can't wait wait to unwrap to focus on our dreams product, collection, or blog post?
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(251, 207, 232, 0.4)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-poppins"
          >
            🔔 Notify Me
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};