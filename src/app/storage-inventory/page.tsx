// app/storage-inventory/page.tsx
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { GETCHS } from '@/constants/constants';
import React from 'react';

export default function StorageInventoryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-green-400">Storage & Inventory</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            How we store, manage and track your inventory
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Can I store my own inventory with TJR?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Yes. You can send us your stock, and we&apos;ll store it in our warehouse. We then fulfill orders directly 
                  from your inventory. Our climate-controlled facilities ensure your products remain in optimal condition, 
                  while our advanced inventory management system provides real-time tracking and updates. This gives you 
                  complete visibility of your stock levels and movement at all times.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Is there a minimum quantity required for storage?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  No strict minimums — we work with clients of all sizes. Whether you have 50 items or 5,000, we&apos;ll find 
                  a solution that fits. Our flexible storage options accommodate businesses at every stage of growth, from 
                  startups to established enterprises. We scale our services to match your inventory volume, ensuring 
                  you only pay for the space and services you actually need.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-gray-800 rounded-xl text-center shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Need inventory management assistance?</h3>
          <p className="text-gray-300 text-lg mb-6">Contact us to learn how we can help streamline your inventory processes.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
           {GETCHS} 
            </button>
        </div>
        </div>
        <Footer />
        </div>
        
    );
    }