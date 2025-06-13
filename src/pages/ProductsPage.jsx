import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import ProductCustomizer from '@/components/ProductCustomizer';

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Custom T-Shirt',
      price: 499,
      imageAlt: 'Black custom t-shirt with a vibrant, detailed graphic print',
      imageDesc: 'Custom printed black t-shirt',
      description: 'Premium cotton t-shirt. Upload your design or create one with us.',
      colors: ['Black', 'White', 'Navy', 'Red', 'Purple', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 2,
      name: 'Custom Hoodie',
      price: 999,
      imageAlt: 'Gray custom hoodie with a bold logo on the chest',
      imageDesc: 'Custom printed gray hoodie',
      description: 'Cozy fleece hoodie. Perfect for personal use or for your brand.',
      colors: ['Black', 'Gray', 'Navy', 'Burgundy', 'Forest Green'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ];

  const handleCustomize = (product) => {
    setSelectedProduct(product);
  };

  const handleWishlist = (product) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">
            Custom <span className="gradient-text">Apparel</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Design your own t-shirts and hoodies. High-quality materials and printing for a look that's uniquely yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border rounded-2xl overflow-hidden shadow-lg card-hover group"
            >
              <div className="relative h-96 bg-secondary overflow-hidden">
                <img  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={product.imageAlt} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleCustomize(product)}
                    className="bg-white/90 hover:bg-white text-black"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleWishlist(product)}
                    className="bg-white/90 hover:bg-white text-black"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCustomize(product)}
                      className="text-sm"
                    >
                      Customize
                    </Button>
                    <Button
                      onClick={() => handleCustomize(product)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductCustomizer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, customization) => {
            addToCart(product, customization);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;