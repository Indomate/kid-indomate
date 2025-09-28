import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../shared/ProductCard';
import { Product } from '../../types/product';
import { supabase } from '../../lib/supabase';

export const BestSellersSection: React.FC = () => {
  const [bestSellers, setBestSellers] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'best-sellers')
        .limit(4);

      if (error) throw error;
      setBestSellers(data || []);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-cute-cloud-blue via-white to-cute-cloud-mint py-16 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-16 text-blue-300 text-2xl animate-float">⭐</div>
        <div className="absolute top-20 right-20 text-green-300 text-xl animate-bounce-slow">💎</div>
        <div className="absolute bottom-16 left-1/3 text-purple-300 text-lg animate-float-reverse">🌟</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-cute-charcoal mb-4 font-baloo drop-shadow-sm">
            Bestsellers
          </h2>
          <p className="text-cute-charcoal opacity-80 text-lg font-poppins">
            Shop our most fashionable pieces that our guests adore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};