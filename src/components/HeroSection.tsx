"use client";
import { Package, ArrowRight, TruckIcon, MapPinIcon, BoxIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
 
import Link from 'next/link';
import { BUTTON_TEXT, BUTTON_TEXT2, IMG_URL, TJR_HEADLINE_1, TJR_HEADLINE_2, TJR_SUBHEADLINE } from '@/constants/constants';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container px-4 mx-auto max-w-7xl flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-green-400 mb-4 text-sm font-medium transition-all duration-300 hover:bg-green-700 cursor-pointer transform hover:scale-105">
            <Package size={16} className="animate-pulse" /> 
            <span className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              Trusted by 200+ E-commerce Brands
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-4 tracking-tight">
            <span className={`block ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 delay-100`}>
            {TJR_HEADLINE_1}
            </span>
            <span className={`block ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 delay-200`}>
           {TJR_HEADLINE_2}
            </span>
          </h1>
          
          <p className={`text-base md:text-lg text-gray-300 mb-6 max-w-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 delay-300`}>
            {TJR_SUBHEADLINE}
          </p>
          
          <div className={`flex flex-wrap gap-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 delay-400`}>
            <Button className="!bg-green-600 hover:bg-green-700 text-white shadow-md transition-transform duration-300 hover:scale-105">
              <Link href="./signin">{BUTTON_TEXT}</Link>     
            </Button>
            <Button className="border-2 border-green-600 text-gray-200 hover:bg-green-700 transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center gap-2">
              <Link href={"#contact"}>{BUTTON_TEXT2}</Link>
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className={`mt-8 flex items-center gap-6 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-700 delay-500`}>
            <div className="flex items-center gap-2 text-sm text-gray-400 group cursor-pointer">
              <TruckIcon size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-green-300 transition-colors">48h Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 group cursor-pointer">
              <MapPinIcon size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-green-300 transition-colors">GCC Coverage</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 group cursor-pointer">
              <BoxIcon size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-green-300 transition-colors">Secure Handling</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className={`relative z-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700 delay-300`}>
            <div className="relative mx-auto w-full max-w-md">
             <img
                src={`${IMG_URL}`}
                alt="Hero Image"
                height={500}
                width={500}
                style={{ objectFit: 'contain' }}
                className="rounded-lg shadow-lg"
           
              />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>
        </div>
      </div>
      
      <div className="absolute w-full h-8 bottom-0 bg-gray-900"></div>
    </section>
  );
};

export default HeroSection;