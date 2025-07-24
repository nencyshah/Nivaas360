import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 'http://localhost:3000/api/contact'
    try {
      const res = await axios.post('/api/contact', formData);
      alert(res.data.message || 'Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        budget: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Mon-Sat 9AM-7PM',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@nivaas360.com', 'support@nivaas360.com'],
      description: '24/7 Support',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123 Business Center', 'Mumbai, Maharashtra 400001'],
      description: 'Visit us anytime',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Monday - Friday: 9AM - 7PM', 'Saturday: 10AM - 5PM'],
      description: 'Sunday: Closed',
    },
  ];

  const offices = [
    {
      city: 'Mumbai',
      address: '123 Business Center, Andheri East, Mumbai - 400001',
      phone: '+91 98765 43210',
      email: 'mumbai@nivaas360.com',
    },
    {
      city: 'Delhi',
      address: '456 Corporate Plaza, Connaught Place, New Delhi - 110001',
      phone: '+91 98765 43211',
      email: 'delhi@nivaas360.com',
    },
    {
      city: 'Bangalore',
      address: '789 Tech Park, Electronic City, Bangalore - 560100',
      phone: '+91 98765 43212',
      email: 'bangalore@nivaas360.com',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about a property or need assistance? We're here to help!
              Reach out to our expert team for personalized support.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl shadow-card p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Send us a Message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={(value) => handleSelectChange('subject', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="buying">Property Buying</SelectItem>
                          <SelectItem value="selling">Property Selling</SelectItem>
                          <SelectItem value="renting">Property Renting</SelectItem>
                          <SelectItem value="investment">Investment Advice</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (if applicable)</Label>
                      <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-25">Under ₹25 Lacs</SelectItem>
                          <SelectItem value="25-50">₹25 - ₹50 Lacs</SelectItem>
                          <SelectItem value="50-1cr">₹50 Lacs - ₹1 Cr</SelectItem>
                          <SelectItem value="1-2cr">₹1 - ₹2 Cr</SelectItem>
                          <SelectItem value="above-2cr">Above ₹2 Cr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your requirements..." rows={5} />
                    </div>

                    <Button className="w-full" size="lg" type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                          ))}
                          <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl shadow-card p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start"><Phone className="h-4 w-4 mr-2" />Schedule a Call</Button>
                    <Button variant="outline" className="w-full justify-start"><Mail className="h-4 w-4 mr-2" />Live Chat</Button>
                    <Button variant="outline" className="w-full justify-start"><MapPin className="h-4 w-4 mr-2" />Book Site Visit</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Office Locations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">Visit us at any of our offices across India for personalized assistance</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <div key={index} className="bg-card rounded-xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
                  <h3 className="text-lg font-bold text-foreground mb-4">{office.city} Office</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{office.address}</span></div>
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{office.phone}</span></div>
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{office.email}</span></div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">Get Directions</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">Find quick answers to common questions</p>
            <div className="max-w-3xl mx-auto space-y-4 text-left">
              {[
                {
                  question: 'What are your service charges?',
                  answer: 'Our service charges vary based on the type of service. Property browsing is free, and we charge a small commission only upon successful transactions.',
                },
                {
                  question: 'Do you verify all properties?',
                  answer: 'Yes, we have a dedicated verification team that checks all property documents and details before listing them on our platform.',
                },
                {
                  question: 'Can I schedule property visits?',
                  answer: 'Absolutely! You can schedule property visits through our platform or by contacting our team directly.',
                },
                {
                  question: 'Do you provide home loan assistance?',
                  answer: 'Yes, we partner with leading banks and financial institutions to help you secure the best home loan deals.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-card rounded-xl shadow-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
