// app/faq/page.tsx
import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { BB, Bob, DEG, DEG_L, FAQ_D, FAQ_TEXT,faqCategories } from '@/constants/constants';

export default function FAQPage() {
  const Ablob = [
    {
       
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
       
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      )
    },
    {
     
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
      )
    },
    {
  
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      )
    },
    {
      
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12a3 3 0 106 0 3 3 0 00-6 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <NavBar />
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-500/10 px-6 py-2 rounded-full mb-4">
            <span className="text-emerald-400 font-semibold">Support Center</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            {FAQ_TEXT}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {FAQ_D}   </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqCategories.map((category, index) => (
            <Link 
              key={index} 
              href={category.link}
              className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 p-8 border border-gray-700 hover:border-emerald-500/50"
            >
              <div className="inline-flex items-center justify-center bg-emerald-500/10 p-3 rounded-lg text-emerald-400 mb-5 group-hover:bg-emerald-500/20 transition-colors duration-300">
                {Ablob[index].icon}
              </div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                {category.title}
              </h2>
              <p className="text-gray-300 mb-6">{category.description}</p>
              <div className="flex items-center text-emerald-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                View details
                <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5"></div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium mb-4">
              Need more help?
            </span>
            <h2 className="text-3xl font-bold mb-4 text-white">{Bob}</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        {BB}
            </p>
            <Link 
              href={`${DEG_L}`}
              className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
            >
         {DEG}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}