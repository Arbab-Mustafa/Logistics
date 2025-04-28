"use client";
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion }  from "motion/react";
import { ABDR, BLINK, BUSINESS, ENTERPRISE,HDH,PLINK,STARTER } from '@/constants/constants';

export default function PackagesSection() {
  // Animation variants for the cards and checkmarks
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring" } }
  };

  return (
    <section id="packages" className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          className="max-w-xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-white">{ABDR}</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">{HDH}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <motion.div 
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm bg-opacity-80"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={0}
            variants={cardVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Starter</h3>
            <div className="flex items-center mb-6">
              <motion.span 
                className="text-4xl font-bold text-green-400"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                120 AED
              </motion.span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <p className="text-gray-300 mb-6">Perfect for beginners or small store owners.</p>
            
            <ul className="space-y-4 mb-8">
              {STARTER.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start"
                  initial="hidden"
                  animate="visible"
                  variants={checkmarkVariants}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <span className="mr-2 mt-1 text-green-400"><Check size={16} /></span>
                  <span className="text-gray-200">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button 
              className="w-full !bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => window.open(`${PLINK}`, "_blank")}
            >
              Start with Starter
            </Button>
          </motion.div>
          
          {/* Business Plan */}
          <motion.div 
            className="bg-gray-800 p-8 rounded-xl shadow-xl border-2 border-green-600 relative backdrop-blur-sm bg-opacity-80"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={1}
            variants={cardVariants}
          >
            <div className="absolute -top-3 right-6 bg-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-md text-white">Popular</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Business</h3>
            <div className="flex items-center mb-6">
              <motion.span 
                className="text-4xl font-bold text-green-400"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                349 AED
              </motion.span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <p className="text-gray-300 mb-6">For growing brands and teams needing flexibility.</p>
            
            <ul className="space-y-4 mb-8">
              {BUSINESS.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start"
                  initial="hidden"
                  animate="visible"
                  variants={checkmarkVariants}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                >
                  <span className="mr-2 mt-1 text-green-400"><Check size={16} /></span>
                  <span className="text-gray-200">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button  onClick={() => window.open(`${BLINK}`, "_blank")} className="w-full !bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transform transition-all duration-300 hover:scale-[1.02]">
              Upgrade to Business
            </Button>
          </motion.div>
          
          {/* Enterprise Plan */}
          <motion.div 
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm bg-opacity-80"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={2}
            variants={cardVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
            <div className="flex items-center mb-6">
              <motion.span 
                className="text-2xl font-bold text-gray-200"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                Custom Quote
              </motion.span>
            </div>
            <p className="text-gray-300 mb-6">Ideal for large-scale operations & agencies.</p>
            
            <ul className="space-y-4 mb-8">
              {ENTERPRISE.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start"
                  initial="hidden"
                  animate="visible"
                  variants={checkmarkVariants}
                  transition={{ delay: 0.7 + (i * 0.1) }}
                >
                  <span className="mr-2 mt-1 text-green-400"><Check size={16} /></span>
                  <span className="text-gray-200">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button className="w-full border-2 !border-green-600 hover:bg-green-700 text-green-400 hover:text-green-300 font-medium shadow-md transform transition-all duration-300 hover:scale-[1.02]">
              Request Enterprise
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
