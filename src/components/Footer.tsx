"use client";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  // WhatsApp phone number - replace with actual number
  const whatsappNumber = "+971547176885"; 
  // const whatsappNumber = "+917488304696"; // Example India number format

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    // Pre-filled message for WhatsApp
    const message = encodeURIComponent("Hi TJR Logistics, I'm interested in your services. Can you please provide more information?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container py-12 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white tracking-tight">TJR</span>
                <span className="h-6 w-1 bg-green-600 rounded-full"></span>
                <span className="text-sm font-bold text-gray-300">Logistics</span>
              </div>
              <p className="text-gray-300 mb-6">
                End-to-end fulfillment & logistics for e-commerce stores in the GCC.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons */}
                <a href="https://instagram.com/tjrlogistics" className="text-green-400 hover:text-green-300 transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://facebook.com/tjrlogistics" className="text-green-400 hover:text-green-300 transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/tjrlogistics" className="text-green-400 hover:text-green-300 transition-colors" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-3">
                <li>
                  <Link href={"./fulfillment-delivery"} className="text-gray-300 hover:text-green-300 transition-colors">Fulfillment</Link>
                </li>
                <li>
                  <Link href="./cod-and-fullfilment" className="text-gray-300 hover:text-green-300 transition-colors">Local Delivery (COD)</Link>
                </li>
                <li>
                  <Link href={"./product-sourcing"} className="text-gray-300 hover:text-green-300 transition-colors">Product Sourcing</Link>
                </li>
                <li>
                  <Link href={"./storage-inventory"}  className="text-gray-300 hover:text-green-300 transition-colors">Storage</Link>
                </li>
               
                </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="./#about" className="text-gray-300 hover:text-green-300 transition-colors">About Us</Link></li>
                <li><Link href="./#testimonials" className="text-gray-300 hover:text-green-300 transition-colors">Testimonials</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-green-300 transition-colors">Careers</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-green-300 transition-colors">FAQs</Link></li>
               
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Stay updated with the latest trends in e-commerce and logistics.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg bg-gray-800 text-white border-t border-b border-l border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 flex-grow"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TJR Logistics. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/terms-conditions" className="text-gray-300 hover:text-green-300 transition-colors text-sm">Terms of Service</Link>
              <Link href="/privacy-policy" className="text-gray-300 hover:text-green-300 transition-colors text-sm">Privacy Policy</Link>
              <Link href="/shipping-returns" className="text-gray-300 hover:text-green-300 transition-colors text-sm">Shipping & Returns</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-800 shadow-lg cursor-pointer transition-all duration-300 z-50 flex items-center justify-center"
        onClick={handleWhatsAppClick}
      >
        <Image 
          src="whatssap.svg" 
          alt="WhatsApp"
          fill 
          className="object-contain p-2 rounded-full" 
        />
      </div>
    </>
  );
};

export default Footer;
