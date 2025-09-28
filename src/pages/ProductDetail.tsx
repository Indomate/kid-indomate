import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft, MessageCircle } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from '../components/shared/ProductCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/shared/Toast';

export const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      // Fetch main product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', productId)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Fetch related products (same category or tags)
      const { data: relatedData, error: relatedError } = await supabase
        .from('products')
        .select('*')
        .or(`category.eq.${productData.category},tags.cs.{${productData.tags.join(',')}}`)
        .neq('product_id', productId)
        .limit(4);

      if (relatedError) throw relatedError;
      setRelatedProducts(relatedData || []);

      // Check if product is in wishlist
      if (user) {
        const { data: wishlistData } = await supabase
          .from('wishlist')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .single();

        setIsLiked(!!wishlistData);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeClick = async () => {
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
          .eq('product_id', productId);
        setIsLiked(false);
      } else {
        await supabase
          .from('wishlist')
          .insert({
            user_id: user.id,
            product_id: productId!,
          });
        setIsLiked(true);
      }
      showToast(isLiked ? 'Removed from wishlist' : 'Added to wishlist', 'success');
    } catch (error) {
      console.error('Error updating wishlist:', error);
      showToast('Error updating wishlist', 'error');
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsAddingToCart(true);
    try {
      const { data: existingItem } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
      } else {
        await supabase
          .from('cart')
          .insert({
            user_id: user.id,
            product_id: productId!,
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
    const message = `Hey, I want to know about ${product?.name} - ${product?.category} - Rs. ${product?.price.toFixed(2)}`;
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-baloo text-cute-charcoal">Loading... ✨</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-baloo text-cute-charcoal">Product not found 😔</div>
      </div>
    );
  }

  return (
    <>
      <Toast {...toast} onClose={hideToast} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="bg-white text-cute-charcoal px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 font-poppins mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </motion.button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-pink-100">
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                
                {/* Tag on left top */}
                <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.tag}
                </span>

                {/* Like button on right top */}
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLikeClick}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isLiked 
                      ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white' 
                      : 'bg-white text-pink-400 hover:bg-pink-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-pink-100"
          >
            {/* Tags above title */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-200 to-purple-200 text-cute-charcoal px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-cute-charcoal mb-4 font-baloo">{product.name}</h1>
            
            <p className="text-cute-charcoal opacity-80 text-lg mb-6 font-poppins leading-relaxed">
              {product.description}
            </p>

            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-8">
              Rs. {product.price.toFixed(2)}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-gradient-to-r from-green-300 to-blue-300 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 font-poppins text-lg mb-4"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>{isAddingToCart ? 'Adding to Cart...' : '🛍️ Add to Cart'}</span>
            </motion.button>

            {/* WhatsApp Query Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppQuery}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 font-poppins text-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Any Query?</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-cute-charcoal mb-8 text-center font-baloo">
              You Might Also Like ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.product_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      </motion.div>
    </>
  );
};