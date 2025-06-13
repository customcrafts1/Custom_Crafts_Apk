import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { currentUser, setAuthModalOpen } = useAuth();

  const handleCheckout = () => {
    if (!currentUser) {
      toast({ title: "Please login to checkout.", description: "You need to be logged in to place an order.", variant: "destructive" });
      setAuthModalOpen(true);
      return;
    }

    if (cartItems.length === 0) {
      toast({ title: "Your cart is empty.", variant: "destructive" });
      return;
    }

    const order = {
      id: Date.now(),
      customerName: currentUser.name,
      itemOrService: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
      deliveryAddress: `${currentUser.city}, ${currentUser.pincode}`,
      preferredDateTime: 'N/A - Product Order',
      price: getCartTotal().toFixed(2),
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
      items: cartItems,
    };

    const existingOrders = JSON.parse(localStorage.getItem('customCraftsOrderLog') || '[]');
    existingOrders.push(order);
    localStorage.setItem('customCraftsOrderLog', JSON.stringify(existingOrders));

    toast({ title: "Order Placed!", description: "Your order has been logged. We will contact you shortly." });
    clearCart();
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      toast({ title: "Your cart is empty.", variant: "destructive" });
      return;
    }

    let message = "Hi, I'd like to place an order:\n\n";
    cartItems.forEach(item => {
      message += `*${item.name}* (x${item.quantity})\n`;
      if (item.customization) {
        const details = Object.entries(item.customization)
          .filter(([, value]) => value)
          .map(([key, value]) => `  - ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
          .join('\n');
        if (details) message += `${details}\n`;
      }
      message += `  - Price: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    message += `*Total: ₹${getCartTotal().toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+910000000000?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatCustomization = (customization) => {
    if (!customization || Object.keys(customization).length === 0) return null;
    const details = Object.entries(customization)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(', ');
    return details;
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-orbitron font-bold text-foreground mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-muted-foreground mb-8">Looks like you haven't added any items yet.</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-4">Shopping <span className="gradient-text">Cart</span></h1>
          <p className="text-xl text-muted-foreground">Review your items and proceed to checkout.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-card border rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold text-card-foreground">Cart Items ({cartItems.length})</h2>
                <Button variant="outline" size="sm" onClick={clearCart} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">Clear Cart</Button>
              </div>
              <div className="divide-y divide-border">
                {cartItems.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="p-6 flex items-center space-x-4">
                    <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img  class="w-full h-full object-cover" alt={item.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground">{item.name}</h3>
                      {formatCustomization(item.customization) && <p className="text-sm text-muted-foreground mt-1">{formatCustomization(item.customization)}</p>}
                      <p className="text-lg font-bold text-primary mt-2">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-card border rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">₹{getCartTotal().toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-medium text-green-600">Free</span></div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-lg font-semibold text-card-foreground">Total</span><span className="text-lg font-bold text-primary">₹{getCartTotal().toFixed(2)}</span></div>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <CreditCard className="h-4 w-4 mr-2" /> Place Order
              </Button>
              <Button onClick={handleWhatsAppCheckout} className="w-full bg-green-500 hover:bg-green-600 text-white">Order on WhatsApp</Button>
              <Link to="/products"><Button variant="outline" className="w-full"><ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping</Button></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;