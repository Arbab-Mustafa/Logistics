import { BBDGT, DESCBG, GCC_IMAGE, GCCIMGT, HDESCS } from '@/constants/constants';

 

const CoverageSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">{BBDGT}</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">{DESCBG}</p>
        </div>
        
        <div className="relative h-[400px] max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-green-600">
          {/* Map Background Image */}
          <div className="absolute inset-0 opacity-80">
            <img
              src={`${GCC_IMAGE}`}
              alt="GCC Region Map"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
 
            />
          </div>
          
         
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 px-5 py-2 rounded-lg shadow-md hover:bg-green-700">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-sm font-medium text-gray-200">{GCCIMGT}</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-gray-400">
            {HDESCS}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
