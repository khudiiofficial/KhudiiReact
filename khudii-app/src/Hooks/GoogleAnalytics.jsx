// src/hooks/useGoogleAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = import.meta.env.VITE_REACT_APP_GA_TRACKING_ID;

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn('GA Tracking ID not found');
      return;
    }

    // Avoid re-initializing
    if (window.gtag) {
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Define gtag function to push to dataLayer
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initial config
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });
  }, []); // Only run once on mount

  // Track page views on route change
  useEffect(() => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    // Use explicit page_view event (recommended for SPAs)
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.origin + location.pathname + location.search,
      page_path: location.pathname + location.search,
    });
  }, [location]);
};

// Event tracking function
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};