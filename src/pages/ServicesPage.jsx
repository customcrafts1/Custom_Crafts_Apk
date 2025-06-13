import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, Palette, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingCalendar from '@/components/BookingCalendar';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const services = [
    {
      id: 1,
      icon: Car,
      title: 'Car & Bike Wrapping',
      description: 'Complete vehicle transformation with premium vinyl wraps in various colors and finishes.',
      imageAlt: 'Luxury sports car with a stunning matte purple wrap',
      imageDesc: 'Matte purple sports car wrap',
    },
    {
      id: 2,
      icon: Shield,
      title: 'Paint Protection Film (PPF)',
      description: 'Protect your vehicle\'s paint from scratches and chips with our self-healing, invisible film.',
      imageAlt: 'Technician applying clear paint protection film to the hood of a car',
      imageDesc: 'Applying PPF to a car',
    },
    {
      id: 3,
      icon: Palette,
      title: 'Custom Painting',
      description: 'High-quality custom paint jobs, from full color changes to detailed airbrushing.',
      imageAlt: 'Custom airbrushed flame design on a motorcycle tank',
      imageDesc: 'Custom airbrush paint job',
    },
    {
      id: 4,
      icon: Wrench,
      title: 'Interior Custom Work',
      description: 'Upgrade your vehicle\'s interior with custom upholstery, lighting, and more.',
      imageAlt: 'Luxury car interior with custom red leather seats and ambient lighting',
      imageDesc: 'Custom car interior',
    },
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">
            Vehicle <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your vehicle with our expert services. From stunning wraps to durable protection, we deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card border rounded-3xl overflow-hidden shadow-xl card-hover"
            >
              <div className="h-80 bg-secondary relative overflow-hidden">
                <img  class="w-full h-full object-cover" alt={service.imageAlt} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button
                  onClick={() => handleBookService(service)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book This Service
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showBooking && (
        <BookingCalendar
          service={selectedService}
          onClose={() => {
            setShowBooking(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};

export default ServicesPage;