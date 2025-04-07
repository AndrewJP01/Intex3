// src/pages/PrivacyPage.tsx

const PrivacyPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
  
        <p className="mb-4 text-gray-700">
          CineNiche is committed to protecting your personal information. This privacy policy outlines how we collect, use, and safeguard your data in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR).
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Name, email, phone number</li>
          <li>User ratings and viewing history</li>
          <li>Subscription data for other platforms</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To recommend personalized content</li>
          <li>To improve site functionality and content</li>
          <li>To contact you about your account</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Your Rights</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
        <p className="text-gray-700 mb-4">
          This site uses cookies to enhance your experience. You may opt in or out of cookies at any time using our cookie settings banner.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or requests regarding your data, please contact us at <a href="mailto:privacy@cineniche.com" className="text-blue-600 underline">privacy@cineniche.com</a>.
        </p>
      </div>
    );
  };
  
  export default PrivacyPage;
  