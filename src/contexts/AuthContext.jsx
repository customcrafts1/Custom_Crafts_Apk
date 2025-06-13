import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('customCraftsCurrentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const registerUser = (userData) => {
    const registrationData = {
      ...userData,
      registeredAt: new Date().toISOString(),
    };

    const existingUsers = JSON.parse(localStorage.getItem('customCraftsUserLog') || '[]');
    existingUsers.push(registrationData);
    localStorage.setItem('customCraftsUserLog', JSON.stringify(existingUsers));
    
    localStorage.setItem('customCraftsCurrentUser', JSON.stringify(registrationData));
    setCurrentUser(registrationData);

    toast({
      title: "Registration Successful!",
      description: `Welcome, ${userData.name}!`,
    });
    setAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('customCraftsCurrentUser');
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    currentUser,
    registerUser,
    logout,
    isAuthModalOpen,
    setAuthModalOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};