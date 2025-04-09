import './PrivacyPage.css';
import { Navbar } from "../components/Navbar";

const PrivacyPage = () => {
  return (
    <div className="privacy-background">
      <Navbar />
      <div className="privacy-wrapper">
        <div className="privacy-container">
          <h1>Privacy Policy</h1>

          <p>
            CineNiche is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your data when you use our services across all platforms, including our website, mobile, and TV apps.
          </p>

          <h2>1. What Data Do We Collect?</h2>
          <ul>
            <li>Personal information: Name, email address, phone number, age, gender, location, password (hashed).</li>
            <li>Usage data: Viewing history, search queries, ratings, favorite movies.</li>
            <li>Technical data: IP address, browser, device type, session activity.</li>
            <li>Subscription info: Whether you're subscribed to other streaming services.</li>
          </ul>

          <h2>2. How Do We Collect Your Data?</h2>
          <ul>
            <li>When you register or create an account on CineNiche.</li>
            <li>When you interact with our platform: rate movies, search, or browse content.</li>
            <li>When you provide feedback or contact us directly.</li>
            <li>Automatically through cookies and similar tracking technologies.</li>
          </ul>

          <h2>3. How Will We Use Your Data?</h2>
          <ul>
            <li>To personalize movie recommendations based on your activity.</li>
            <li>To improve our platform, content offerings, and user experience.</li>
            <li>To manage your account and provide support.</li>
            <li>To send account updates or important notifications.</li>
          </ul>

          <h2>4. How Do We Store Your Data?</h2>
          <p>
            All CineNiche data is securely stored in cloud infrastructure (Azure). Passwords are hashed and never stored in plain text. Role-based access control limits internal access to sensitive data.
          </p>

          <h2>5. Marketing</h2>
          <p>
            CineNiche may send you promotional content only if you’ve opted in. You can opt out anytime by adjusting your profile settings or unsubscribing via email links.
          </p>

          <h2>6. What Are Your Data Protection Rights?</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access: Request copies of your personal data.</li>
            <li>Rectification: Request corrections of inaccurate or incomplete data.</li>
            <li>Erasure: Request we delete your data under certain conditions.</li>
            <li>Restrict processing: Request we limit how we use your data.</li>
            <li>Object: Object to processing based on your specific situation.</li>
            <li>Data portability: Request we transfer your data to another provider.</li>
          </ul>

          <p>If you make a request, we have one month to respond. Contact us using the info below.</p>

          <h2>7. Cookies</h2>
          <p>
            Cookies help us remember preferences, understand how you use our site, and personalize your experience. You can manage your preferences using our cookie consent banner or your browser settings.
          </p>

          <h2>8. Types of Cookies We Use</h2>
          <ul>
            <li><strong>Essential:</strong> For signing in and enabling core features.</li>
            <li><strong>Preferences:</strong> To remember language, location, or playback settings.</li>
            <li><strong>Analytics:</strong> To monitor usage and performance.</li>
            <li><strong>Advertising:</strong> (Optional) To show personalized ads across platforms.</li>
          </ul>

          <h2>9. Privacy Policies of Other Sites</h2>
          <p>
            Our website may contain links to external sites. This policy only applies to CineNiche. Please read their privacy policies separately.
          </p>

          <h2>10. Changes to Our Policy</h2>
          <p>
            We regularly review and update this policy. Updates will appear on this page. This version was last updated on April 9, 2025.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions or wish to exercise any of your rights, contact us:
            <br />
            📧 Email: <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
          </p>

          <h2>12. Contacting the Authorities</h2>
          <p>
            If you believe we have not addressed your concern satisfactorily, you may contact your local Data Protection Authority or the <a href="https://ico.org.uk/" target="_blank" rel="noreferrer">Information Commissioner’s Office (ICO)</a>.
          </p>

          <p className="updated">Last updated: April 9, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
