import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-gray-600 mb-6">Effective Date: 23/10/2023</p>
        
        <p className="mb-6">
          Welcome to TJR Logistics. By opening an account or using our services, you agree to the following Terms and Conditions which govern the relationship between you (the &quot;Client&quot;) and TJR Logistics (the &quot;Company&quot;).
        </p>

        <div className="space-y-8">
          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">1. Service Overview</h2>
            <p className="mb-2">TJR Logistics provides e-commerce fulfillment and delivery services including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Product sourcing</li>
              <li>Warehousing and storage</li>
              <li>24-hour order fulfillment</li>
              <li>Cash-on-delivery (COD) services</li>
              <li>Card payments services</li>
              <li>Local and GCC deliveries</li>
              <li>Custom packaging and branding</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">2. Account Registration</h2>
            <p>
              To use our services, you must complete the official Account Opening Form and provide valid business information. TJR reserves the right to verify this information and deny service at our discretion.
            </p>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">3. Client Responsibilities</h2>
            <p className="mb-2">The Client agrees to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate product, customer, and delivery information.</li>
              <li>Ensure all goods shipped are legal, safe, and not prohibited by local or international laws.</li>
              <li>Notify TJR of any sensitive or fragile items that require special handling.</li>
              <li>Confirm all orders before they are dispatched (unless handled by TJR).</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">4. Pricing & Payments</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Monthly subscription starts at 120 AED.</li>
              <li>Delivery rates vary by destination and weight, as outlined in our pricing table.</li>
              <li>COD payments are reconciled and transferred to the client according to agreed payout schedules.</li>
              <li>Prepaid shipments must be paid in advance.</li>
            </ul>
            <p className="mt-2">TJR reserves the right to revise pricing with prior notice.</p>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">5. Cash on Delivery (COD)</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>COD collection is available across UAE, KSA, Kuwait, Bahrain, Oman, and Qatar.</li>
              <li>Failed deliveries or returns are subject to return charges.</li>
              <li>Clients are responsible for rejected or canceled COD orders.</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">6. Order Fulfillment</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Orders are fulfilled within 24 hours of confirmation.</li>
              <li>Delivery timelines vary based on destination and method (standard or express).</li>
              <li>TJR is not liable for delays caused by inaccurate information, force majeure, or third-party partners.</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">7. Storage & Inventory</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Products may be stored at TJR warehouses subject to availability.</li>
              <li>TJR is not responsible for expired, damaged, or unsellable items unless caused by proven negligence.</li>
              <li>Inventory audits can be requested by the client with reasonable notice.</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">8. Prohibited Goods</h2>
            <p className="mb-2">Clients are strictly prohibited from using TJR to transport:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Drugs, weapons, or hazardous materials</li>
              <li>Counterfeit or pirated products</li>
              <li>Items restricted by UAE or international law</li>
            </ul>
            <p className="mt-2">Violation of this clause may lead to termination of services and legal action.</p>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">9. Liability</h2>
            <p className="mb-2">TJR is not liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Damages or losses during transit unless caused by gross negligence</li>
              <li>Financial loss due to rejected COD payments</li>
              <li>Issues caused by third-party logistics partners or carriers</li>
            </ul>
            <p className="mt-2">Compensation, if approved, will be limited to the shipping fee or declared value.</p>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">10. Termination of Service</h2>
            <p className="mb-2">TJR reserves the right to suspend or terminate accounts if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payments are delayed or not cleared</li>
              <li>There is misuse of services or breach of terms</li>
              <li>Illegal or unethical practices are discovered</li>
            </ul>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">11. Dispute Resolution</h2>
            <p>
              Any disputes will be resolved in accordance with UAE laws under the jurisdiction of Dubai courts.
            </p>
          </section>

          <section>
            <hr className="border-gray-300 mb-6" />
            <h2 className="text-xl font-semibold mb-3">12. Contact</h2>
            <p className="mb-2">For queries related to these terms, please contact:</p>
            <p>Email: info@tjrdigital.com</p>
            <p>Phone: +971 54 717 6885</p>
            <p>Instagram: @tjrdubai</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
