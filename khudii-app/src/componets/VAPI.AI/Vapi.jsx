// import { useEffect } from "react";

// export default function VapiAssistant() {
//   useEffect(() => {
//     // Check if widget already exists
//     if (document.querySelector('vapi-widget')) return;

//     // Create widget
//     const widget = document.createElement('vapi-widget');
//     widget.setAttribute('assistant-id', '848e6a2c-6891-4125-9f6b-d299d1d8508a');
//     widget.setAttribute('public-key', '35e3447b-e0e2-4462-8f0a-9d1ae411485c');
//     widget.setAttribute('title', 'Talk with Khudii');
//     widget.setAttribute('cta-title', 'Talk with Khudii');
//     widget.setAttribute('mode', 'hybrid');
    
//     // Style the widget container
//     widget.style.cssText = `
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       z-index: 1000;
//     `;

//     document.body.appendChild(widget);

//     // Load script if not already loaded
//     if (!document.querySelector('script[src*="vapi-ai"]')) {
//       const script = document.createElement('script');
//       script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
//       script.async = true;
//       document.head.appendChild(script);
//     }

//     return () => {
//       // Remove widget on cleanup
//       const existingWidget = document.querySelector('vapi-widget');
//       if (existingWidget) {
//         existingWidget.remove();
//       }
//     };
//   }, []);

//   return null; // No visible component needed
// }



import React, { useState, useEffect } from "react";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;
const VapiAssistant = () => {
  const [widgetSize, setWidgetSize] = useState("compact");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWidgetSize("tiny"); // 📱 mobile
      } else if (window.innerWidth < 1024) {
        setWidgetSize("compact"); // 💻 tablet
      } else {
        setWidgetSize("full"); // 🖥️ desktop
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <VapiWidget
      publicKey={VAPI_PUBLIC_KEY}
      assistantId={VAPI_ASSISTANT_ID}
      mode="chat"
      theme="light"
      position="bottom-right"
      size={widgetSize} // 👈 dynamic
      accentColor="#02236e"
      ctaButtonColor="#bbbbbb"
      ctaButtonTextColor="#FFFFFF"
      title="AI Assistant"
      ctaTitle="Ask Khudii"
      ctaSubtitle="24/7 Support"
      chatPlaceholder="How can I help you today?"
      hideCtaButton
    />
  );
};

export default VapiAssistant;
