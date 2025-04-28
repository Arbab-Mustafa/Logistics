// app/fulfillment-delivery/page.tsx
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';

export default function FulfillmentDeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-green-400">Fulfillment & Delivery</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            How we manage your order processing, shipping, and delivery
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">How fast do you ship orders?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We fulfill and ship most orders within 24 hours from our warehouse in the UAE. Our efficient 
                  processing system ensures your products get packed and labeled quickly. Delivery times vary by 
                  location, but local orders are usually delivered within 1–2 days, while other GCC countries 
                  typically receive shipments within 2-5 business days.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Do you offer Cash on Delivery (COD)?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Yes. COD is available across the GCC. We collect payment from your customer at the time of delivery, 
                  and you receive the money after successful delivery. This payment option is highly popular in the 
                  region and can significantly increase your conversion rates by building trust with customers who 
                  prefer to pay upon receiving their items.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">What happens if an order fails or gets returned?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  If a delivery fails, you don&apos;t pay for the delivery. We also handle the follow-up and store the returned 
                  item in your inventory. Our system automatically updates inventory counts and order statuses, so you 
                  always have real-time visibility into your products. We can also arrange for redelivery attempts when 
                  appropriate, increasing your chances of successful fulfillment.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-gray-800 rounded-xl text-center shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Need custom delivery options?</h3>
          <p className="text-gray-300 text-lg mb-6">Contact us to discuss specialized delivery requirements for your business.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
            Contact Us
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}