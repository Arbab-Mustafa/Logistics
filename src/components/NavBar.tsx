"use client";
import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 backdrop-blur-sm border-b border-green-600 shadow-sm">
      <div className="container flex h-16 items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:ml-0 ml-3 font-bold text-white tracking-tight"><Image src={"/logo.jpg"} className='object-contain rounded-full mix-blend-color-dodge' height={56} width={56} alt="Logo" /></span>
            <span className="h-6 w-1 bg-green-800 rounded-full"></span>
            <span className="text-sm font-bold text-gray-100">Logistics</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="./#about" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            About Us
          </Link>
          <Link href="./#services" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            Services
          </Link>
          <Link href="./#packages" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            Packages
          </Link>
          <Link href="./affiliate" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            Affiliate
          </Link>
          <Link href="./#contact" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            Contact
          </Link>
       
          <Link href="./careers" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
            Careers
          </Link>        
          </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center">
            <Phone size={16} className="text-green-400 mr-1" />
            <a href="tel:+971547176885" className="text-sm font-medium text-gray-300 hover:text-green-300 transition-colors">
              +971 54 717 6885
            </a>
          </div>
          <Link href="./signin" className="bg-green-600 p-2 rounded-md hover:bg-green-700 text-white">
            Get Started
          </Link>
        </div>
        
        <button
          className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-200"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-green-600">
          <div className="container py-4 space-y-4 px-4 mx-auto">
            <Link href="./#about" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              About Us
            </Link>
            <Link href="./#services" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              Services
            </Link>
            <Link href="./#packages" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              Packages
            </Link>
            <Link href="./affiliate" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              Affiliate
            </Link>
            <Link href="./#contact" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              Contact
            </Link>
            <Link href="./careers" className="block py-2 text-base font-medium text-gray-300 hover:text-green-300 transition-colors">
              Careers
            </Link>
            <div className="pt-4 border-t border-gray-700">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
