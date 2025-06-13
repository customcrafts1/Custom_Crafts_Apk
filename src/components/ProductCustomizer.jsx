import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ProductCustomizer = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [customText, setCustomText] = useState('');
  const [customImage, setCustomImage] = useState(null);

  const handleAddToCart = () => {
    const customization = {
      color: selectedColor,
      size: selectedSize,
      customText,
      customImage: customImage ? customImage.name : null,
    };
    onAddToCart(product, customization);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomImage({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      toast({ title: "Image uploaded successfully!" });
    }
  };

  const handleWhatsAppOrder = () => {
    let message = `Hi, I'd like to order a ${product.name}.\n`;
    message += `Size: ${selectedSize}\n`;
    message += `Color: ${selectedColor}\n`;
    if (customText) {
      message += `Custom Text: "${customText}"\n`;
    }
    if (customImage) {
      message += `Custom Image: ${customImage.name}\n`;
    }
    message += `Price: ₹${product.price}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+910000000000?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-card text-card-foreground rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Customize {product.name}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row h-full">
            <div className="flex-1 p-6 bg-secondary">
              <div className="h-96 bg-background rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
                <img  class="w-full h-full object-contain" alt={`${product.name} preview in ${selectedColor}`} src="https://images.unsplash.com/photo-1615041359204-45a4dff5ec92" />
                {customImage && <img src={customImage.url} alt="Custom design preview" className="absolute w-1/3 h-1/3 object-contain" />}
                {customText && (
                  <div className="absolute bottom-10 text-2xl font-bold" style={{ color: selectedColor === 'Black' ? 'white' : 'black' }}>
                    {customText}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-96 p-6 border-l bg-card overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-border'}`} style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button key={size} variant={selectedSize === size ? 'default' : 'outline'} onClick={() => setSelectedSize(size)}>{size}</Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Custom Text</h3>
                  <input type="text" placeholder="Enter your text..." value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full p-3 bg-background border rounded-lg" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Upload Design</h3>
                  <label htmlFor="image-upload" className="w-full flex items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                    <Upload className="h-5 w-5 mr-2" />
                    <span>{customImage ? customImage.name : 'Choose an image'}</span>
                  </label>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  </div>
                  <div className="space-y-3">
                    <Button onClick={handleAddToCart} className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button onClick={handleWhatsAppOrder} className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Order on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductCustomizer;