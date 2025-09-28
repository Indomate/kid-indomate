import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Package, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Profile as ProfileType, Address, Order } from '../types/product';

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (profileData) setProfile(profileData);

      // Fetch addresses
      const { data: addressData } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user!.id);

      if (addressData) setAddresses(addressData);

      // Fetch orders
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (orderData) setOrders(orderData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-baloo text-cute-charcoal">Loading... ✨</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-200 to-purple-200 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-16 text-white text-2xl animate-float opacity-60">👤</div>
          <div className="absolute top-12 right-20 text-white text-xl animate-bounce-slow opacity-60">💖</div>
          <div className="absolute bottom-8 left-1/3 text-white text-lg animate-float-reverse opacity-60">✨</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-5xl md:text-7xl font-bold font-baloo mb-4 drop-shadow-lg"
          >
            My Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-poppins drop-shadow-md"
          >
            💕 Manage your dreamy account
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-cute-charcoal font-baloo">{profile?.name || user?.email}</h3>
                <p className="text-cute-charcoal opacity-70 text-sm font-poppins">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile Info', icon: User },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'orders', label: 'Order History', icon: Package },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-poppins ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-pink-200 to-purple-200 text-cute-charcoal font-medium'
                        : 'text-cute-charcoal hover:bg-pink-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-poppins"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-pink-100">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-cute-charcoal mb-6 font-baloo">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">Name</label>
                      <input
                        type="text"
                        value={profile?.name || ''}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 font-poppins"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">Age</label>
                      <input
                        type="number"
                        value={profile?.age || ''}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 font-poppins"
                        placeholder="Your age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">Gender</label>
                      <select className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300 font-poppins">
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cute-charcoal mb-2 font-poppins">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50 font-poppins"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-poppins"
                  >
                    💾 Save Changes
                  </motion.button>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-bold text-cute-charcoal mb-6 font-baloo">My Addresses</h2>
                  {addresses.length === 0 ? (
                    <p className="text-cute-charcoal opacity-70 text-center py-8 font-poppins">No addresses added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border-2 border-pink-100 rounded-2xl p-4">
                          <p className="font-medium text-cute-charcoal font-poppins">{address.address_line_1}</p>
                          <p className="text-cute-charcoal opacity-70 font-poppins">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-cute-charcoal mb-6 font-baloo">Order History</h2>
                  {orders.length === 0 ? (
                    <p className="text-cute-charcoal opacity-70 text-center py-8 font-poppins">No orders yet</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border-2 border-pink-100 rounded-2xl p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-cute-charcoal font-poppins">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-cute-charcoal opacity-70 text-sm font-poppins">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-cute-charcoal font-poppins">Rs. {order.total_amount}</p>
                              <span className="bg-gradient-to-r from-green-200 to-blue-200 text-cute-charcoal px-3 py-1 rounded-full text-sm font-medium">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};