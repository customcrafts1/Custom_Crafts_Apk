import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, setAuthModalOpen, registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    country: 'India',
    city: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setAuthModalOpen(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-card text-card-foreground rounded-2xl shadow-2xl max-w-md w-full"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold flex items-center">
              <UserPlus className="mr-3" /> Register
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setAuthModalOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required className="w-full p-3 bg-background border rounded-lg" />
            <input name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" required className="w-full p-3 bg-background border rounded-lg" />
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required className="w-full p-3 bg-background border rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required className="w-full p-3 bg-background border rounded-lg" />
              <input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="PIN Code" required className="w-full p-3 bg-background border rounded-lg" />
            </div>
            <input name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" required className="w-full p-3 bg-background border rounded-lg" />
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Create Account
            </Button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;