import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-200 to-green-200 text-white py-16 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-16 text-white text-2xl animate-float opacity-60">💌</div>
          <div className="absolute top-12 right-20 text-white text-xl animate-bounce-slow opacity-60">📞</div>
          <div className="absolute bottom-8 left-1/3 text-white text-lg animate-float-reverse opacity-60">✨</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-5xl md:text-7xl font-bold font-baloo mb-4 drop-shadow-lg"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-poppins drop-shadow-md"
          >
            💕 We'd love to hear from you
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-cute-charcoal mb-8 font-baloo">Get in Touch</h2>
            <p className="text-cute-charcoal opacity-80 text-lg mb-8 font-poppins">
              Have a question about our products or need styling advice? 
              We're here to help you find your perfect pastel dream.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-gradient-to-r from-blue-300 to-purple-300 text-white p-3 rounded-full shadow-lg"
                >
                  <Mail className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-cute-charcoal font-baloo">Email</h3>
                  <p className="text-cute-charcoal opacity-80 font-poppins">hello@pasteldream.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="bg-gradient-to-r from-pink-300 to-purple-300 text-white p-3 rounded-full shadow-lg"
                >
                  <Phone className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-cute-charcoal font-baloo">Phone</h3>
                  <p className="text-cute-charcoal opacity-80 font-poppins">+44 20 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-gradient-to-r from-purple-300 to-pink-300 text-white p-3 rounded-full shadow-lg"
                >
                  <MapPin className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-cute-charcoal font-baloo">Address</h3>
                  <p className="text-cute-charcoal opacity-80 font-poppins">123 Fashion Street<br />London, England EC1A 1AA</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="font-semibold text-cute-charcoal mb-4 font-baloo">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="bg-gradient-to-r from-pink-300 to-purple-300 text-white p-3 rounded-full cursor-pointer shadow-lg"
                >
                  <span className="text-sm font-bold px-1">IG</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="bg-gradient-to-r from-blue-300 to-purple-300 text-white p-3 rounded-full cursor-pointer shadow-lg"
                >
                  <span className="text-sm font-bold px-1">FB</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="bg-gradient-to-r from-purple-300 to-pink-300 text-white p-3 rounded-full cursor-pointer shadow-lg"
                >
                  <span className="text-sm font-bold px-1">TW</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-pink-100"
          >
            <h2 className="text-2xl font-bold text-cute-charcoal mb-6 font-baloo">💌 Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 font-poppins"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 font-poppins"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 resize-none font-poppins"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 15px 35px rgba(251, 207, 232, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-poppins"
              >
                <Send className="h-5 w-5" />
                <span>💌 Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};