// app/general/page.tsx
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';

export default function GeneralPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 text-green-400">General</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Essential information about TJR&apos;s services and operations
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">What does TJR do exactly?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  TJR is an all-in-one fulfillment company for e-commerce and resellers. We handle product sourcing, 
                  inventory storage, order fulfillment, shipping, cash collection, and payouts. Our comprehensive 
                  service eliminates the complexity of managing multiple vendors and logistics providers, allowing 
                  you to focus on growing your business.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Who can use TJR&apos;s services?</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our services are perfect for dropshippers, store owners, influencers, and businesses selling in the GCC.
                  Whether you&apos;re selling 10 orders a week or 1,000 a day — we can support you. Our scalable solutions 
                  are designed to grow with your business, providing the same level of reliability and efficiency 
                  regardless of your volume or business model.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-gray-800 rounded-xl text-center shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Ready to get started?</h3>
          <p className="text-gray-300 text-lg mb-6">Let us help you streamline your fulfillment process today.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
            Request a Demo
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}