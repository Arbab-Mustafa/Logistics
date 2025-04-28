import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              TJR Logistics is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our logistics and fulfillment services. Please read this privacy policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Personal identification information (Name, address, email address, phone number, etc.)</li>
              <li>Business information (Company name, EIN, shipping addresses, etc.)</li>
              <li>Payment information (Credit card details, banking information, etc.)</li>
              <li>Product information (Inventory details, SKUs, product descriptions, etc.)</li>
              <li>Customer data for fulfillment purposes (Shipping addresses, order details, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Providing and maintaining our services</li>
              <li>Processing and fulfilling orders</li>
              <li>Managing inventory</li>
              <li>Communicating with you about your account or transactions</li>
              <li>Sending you technical notices, updates, security alerts, and support messages</li>
              <li>Responding to your comments, questions, and customer service requests</li>
              <li>Improving our services and developing new products and features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Third-party service providers who perform services on our behalf</li>
              <li>Shipping carriers to facilitate delivery of orders</li>
              <li>Payment processors to process transactions</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p>
              We will retain your information for as long as your account is active or as needed to provide you services. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &amp;quot;Last Updated&amp;quot; date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@tjrlogistics.com or call +971 54 717 6885.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;