import { Star } from 'lucide-react';
import { CSSD, LLODIH, testimonials } from '@/constants/constants';
const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900" id='testimonials'>
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">{CSSD}</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg">{LLODIH}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
           <div 
           key={index} 
           className="bg-gray-800 py-8 px-6 rounded-xl shadow-sm border border-green-600 mx-auto animate-fade-in hover:bg-gray-700 flex flex-col justify-between h-[450px]"
           style={{animationDelay: `${0.1 * index}s`}}
         >
           <div>
             
             <div className="mb-4 h-[150px] w-full overflow-hidden rounded-lg">
               <video 
                 src={testimonial.video} 
                 className="w-full h-full object-cover"
                 controls
                 muted
                 playsInline
               />
             </div>
             <p className="text-gray-200 italic mb-6">&quot;{testimonial.quote}&quot;</p>
           </div><div className="flex mb-3">
               {[...Array(testimonial.rating)].map((_, i) => (
                 <Star key={i} size={16} className="fill-green-400 text-green-400 hover:text-green-300" />
               ))}
             </div>
           <div className="flex items-center mt-auto">
             <div>
               <h4 className="font-semibold text-white">{testimonial.author}</h4>
               <p className="text-sm text-gray-400">{testimonial.role}</p>
             </div>
           </div>
         </div>
         
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
