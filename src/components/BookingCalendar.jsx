import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const BookingCalendar = ({ service, onClose }) => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.mobile || '',
    vehicleInfo: '',
    notes: '',
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Available Mon-Sat
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();
  const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
      toast({ title: "Image uploaded!", description: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast({ title: "Please select a date and time.", variant: "destructive" });
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    const booking = {
      id: Date.now(),
      customerName: formData.name,
      itemOrService: service?.title || 'General Consultation',
      deliveryAddress: 'N/A - Service',
      preferredDateTime: `${selectedDate} at ${selectedTime}`,
      price: 'Quote Pending',
      paymentStatus: 'Pending',
      vehicleInfo: formData.vehicleInfo,
      notes: formData.notes,
      uploadedImage: uploadedImage ? uploadedImage.name : 'No image',
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem('customCraftsOrderLog') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('customCraftsOrderLog', JSON.stringify(existingBookings));

    let message = `New Service Booking:\n`;
    message += `Service: ${booking.itemOrService}\n`;
    message += `Date & Time: ${booking.preferredDateTime}\n`;
    message += `Name: ${booking.customerName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone}\n`;
    if (formData.vehicleInfo) message += `Vehicle: ${formData.vehicleInfo}\n`;
    if (uploadedImage) message += `Image Uploaded: ${uploadedImage.name}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+910000000000?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    toast({ title: "Booking request sent!", description: "We've received your request and opened WhatsApp to confirm." });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-card text-card-foreground rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b bg-primary/90 text-primary-foreground">
            <div>
              <h2 className="text-2xl font-bold">Book Your Service</h2>
              {service && <p>{service.title}</p>}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary-foreground/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
            <div className="flex-1 p-6 border-r overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 flex items-center"><Calendar className="h-5 w-5 mr-2 text-primary" />Select Date & Time</h3>
              <div className="mb-6">
                <h4 className="font-medium text-muted-foreground mb-3">Available Dates</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {availableDates.map((date) => (
                    <button type="button" key={date} onClick={() => setSelectedDate(date)} className={`p-3 text-sm rounded-lg border-2 transition-all ${selectedDate === date ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'}`}>
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </button>
                  ))}
                </div>
              </div>
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="font-medium text-muted-foreground mb-3 flex items-center"><Clock className="h-4 w-4 mr-2" />Available Times</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <button type="button" key={time} onClick={() => setSelectedTime(time)} className={`p-2 text-sm rounded-lg border-2 transition-all ${selectedTime === time ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'}`}>{time}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-96 p-6 bg-secondary overflow-y-auto space-y-4">
              <h3 className="text-lg font-semibold flex items-center"><User className="h-5 w-5 mr-2 text-primary" />Your Information</h3>
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" required className="w-full p-3 bg-background border rounded-lg" />
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email *" required className="w-full p-3 bg-background border rounded-lg" />
              <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Phone *" required className="w-full p-3 bg-background border rounded-lg" />
              <input name="vehicleInfo" value={formData.vehicleInfo} onChange={handleInputChange} placeholder="Vehicle (Year, Make, Model)" className="w-full p-3 bg-background border rounded-lg" />
              <label htmlFor="vehicle-image-upload" className="w-full flex items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-background">
                <Upload className="h-5 w-5 mr-2" />
                <span>{uploadedImage ? uploadedImage.name : 'Upload Vehicle Photo'}</span>
              </label>
              <input id="vehicle-image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} placeholder="Additional Notes..." className="w-full p-3 bg-background border rounded-lg" />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">Confirm & Open WhatsApp</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingCalendar;