import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { toast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userLog, setUserLog] = useState([]);
  const [orderLog, setOrderLog] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      const users = JSON.parse(localStorage.getItem('customCraftsUserLog') || '[]');
      const orders = JSON.parse(localStorage.getItem('customCraftsOrderLog') || '[]');
      setUserLog(users);
      setOrderLog(orders);
    }
  }, [currentUser, navigate]);

  const downloadCSV = (data, filename) => {
    if (data.length === 0) {
      toast({ title: "No data to export.", variant: "destructive" });
      return;
    }
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download started!", description: `${filename} is being downloaded.` });
  };

  const clearLog = (logType) => {
    if (window.confirm(`Are you sure you want to clear the ${logType} log? This action cannot be undone.`)) {
      if (logType === 'user') {
        localStorage.removeItem('customCraftsUserLog');
        setUserLog([]);
      } else {
        localStorage.removeItem('customCraftsOrderLog');
        setOrderLog([]);
      }
      toast({ title: `${logType.charAt(0).toUpperCase() + logType.slice(1)} log cleared.` });
    }
  };

  if (!currentUser) {
    return null;
  }

  const renderUserLog = () => (
    <div className="space-y-4">
      {userLog.map(user => (
        <div key={user.email} className="bg-card border p-4 rounded-lg">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Location:</strong> {user.city}, {user.pincode}, {user.country}</p>
          <p className="text-sm text-muted-foreground">Registered: {new Date(user.registeredAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );

  const renderOrderLog = () => (
    <div className="space-y-4">
      {orderLog.map(order => (
        <div key={order.id} className="bg-card border p-4 rounded-lg">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Order/Service:</strong> {order.itemOrService}</p>
          <p><strong>Price:</strong> ₹{order.price}</p>
          <p><strong>Status:</strong> {order.paymentStatus}</p>
          <p className="text-sm text-muted-foreground">Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">Admin <span className="gradient-text">Dashboard</span></h1>
          <p className="text-xl text-muted-foreground">Welcome, {currentUser.name}. Manage your user and order logs here.</p>
        </motion.div>

        <div className="bg-card border rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex border border-border rounded-lg p-1">
              <Button variant={activeTab === 'orders' ? 'default' : 'ghost'} onClick={() => setActiveTab('orders')} className="flex-1 justify-center">
                <ShoppingBag className="h-4 w-4 mr-2" /> Orders ({orderLog.length})
              </Button>
              <Button variant={activeTab === 'users' ? 'default' : 'ghost'} onClick={() => setActiveTab('users')} className="flex-1 justify-center">
                <Users className="h-4 w-4 mr-2" /> Users ({userLog.length})
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => downloadCSV(activeTab === 'orders' ? orderLog : userLog, `${activeTab}_log.csv`)}>
                <Download className="h-4 w-4 mr-2" /> Download .CSV
              </Button>
              <Button variant="destructive" onClick={() => clearLog(activeTab === 'orders' ? 'order' : 'user')}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear Log
              </Button>
            </div>
          </div>

          <div className="bg-secondary p-4 rounded-lg min-h-[400px] max-h-[60vh] overflow-y-auto">
            {activeTab === 'orders' ? (orderLog.length > 0 ? renderOrderLog() : <p className="text-center text-muted-foreground p-8">No orders yet.</p>) : null}
            {activeTab === 'users' ? (userLog.length > 0 ? renderUserLog() : <p className="text-center text-muted-foreground p-8">No registered users yet.</p>) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;