import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-cute-charcoal relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-10 text-pink-300 text-2xl animate-bounce-slow">💖</div>
        <div className="absolute top-8 right-20 text-purple-300 text-xl animate-float">☁️</div>
        <div className="absolute bottom-10 left-1/4 text-blue-300 text-lg animate-float-reverse">⭐</div>
        <div className="absolute top-6 left-1/3 text-yellow-300 text-sm animate-pulse-slow">✨</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold font-baloo mb-4 text-cute-charcoal">✨ Pastel Dream</h3>
            <p className="text-cute-charcoal opacity-80 mb-6 max-w-md font-poppins">
              Discover the softest, dreamiest fashion pieces that make you feel confident and beautiful. 
              Our pastel collection brings out your inner glow.
            </p>
            <div className="flex space-x-4">
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }} 
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-pink-300 to-purple-300 p-2 rounded-full shadow-lg"
              >
                <Instagram className="h-5 w-5 text-white cursor-pointer" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -10 }} 
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-blue-300 to-purple-300 p-2 rounded-full shadow-lg"
              >
                <Facebook className="h-5 w-5 text-white cursor-pointer" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }} 
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-blue-300 to-green-300 p-2 rounded-full shadow-lg"
              >
                <Twitter className="h-5 w-5 text-white cursor-pointer" />
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-baloo text-cute-charcoal">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">Shop</Link></li>
              <li><Link to="/new-arrivals" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">New Arrivals</Link></li>
              <li><Link to="/about" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">About Us</Link></li>
              <li><Link to="/contact" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-baloo text-cute-charcoal">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">Size Guide</a></li>
              <li><a href="#" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">Returns</a></li>
              <li><a href="#" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">Shipping Info</a></li>
              <li><a href="#" className="text-cute-charcoal opacity-80 hover:text-pink-500 hover:opacity-100 transition-all duration-300 font-poppins">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-cute-charcoal opacity-80 flex items-center justify-center font-poppins">
            © {currentYear} Pastel Dream. Made with <Heart className="h-4 w-4 mx-1 text-pink-400 animate-pulse" fill="currentColor" /> for dreamers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};