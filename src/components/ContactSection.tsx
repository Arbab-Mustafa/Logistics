import { Phone, Mail, Instagram, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ADDRESS, BRCLINK, BUSCDEC, CNSTL, CONSULTATION, CONTACT, DBRC, EMAIL, GETCHS, GETCHS_DESC } from '@/constants/constants';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">{GETCHS}</h2>
          <div className="w-16 h-1 bg-green-800 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg">{GETCHS_DESC}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <div className="bg-gray-800 rounded-xl shadow-sm p-8 mb-8 border border-green-600">
              <h3 className="text-xl font-semibold mb-6 text-white">{CONTACT}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone/WhatsApp</p>
                    <a href="tel:+971547176885" className="text-gray-200 font-medium hover:text-green-300 transition-colors">
                      +971 54 717 6885
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a href="mailto:care@tjr.ae" className="text-gray-200 font-medium hover:text-green-300 transition-colors">
                     {EMAIL}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Instagram className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Instagram</p>
                    <a href="https://instagram.com/tjrdubai" target="_blank" rel="noopener noreferrer" className="text-gray-200 font-medium hover:text-green-300 transition-colors">
                      @tjrdubai
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Business Hours</p>
                    <p className="text-gray-200 font-medium">
                     {BUSCDEC}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Warehouse Location</p>
                    <p className="text-gray-200 font-medium">
                      {ADDRESS}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`${CNSTL}`}
                className="flex-1"
              >
                <Button className="!bg-green-600 border border-green-600 hover:bg-green-700 text-white w-full">
                 {CONSULTATION}
                </Button>
              </a>
              <a 
                href={`${BRCLINK}`}
                download="TJR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="border-green-600 border text-gray-200 hover:bg-gray-800 w-full">
                 {DBRC}
                </Button>
              </a>
            </div>
          </div>
          
          <div id='#contact' className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <form className="bg-gray-800 rounded-xl shadow-sm p-8 border border-green-600">
              <h3 className="text-xl font-semibold mb-6 text-white">Send us a message</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-200"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-200"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
