import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const portfolioData = {
  cars: [
    { alt: 'Matte black luxury sedan wrap', desc: 'Matte black sedan' },
    { alt: 'Glossy red sports car with custom decals', desc: 'Red sports car with decals' },
    { alt: 'Chrome gold exotic car wrap', desc: 'Exotic car in chrome gold wrap' },
    { alt: 'Custom graphic wrap on a hatchback', desc: 'Hatchback with custom graphics' },
    { alt: 'Sports car with full body paint protection film', desc: 'Sports car with PPF' },
    { alt: 'Classic muscle car with a candy apple red paint job', desc: 'Muscle car candy apple red paint' },
    { alt: 'Luxury SUV with a custom starlight headliner', desc: 'SUV with starlight headliner' },
    { alt: 'Performance car with carbon fiber hood and accents', desc: 'Car with carbon fiber accents' },
    { alt: 'Electric car with a futuristic vinyl wrap design', desc: 'Electric car futuristic wrap' },
  ],
  bikes: [
    { alt: 'Superbike with a vibrant blue and yellow wrap', desc: 'Blue and yellow superbike wrap' },
    { alt: 'Cruiser motorcycle with custom chrome parts and leather seat', desc: 'Custom cruiser motorcycle' },
    { alt: 'Dirt bike with aggressive custom graphics kit', desc: 'Dirt bike custom graphics' },
    { alt: 'Motorcycle gas tank with detailed airbrush portrait', desc: 'Motorcycle tank airbrush art' },
    { alt: 'Touring bike with satin black wrap and pinstriping', desc: 'Touring bike satin black wrap' },
    { alt: 'Sport bike with full paint protection film coverage', desc: 'Sport bike with PPF' },
  ],
  apparel: [
    { alt: 'Black t-shirt with a complex, colorful graphic print', desc: 'T-shirt with colorful graphic' },
    { alt: 'White hoodie with an embroidered company logo on the chest', desc: 'Hoodie with embroidered logo' },
    { alt: 'A collection of custom printed t-shirts for an event', desc: 'Custom event t-shirts' },
    { alt: 'Person wearing a personalized hoodie with custom text on the sleeve', desc: 'Person in personalized hoodie' },
    { alt: 'Close-up of high-quality screen printing on fabric', desc: 'Screen printing detail' },
    { alt: 'Polo shirt with a subtle custom logo', desc: 'Custom logo polo shirt' },
  ],
};

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('cars');

  const tabs = [
    { id: 'cars', label: 'Cars' },
    { id: 'bikes', label: 'Bikes' },
    { id: 'apparel', label: 'Apparel' },
  ];

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
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our gallery of custom creations. Witness the passion, precision, and artistry we bring to every project.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex border border-border rounded-lg p-1">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 justify-center transition-all duration-300"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioData[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-w-16 aspect-h-9 shadow-lg"
              >
                <img 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={item.alt}
                 src="https://images.unsplash.com/photo-1698463110187-690dc51722cb" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                   <Eye className="h-10 w-10 text-white transform group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;