// app/product-sourcing/page.tsx
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';

export default function ProductSourcingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-green-400">Product Sourcing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            How we find and procure quality products for your business
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Where do you source products from?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our main sourcing hub is China, but we also source from Turkey, Vietnam, India, the USA, and Europe, 
                  depending on the product and your needs. Our extensive network of reliable suppliers and manufacturers 
                  ensures competitive pricing and high-quality products. We continuously vet new sources to expand our 
                  capabilities and offer you the best possible options for your market.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Can I request a specific product or supplier?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Yes. You can request any product, and if you have a supplier, we&apos;ll handle communication, quality checks, 
                  and shipping. Our team has extensive experience working with various suppliers worldwide and can help 
                  you navigate procurement challenges. We also offer product research services if you&apos;re looking for trending 
                  items or alternatives to your current offerings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Can I get custom packaging or branding?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Absolutely. We offer private labeling, custom packaging, and branding for your products if needed. 
                  Our customization services include logo printing, custom box designs, inserts, thank you cards, and 
                  specialized packaging that reflects your brand identity. This helps create a cohesive and professional 
                  experience for your customers, enhancing brand recognition and loyalty.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-gray-800 rounded-xl text-center shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Looking for a specific product?</h3>
          <p className="text-gray-300 text-lg mb-6">Tell us what you need, and we&apos;ll help you source it.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
            Submit a Request
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}