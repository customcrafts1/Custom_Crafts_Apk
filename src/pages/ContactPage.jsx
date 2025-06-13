import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Studio',
      details: ['Narasaraopet, Andhra Pradesh', 'PIN: 522601, India'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['infocustomcrafts@gmail.com', 'We reply within 24 hours'],
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    const contactSubmission = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('customCraftsContacts') || '[]');
    existingSubmissions.push(contactSubmission);
    localStorage.setItem('customCraftsContacts', JSON.stringify(existingSubmissions));

    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/+910000000000', '_blank');
  };

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-foreground mb-6">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Have a question or a project in mind? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-2">
            <div className="bg-card border rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" required className="w-full p-3 bg-background border rounded-lg" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address *" required className="w-full p-3 bg-background border rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full p-3 bg-background border rounded-lg" />
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" className="w-full p-3 bg-background border rounded-lg" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} placeholder="Your Message *" required className="w-full p-3 bg-background border rounded-lg" />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3">
                  <Send className="h-5 w-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-8">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-card border rounded-2xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => <p key={idx} className="text-muted-foreground">{detail}</p>)}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Need a quick answer?</h3>
              <Button onClick={handleWhatsAppChat} variant="outline" className="w-full justify-center bg-green-500 hover:bg-green-600 text-white border-green-500">
                <MessageSquare className="h-4 w-4 mr-2" /> Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-16">
          <div className="bg-card border rounded-3xl shadow-xl overflow-hidden h-96">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=80.175,16.24,80.185,16.25&layer=mapnik&marker=16.245,80.18"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Custom Crafts Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;