import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Check localStorage or cookies to determine if consent has been given or denied
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesDenied = localStorage.getItem('cookiesDenied');
    const cookieConsent = document.cookie.includes('cookieConsent=true'); 

    // Show the banner if cookies are neither accepted nor denied
    if (!cookiesAccepted && !cookiesDenied && !cookieConsent) {
      setIsVisible(true);
    } else if (cookiesAccepted) {
      // If cookies were accepted, we can set non-essential cookies
      loadNonEssentialCookies();
    }
  }, []);

  // Function to load non-essential cookies (e.g., tracking or analytics cookies)
  const loadNonEssentialCookies = () => {
    // Example of setting a non-essential cookie
    document.cookie = "userTracking=true; max-age=31536000; path=/"; 
    console.log('Non-essential cookies loaded.');
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);

    // Set cookies when the user accepts
    document.cookie = "cookieConsent=true; max-age=31536000; path=/"; 

    // Now, load non-essential cookies
    loadNonEssentialCookies();
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesDenied', 'true');
    setIsVisible(false);

    // Delete cookies if the user denies
    document.cookie = "cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
  };

  return (
    isVisible && (
      <div className="cookie-consent-banner">
        <div className="cookie-consent-content">
          <p>
            This website uses cookies to enhance the user experience, such as remembering preferences and providing personalized content.
            <br />
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </p>
          <button onClick={handleDeclineCookies} className="cookie-consent-button decline-button">
            Decline Cookies
          </button>
          <button onClick={handleAcceptCookies} className="cookie-consent-button accept-button">
            Accept Cookies
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;