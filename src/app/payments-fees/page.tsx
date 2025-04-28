import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { FiPlus } from 'react-icons/fi';
import { faqs } from '@/constants/constants';
// type FAQ = {
//   question: string;
//   answer: string;
// };

const FAQSection = () => {


  return (
    <section className="container bg-gray-800 w-full h-full mx-auto px-4">
      <NavBar />
      <h2 className="text-3xl font-bold mb-8 p-4 text-center text-white">
        Frequently Asked Questions
      </h2>
   
      <div className="max-w-3xl mx-auto space-y-4 mb-8">
        {faqs.map((faq, index) => (
          <details 
            key={index}
            className="border-2 border-green-400 rounded-lg overflow-hidden transition-all duration-300 group"
          >
            <summary className="w-full p-4 text-left flex justify-between items-center bg-green-800 cursor-pointer list-none hover:bg-green-700 transition-colors duration-200">
              <h3 className="font-medium text-lg text-white">{faq.question}</h3>
              <span className="text-white text-xl">
                <FiPlus className="inline-block group-open:hidden" />
              </span>
            </summary>
            
            <div className="bg-gray-700 px-4 py-4">
              <p className="text-gray-200">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default FAQSection;
