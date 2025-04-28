"use client";
import * as motion from "motion/react-client";
import { useInView } from "framer-motion";
import { Package, Truck, ShoppingBag, Warehouse, DollarSign, HeadphonesIcon, ListFilter, PackageOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useRef } from "react";
import { services as obeej } from "@/constants/constants";

// Map services data with corresponding icons
const serviceIcons = [
  <Package key="package" />,
  <Truck key="truck" />,
  <ShoppingBag key="shopping-bag" />,
  <ListFilter key="list-filter" />,
  <PackageOpen key="package-open" />,
  <Warehouse key="warehouse" />,
  <DollarSign key="dollar-sign" />,
  <HeadphonesIcon key="headphones" />
];

// Combine imported data with icons
const services = obeej.map((service, index) => ({
  icon: serviceIcons[index] || serviceIcons[0], // Fallback to first icon if needed
  title: service.title,
  description: service.description,
  details: service.details
}));

const ServicesSection = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  
  const servicesRef = useRef(null);
  const areServicesInView = useInView(servicesRef, { once: true, amount: 0.1 });

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          ref={titleRef}
          className="max-w-2xl mx-auto text-center mb-20"
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="text-green-400 font-medium tracking-wider uppercase text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-white leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What We Do
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          ></motion.div>
          <motion.p 
            className="text-gray-300 text-xl leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive e-commerce logistics solutions tailored for businesses in the GCC region.
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          initial="hidden"
          animate={areServicesInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-8 rounded-2xl min-h-[420px] flex flex-col shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-700 hover:border-green-500"
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    duration: 0.6
                  }
                }
              }}
            >
              {/* Background accent */}
              <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/10 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-70"></div>
              
              {/* Icon container */}
              <div className="relative mb-6 items-center justify-center inline-flex">
                <div className="absolute inset-0 items-center justify-center bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-xl blur-md transform group-hover:scale-110 transition-all duration-300"></div>
                <div className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-gray-900 border border-green-500/30 shadow-lg group-hover:border-green-400 transition-all duration-300">
                  <div className="text-green-400 flex items-center justify-center w-8 h-8 transform group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{service.description}</p>
              
              {service.details && (
                <motion.ul 
                  className="text-sm text-gray-400 mt-2 space-y-3 border-t border-gray-700 pt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {service.details.map((detail, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      variants={{
                        hidden: { opacity: 0, x: -5 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2.5 flex-shrink-0 mt-0.5 group-hover:text-green-300" />
                      <span className="group-hover:text-gray-200 transition-colors duration-300">{detail}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              
              {/* Learn more indicator */}
              <div className="mt-6 flex items-center text-green-400 text-sm font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4"/>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
