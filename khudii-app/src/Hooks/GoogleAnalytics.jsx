// src/hooks/useGoogleAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = import.meta.env.VITE_REACT_APP_GA_TRACKING_ID;

export const useGoogleAnalytics = () => {
  const location = useLocation();

  // Initialize GA only once
  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn('GA Tracking ID not found');
      return;
    }

    // Only initialize if not already done
    if (window.gtag) return;

    // Load the gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

  }, []);

  // Track page views when location changes
  useEffect(() => {
    if (window.gtag && GA_TRACKING_ID) {
      gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
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