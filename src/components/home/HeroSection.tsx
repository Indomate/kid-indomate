import React from 'react';
import { motion } from 'framer-motion';
import { CloudSVG } from '../decorative/CloudSVG';
import { ButterflyLoader } from '../decorative/ButterflyLoader';
import { FlowerSVG } from '../decorative/FlowerSVG';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Decorative Elements */}
      <CloudSVG className="top-10 left-10 animate-float" color="#FBCFE8" size="lg" />
      <CloudSVG className="top-20 right-20 animate-float-reverse" color="#E9D5FF" size="lg" />
      <CloudSVG className="bottom-32 right-1/4 animate-float-slow" color="#DBEAFE" size="md" />
      <CloudSVG className="top-1/3 left-1/3 animate-float" color="#FCE7F3" size="sm" />
      
      <ButterflyLoader className="top-32 left-1/4 w-16 h-12 animate-float" color="#A7F3D0" />
      <ButterflyLoader className="top-16 right-1/3 w-20 h-16 animate-float-reverse" color="#FBCFE8" />
      <ButterflyLoader className="bottom-40 left-1/2 w-14 h-10 animate-float-slow" color="#FEF9C3" />
      
      <FlowerSVG className="bottom-20 left-16 animate-float-reverse" color="#A7F3D0" size="md" />
      <FlowerSVG className="top-1/2 right-10 animate-float" color="#FEF9C3" size="lg" />
      <FlowerSVG className="top-24 left-1/2 animate-float-slow" color="#FBCFE8" size="sm" />
      <FlowerSVG className="bottom-16 right-1/3 animate-float-reverse" color="#E9D5FF" size="md" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-pink-200 to-purple-200 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg"
            >
              <span className="text-cute-charcoal font-medium font-poppins">✨ New Collection Available</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                bounce: 0.4
              }}
              className="text-6xl md:text-8xl font-extrabold text-white mb-6 font-baloo leading-tight drop-shadow-lg"
              style={{
                textShadow: '4px 4px 8px rgba(251, 207, 232, 0.6), 2px 2px 4px rgba(233, 213, 255, 0.4)'
              }}
            >
              Best
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Sellers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-white mb-8 max-w-md mx-auto lg:mx-0 font-poppins drop-shadow-md"
            >
              Discover our most loved pieces that make dreams come true ✨
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(251, 207, 232, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-300 to-yellow-200 text-cute-charcoal font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-poppins animate-pulse-slow"
            >
              🛍️ Shop Now
            </motion.button>
          </motion.div>

          {/* Right Content - Polaroid Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* First Polaroid */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, y: 50 }}
              animate={{ opacity: 1, rotate: -8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ rotate: -3, scale: 1.08, y: -5 }}
              className="absolute top-0 left-10 bg-white p-4 rounded-2xl shadow-2xl transform -rotate-8 hover:shadow-pink-200 transition-all duration-300 border-2 border-pink-100"
            >
              <img 
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Fashion 1" 
                className="w-48 h-56 object-cover rounded-xl"
              />
              <p className="text-center mt-2 font-baloo text-cute-charcoal font-medium">✨ New Style fits</p>
            </motion.div>

            {/* Second Polaroid */}
            <motion.div
              initial={{ opacity: 0, rotate: 10, y: 50 }}
              animate={{ opacity: 1, rotate: 12, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ rotate: 8, scale: 1.08, y: -5 }}
              className="absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-2xl transform rotate-12 hover:shadow-purple-200 transition-all duration-300 border-2 border-purple-100"
            >
              <img 
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Fashion 2" 
                className="w-48 h-56 object-cover rounded-xl"
              />
              <p className="text-center mt-2 font-baloo text-cute-charcoal font-medium">🌸 Summer Vibes</p>
            </motion.div>

            {/* Decorative elements on polaroids */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 right-8 text-3xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-4 text-2xl"
            >
              🌸
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};