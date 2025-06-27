'use client';
import { useEffect, useRef } from 'react';

const RazorpayEMIWidget = ({ amount }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!amount || isNaN(amount)) return;

    // Clear previous script if any
    const existingScript = document.getElementById('razorpay-emi-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Remove previous widget HTML if present
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.razorpay.com/static/widget/product-emi.js';
    script.id = 'razorpay-emi-script';
    script.async = true;
    script.setAttribute('data-product-amount', amount.toString());

    // Append to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [amount]);

  return <div ref={containerRef} className="mt-3" />;
};

export default RazorpayEMIWidget;
