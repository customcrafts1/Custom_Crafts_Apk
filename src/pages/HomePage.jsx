import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Palette, Car, Shirt, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const features = [
    { icon: Palette, title: 'Bespoke Designs', description: 'Unique designs tailored to your exact vision and style preferences.' },
    { icon: Shield, title: 'Premium Materials', description: 'We use only high-grade materials for durability and a flawless finish.' },
    { icon: Zap, title: 'Expert Craftsmanship', description: 'Our skilled team ensures professional installation and attention to detail.' }
  ];

  const services = [
    { icon: Car, title: 'Vehicle Services', description: 'Transform your ride with stunning custom wraps, PPF, painting, and interior work.', link: '/services' },
    { icon: Shirt, title: 'Custom Apparel', description: 'Personalized t-shirts and hoodies with your unique designs, logos, or text.', link: '/products' }
  ];
  
  const testimonials = [
    { name: 'Ravi Kumar', rating: 5, text: 'Incredible work on my bike wrap! The team at Custom Crafts in Narasaraopet is truly professional.' },
    { name: 'Priya Sharma', rating: 5, text: 'Custom Crafts made the perfect hoodies for my startup. The quality is top-notch!' },
    { name: 'Anil Reddy', rating: 5, text: 'The PPF service for my car was flawless. The attention to detail is amazing. Highly recommend!' }
  ];

  const portfolioPreview = [
    { alt: "Matte black custom car wrap", description: "Sleek matte black car wrap" },
    { alt: "Custom graphic design on a sports bike", description: "Vibrant custom motorcycle wrap" },
    { alt: "T-shirt with a detailed custom print", description: "High-quality custom printed t-shirt" },
    { alt: "Luxury car with custom interior lighting", description: "Custom car interior with ambient lighting" },
    { alt: "Car receiving a paint protection film application", description: "Applying paint protection film to a car" },
    { alt: "Motorcycle tank with custom airbrush art", description: "Detailed airbrush art on a motorcycle tank" }
  ];

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  class="w-full h-full object-cover" alt="Dynamic shot of a customized sports car in motion" src="https://images.unsplash.com/photo-1597332356827-a60ed8e19876" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white leading-tight">Your Vision<span className="block gradient-text">Crafted</span></h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">Narasaraopet's premier destination for custom apparel and vehicle transformations. We bring your ideas to life with unmatched quality.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 pulse-glow">Design Apparel <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link to="/services"><Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-4">Book Vehicle Service</Button></Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">Why Choose <span className="gradient-text">Custom Crafts</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We combine cutting-edge technology with artistic expertise to deliver exceptional results that exceed expectations.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} viewport={{ once: true }} className="text-center p-8 rounded-2xl bg-card border card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><feature.icon className="h-8 w-8 text-white" /></div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">Our <span className="gradient-text">Core Services</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From vehicle transformations to custom apparel, we bring your creative vision to life.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-card rounded-3xl overflow-hidden shadow-xl card-hover">
              <div className="h-80 bg-gradient-to-br from-purple-400 to-blue-500 relative overflow-hidden"><img  class="w-full h-full object-cover" alt="Professional vehicle wrap installation with vibrant custom graphics" src="https://images.unsplash.com/photo-1679327676489-beaab30aec2c" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div><div className="absolute bottom-4 left-4"><Car className="h-12 w-12 text-white" /></div></div>
              <div className="p-8"><h3 className="text-2xl font-bold text-card-foreground mb-4">Vehicle Services</h3><p className="text-muted-foreground mb-6">Transform your ride with stunning custom wraps, PPF, painting, and interior work.</p><Link to="/services"><Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Explore Vehicle Services <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-card rounded-3xl overflow-hidden shadow-xl card-hover">
              <div className="h-80 bg-gradient-to-br from-green-400 to-cyan-500 relative overflow-hidden"><img  class="w-full h-full object-cover" alt="Collection of custom printed t-shirts and hoodies" src="https://images.unsplash.com/photo-1503340588524-222d094c7066" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div><div className="absolute bottom-4 left-4"><Shirt className="h-12 w-12 text-white" /></div></div>
              <div className="p-8"><h3 className="text-2xl font-bold text-card-foreground mb-4">Custom Apparel</h3><p className="text-muted-foreground mb-6">Personalized t-shirts and hoodies with your unique designs, logos, or text.</p><Link to="/products"><Button className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700">Design Your Apparel <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">Our <span className="gradient-text">Latest Work</span></h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">A glimpse into the craftsmanship and creativity we bring to every project.</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioPreview.map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group relative rounded-2xl overflow-hidden aspect-w-1 aspect-h-1">
                        <img  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={item.alt} src="https://images.unsplash.com/photo-1695634504151-d72065870aa6" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><Eye className="h-10 w-10 text-white" /></div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/portfolio"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">What Our <span className="gradient-text">Customers Say</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Don't just take our word for it - hear from our satisfied customers.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} viewport={{ once: true }} className="bg-card border rounded-2xl p-8 card-hover">
                <div className="flex items-center mb-4">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />))}</div>
                <p className="text-card-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mr-4"><img  class="w-12 h-12 rounded-full object-cover" alt={`${testimonial.name} profile`} src="https://images.unsplash.com/photo-1611762342062-86e06a30eb41" /></div>
                  <div><p className="font-semibold text-card-foreground">{testimonial.name}</p><p className="text-muted-foreground text-sm">Verified Customer</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">Let's create something amazing together. Contact us to discuss your project and get a custom quote.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact"><Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4">Get Started Today <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;