import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Custom Apparel', path: '/products' },
        { name: 'Vehicle Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      title: 'Our Services',
      links: [
        { name: 'Custom T-Shirts & Hoodies', path: '/products' },
        { name: 'Car & Bike Wrapping', path: '/services' },
        { name: 'Paint Protection Film (PPF)', path: '/services' },
        { name: 'Vehicle Painting', path: '/services' },
        { name: 'Interior Custom Work', path: '/services' },
      ]
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const founders = [
    'Shaik Javeed Ahamad (Lead Founder & CEO)',
    'Sagireddy Rajashekar Reddy (Co-Founder)',
    'Popuri Satyavaraprasad (Co-Founder)',
  ];

  return (
    <footer className="bg-card-foreground text-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-orbitron">CC</span>
              </div>
              <span className="font-orbitron font-bold text-2xl gradient-text">
                Custom Crafts
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your vision, our craftsmanship. Premium customization services in Narasaraopet, Andhra Pradesh.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Narasaraopet, Andhra Pradesh - 522601, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">infocustomcrafts@gmail.com</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <span className="font-semibold text-lg mb-4 block text-foreground">
                {section.title}
              </span>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <span className="font-semibold text-lg mb-4 block text-foreground">
            Our Team
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-muted-foreground text-sm">
            {founders.map(founder => <p key={founder}>{founder}</p>)}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Custom Crafts. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-secondary hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200 text-secondary-foreground hover:text-primary-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;