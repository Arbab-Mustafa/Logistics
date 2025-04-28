import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';

const CashOnDeliveryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
        <NavBar />
      {/* Header */}
      <header className="bg-green-800 py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Cash on Delivery & Local Delivery Fulfillment
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Section 1 */}
        <section className="mb-16 p-6 bg-green-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Built for the GCC Market</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We understand the local buying habits.</li>
            <li>Over <span className="font-bold text-green-300">70% of customers</span> in the region prefer paying by cash.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-16 p-6 bg-black border-2 border-green-600 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-400">How Our COD System Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Orders shipped <span className="font-bold">within 24 hours</span>.</li>
            <li>Cash collected from the customer.</li>
            <li>You receive the payment after successful delivery.</li>
            <li>No extra setup or payment gateway needed for COD.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-16 p-6 bg-green-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Failed Delivery? No Problem.</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>If a delivery fails, you don&apos;t pay for the delivery.</li>
            <li>We follow up and attempt redelivery.</li>
            <li>Return management included.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-16 p-6 bg-black border-2 border-green-600 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Need Card Payments Too?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We can also help you set up card payments through our partners.</li>
            <li>Optional add-on — perfect if you want to offer both options.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="p-6 bg-green-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Why TJR for Local Delivery</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-bold">Fast delivery</span> (within 24 hours in UAE)</li>
            <li>Trained delivery partners across GCC</li>
            <li>Real-time tracking and status updates</li>
            <li>Full transparency and professional customer service</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default CashOnDeliveryPage;