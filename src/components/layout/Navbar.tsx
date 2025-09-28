import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, Search, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-lg relative z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.h1 
              className="text-2xl font-bold text-cute-charcoal font-baloo drop-shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              ✨ Pastel Dream
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium font-poppins transition-all duration-300 relative group ${
                    isActive(link.path)
                      ? 'text-cute-charcoal font-semibold'
                      : 'text-cute-charcoal hover:text-pink-600'
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <Search className="h-5 w-5 text-cute-charcoal cursor-pointer hover:text-pink-500 transition-colors duration-300" />
            </motion.div>
            
            {user ? (
              <>
                <Link to="/notifications">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Bell className="h-5 w-5 text-cute-charcoal cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                </Link>
                <Link to="/wishlist">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="h-5 w-5 text-cute-charcoal cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                </Link>
                <Link to="/cart">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <ShoppingBag className="h-5 w-5 text-cute-charcoal cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                </Link>
                <Link to="/profile">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                    <User className="h-5 w-5 text-cute-charcoal cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-300 to-purple-300 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 font-poppins"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50 focus:outline-none transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white bg-opacity-95 backdrop-blur-sm border-t border-pink-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium font-poppins transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-cute-baby-pink text-cute-charcoal font-semibold'
                      : 'text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium font-poppins text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50">
                    Profile
                  </Link>
                  <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium font-poppins text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50">
                    Wishlist
                  </Link>
                  <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium font-poppins text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50">
                    Cart
                  </Link>
                  <Link to="/notifications" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium font-poppins text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50">
                    Notifications
                  </Link>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium font-poppins text-cute-charcoal hover:bg-cute-baby-pink hover:bg-opacity-50">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};