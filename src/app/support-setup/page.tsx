import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { RiArrowDownSLine } from "react-icons/ri";

export default function SupportSetupPage() {
  const faqs = [
    {
      question: "How do I get paid after a COD order?",
      answer: "Once your order is delivered and the payment is collected, we transfer your share to your account after deducting fulfillment and delivery costs."
    },
    {
      question: "Do you offer card payments for customers?",
      answer: "Yes, we can help you set up card payments through our trusted partners. This is available as an additional service."
    },
    {
      question: "What's the cost to use TJR?",
      answer: "Our base plan starts at 120 AED/month, giving you access to fulfillment, sourcing, and storage services. Delivery and COD fees are applied per order."
    },
    {
      question: "How do I start using TJR?",
      answer: "Contact us or fill out the sign-up form. Our team will onboard you, connect your store (if needed), and walk you through the process."
    },
    {
      question: "Do you provide customer service for my clients?",
      answer: "No, but we'll handle all logistics and delivery-related issues. You stay in control of your customer communication while we handle the backend."
    }
  ];

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-400">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="border border-green-600 rounded-lg overflow-hidden shadow-lg group"
            >
              <summary
                className="w-full p-4 flex justify-between items-center bg-green-600 hover:bg-green-800 transition-colors duration-200 cursor-pointer"
              >
                <h3 className="font-medium text-left text-white text-base md:text-lg">{faq.question}</h3>
                <RiArrowDownSLine 
                  className="w-5 h-5 text-green-400 transition-transform duration-200 group-open:rotate-180" 
                />
              </summary>
              
              <div className="bg-gray-800 py-4">
                <p className="px-4 text-gray-100">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      
      <Footer />
    </section>
  );
}
