import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const ShippingReturns = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Shipping & Return Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Shipping Policy</h2>
            <p>
              TJR Logistics is committed to providing efficient and reliable shipping services for our clients across the GCC region. This policy outlines our shipping procedures, timeframes, and responsibilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Order Processing</h2>
            <p>
              Orders received before 2:00 PM GST will typically be processed the same business day. Orders received after 2:00 PM GST will be processed the following business day. Processing times may vary during peak seasons or promotional periods.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Shipping Methods and Timeframes</h2>
            <p>
              We offer the following shipping options:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Standard Delivery: 2-4 business days within UAE, 5-7 business days for other GCC countries</li>
              <li>Express Delivery: 1-2 business days within UAE, 3-4 business days for other GCC countries</li>
              <li>Same-Day Delivery: Available for select areas in Dubai and Abu Dhabi for orders placed before 11:00 AM</li>
            </ul>
            <p className="mt-2">
              Delivery timeframes are estimates and not guaranteed. Factors such as customs clearance, weather conditions, and local delivery circumstances may affect delivery times.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Shipping Rates</h2>
            <p>
              Shipping rates are calculated based on:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Package dimensions and weight</li>
              <li>Delivery destination</li>
              <li>Selected shipping method</li>
              <li>Special handling requirements</li>
            </ul>
            <p className="mt-2">
              Specific shipping rates are outlined in your service agreement or can be calculated through our client dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Return Policy for E-commerce Clients</h2>
            <p>
              TJR Logistics handles returns for our e-commerce clients according to their specific return policies. We offer the following return services:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Return processing and documentation</li>
              <li>Quality inspection of returned items</li>
              <li>Reintegration of returned items into inventory</li>
              <li>Disposal of damaged or unsellable returns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Return Processing Timeframes</h2>
            <p>
              Return processing typically takes 1-3 business days from receipt at our warehouse. During peak seasons, this timeframe may extend to 3-5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Return Shipping Costs</h2>
            <p>
              Return shipping costs are determined by your specific service agreement and your company&apos;s return policy. TJR Logistics can facilitate free returns or customer-paid returns based on your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Damaged or Lost Items</h2>
            <p>
              TJR Logistics assumes responsibility for items damaged during storage or fulfillment processes within our facilities. For items damaged during transit, claims must be filed with the respective shipping carrier according to their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Updates to This Policy</h2>
            <p>
              This Shipping & Return Policy may be updated periodically. Changes will be communicated to all active clients and will take effect 30 days after notification unless otherwise specified.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
            <p>
              For questions regarding this Shipping & Return Policy, please contact our customer service team at shipping@tjrlogistics.com or call +971 54 717 6885.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingReturns;