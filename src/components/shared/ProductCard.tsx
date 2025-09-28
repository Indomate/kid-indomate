import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Toast } from './Toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleCardClick = () => {
    navigate(`/shop/${product.product_id}`);
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product.product_id);
        setIsLiked(false);
      } else {
        await supabase
          .from('wishlist')
          .insert({
            user_id: user.id,
            product_id: product.product_id,
          });
        setIsLiked(true);
      }
      showToast(isLiked ? 'Removed from wishlist' : 'Added to wishlist', 'success');
    } catch (error) {
      console.error('Error updating wishlist:', error);
      showToast('Error updating wishlist', 'error');
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsAddingToCart(true);
    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.product_id)
        .single();

      if (existingItem) {
        // Update quantity
        await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
      } else {
        // Add new item
        await supabase
          .from('cart')
          .insert({
            user_id: user.id,
            product_id: product.product_id,
            quantity: 1,
          });
      }
      showToast('Added to cart successfully!', 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('Error adding to cart', 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWhatsAppQuery = () => {
    const message = `Hey, I want to know about ${product.name} - ${product.category} - Rs. ${product.price.toFixed(2)}`;
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <>
      <Toast {...toast} onClose={hideToast} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -8, 
          rotate: 2,
          boxShadow: "0 25px 50px rgba(251, 207, 232, 0.3)" 
        }}
        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 hover:border-pink-200 cursor-pointer ${className}`}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
          />
          
          {/* Tag on left top */}
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {product.tag}
          </span>

          {/* Like button on right top */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLikeClick}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
              isLiked 
                ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white' 
                : 'bg-white text-pink-400 hover:bg-pink-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        <div className="p-6">
          {/* Tags above title */}
          <div className="flex flex-wrap gap-2 mb-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-200 to-purple-200 text-cute-charcoal px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-cute-charcoal mb-2 font-baloo">{product.name}</h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Rs. {product.price.toFixed(2)}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-gradient-to-r from-green-300 to-blue-300 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 font-poppins"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
            </motion.button>
          </div>

          {/* WhatsApp Query Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppQuery}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-poppins"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Any Query?</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};