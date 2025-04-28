"use client";
import { useState, useEffect, useRef } from 'react';
import { Clock, Package, ShoppingBag, Globe, Truck, CreditCard, ArrowRight } from 'lucide-react';
import Link from "next/link";

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-indigo-300" strokeWidth={1.5} />,
      title: "24-Hour Fulfillment",
      description: "We process and ship all orders within 24 hours for lightning-fast delivery.",
      accent: "bg-gradient-to-br from-violet-500 to-indigo-500"
    },
    {
      icon: <Package className="h-8 w-8 text-fuchsia-300" strokeWidth={1.5} />,
      title: "30,000+ Products In-Stock",
      description: "Access our extensive inventory of trending products ready to ship.",
      accent: "bg-gradient-to-br from-fuchsia-500 to-purple-600"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-rose-300" strokeWidth={1.5} />,
      title: "Cash on Delivery Across GCC",
      description: "Offer the popular COD payment method to increase conversion rates.",
      accent: "bg-gradient-to-br from-rose-500 to-pink-600"
    },
    {
      icon: <Truck className="h-8 w-8 text-cyan-300" strokeWidth={1.5} />,
      title: "Real-Time Tracking",
      description: "Monitor your shipments and inventory with our advanced tracking system.",
      accent: "bg-gradient-to-br from-cyan-500 to-blue-600" 
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-300" strokeWidth={1.5} />,
      title: "Product Sourcing (China to GCC)",
      description: "We help you find and import winning products directly to our warehouse.",
      accent: "bg-gradient-to-br from-emerald-500 to-green-600"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-amber-300" strokeWidth={1.5} />,
      title: "Subscription-Only Access",
      description: "All these benefits for just 120 AED/month with no hidden fees.",
      accent: "bg-gradient-to-br from-amber-500 to-orange-600"
    }
  ];

const PremiumCards = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cardMousePositions, setCardMousePositions] = useState<{[key: number]: {x: number, y: number}}>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for each card individually
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const updatedPositions = {...cardMousePositions};
      
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const rect = cardRef.getBoundingClientRect();
          // Only update if mouse is over this card
          if (
            e.clientX >= rect.left && 
            e.clientX <= rect.right && 
            e.clientY >= rect.top && 
            e.clientY <= rect.bottom
          ) {
            updatedPositions[index] = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };
          }
        }
      });
      
      setCardMousePositions(updatedPositions);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cardMousePositions]);

  // Dynamic card mask for spotlight effect
  const CardEffect = ({ index }: { index: number }) => {
    const gradient = benefits[index]?.accent || "bg-gradient-to-br from-violet-500 to-indigo-500";
    const hasPosition = cardMousePositions[index];
    const isHovered = activeIndex === index;
    
    return (
      <div className="absolute inset-px rounded-xl overflow-hidden">
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${gradient} ${isHovered ? 'opacity-10' : 'opacity-0'}`}
        />
        <div 
          className={`absolute rounded-full w-32 h-32 blur-xl transition-opacity duration-300 ${gradient} ${hasPosition ? 'opacity-20' : 'opacity-0'}`}
          style={{
            left: `${hasPosition ? cardMousePositions[index].x - 64 : 0}px`,
            top: `${hasPosition ? cardMousePositions[index].y - 64 : 0}px`,
          }}
        />
      </div>
    );
  };

  return (
    <div 
      ref={sectionRef}
      className="py-12 px-6 bg-black relative overflow-hidden"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative"
              ref={el => { cardRefs.current[index] = el; }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Card container with border */}
              <div className="relative h-full border border-white/10 rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Hover effect mask */}
                <CardEffect index={index} />
                
                {/* Rest of the card content remains unchanged */}
                <div className="relative p-8 h-full">
                  {/* Card content remains unchanged */}
                  <div className="flex flex-col h-full">
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 ${benefit.accent} opacity-20 blur-lg rounded-full transform scale-75 transition-all duration-300 group-hover:scale-125 group-hover:opacity-30`}></div>
                      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-flex items-center justify-center border border-white/10 shadow-lg">
                        {benefit.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-3 text-white tracking-tight">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{benefit.description}</p>
                    
                    <div className="mt-auto">
                      <button className={`flex items-center justify-center w-full px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300 group-hover:border-white/20 overflow-hidden relative`}>
                        <span className="relative cursor-pointer z-10 flex items-center">
                          <Link className="mr-2" href={"./signin"} passHref>Explore</Link>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className={`absolute inset-0 ${benefit.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated highlight corner */}
              <div className={`absolute top-0 right-0 w-8 h-8 ${benefit.accent} rounded-bl-xl rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Floating indicator dots */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${activeIndex === index ? benefit.accent.replace('bg-gradient-to-br', '') + ' opacity-100' : 'bg-white/30 opacity-50'}`}></div>
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${activeIndex === index ? benefit.accent.replace('bg-gradient-to-br', '') + ' opacity-100' : 'bg-white/30 opacity-50'}`}></div>
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${activeIndex === index ? benefit.accent.replace('bg-gradient-to-br', '') + ' opacity-100' : 'bg-white/30 opacity-50'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumCards;
