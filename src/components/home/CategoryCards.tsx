import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  path: string;
  color: string;
  textColor: string;
  description: string;
}

export const CategoryCards: React.FC = () => {
  const categories: Category[] = [
    {
      name: 'New Arrivals',
      path: '/new-arrivals',
      color: 'bg-gradient-to-br from-pink-300 to-orange-300',
      textColor: 'text-white',
      description: '✨ Latest fashion trends'
    },
    {
      name: 'Best Sellers',
      path: '/shop',
      color: 'bg-gradient-to-br from-green-300 to-blue-300',
      textColor: 'text-white',
      description: '⭐ Customer favorites'
    },
    {
      name: 'Sale',
      path: '/shop',
      color: 'bg-gradient-to-br from-red-300 to-pink-300',
      textColor: 'text-white',
      description: '🔥 Up to 50% off'
    },
    {
      name: 'Gift',
      path: '/shop',
      color: 'bg-gradient-to-br from-purple-300 to-pink-300',
      textColor: 'text-white',
      description: '🎁 Perfect gifts'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-cute-cloud-purple via-white to-cute-cloud-pink py-16 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-12 text-pink-300 text-2xl animate-float">🎀</div>
        <div className="absolute top-12 right-20 text-purple-300 text-xl animate-bounce-slow">🌸</div>
        <div className="absolute bottom-10 left-1/3 text-blue-300 text-lg animate-float-reverse">💫</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                rotateY: 10,
                boxShadow: "0 20px 40px rgba(251, 207, 232, 0.3)"
              }}
              className="group"
            >
              <Link to={category.path}>
                <div className={`${category.color} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center h-52 flex flex-col justify-center relative overflow-hidden border-2 border-white border-opacity-50`}>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 text-3xl opacity-80 animate-bounce-slow">
                    {category.name === 'Sale' && '🔥'}
                    {category.name === 'New Arrivals' && '✨'}
                    {category.name === 'Best Sellers' && '⭐'}
                    {category.name === 'Gift' && '🎁'}
                  </div>
                  
                  <motion.h3
                    whileHover={{ scale: 1.08 }}
                    className={`text-2xl md:text-3xl font-bold ${category.textColor} mb-3 font-baloo drop-shadow-md`}
                  >
                    {category.name}
                  </motion.h3>
                  <p className={`${category.textColor} opacity-90 text-sm font-poppins`}>
                    {category.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-4 right-4 ${category.textColor} text-xl font-bold`}
                  >
                    →
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};