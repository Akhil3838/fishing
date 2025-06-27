'use client';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ShippingPolicy() {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '170px', paddingBottom: '10px' }}>
        <div className="row">
          <div className="col-12">
            <h1 className="fw-bold text-primary mb-4">Shipping Policy</h1>

            <div className="mb-5">
              <h2 className="fw-bold mb-3">Delivery Timeframes</h2>
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>Standard Shipping:</strong> 3-5 business days<br />
                  <small className="text-muted">Available for most continental locations</small>
                </li>
                <li className="list-group-item">
                  <strong>Expedited Shipping:</strong> 1-2 business days<br />
                  <small className="text-muted">Additional charges apply</small>
                </li>
                <li className="list-group-item">
                  <strong>International Shipping:</strong> 7-14 business days<br />
                  <small className="text-muted">Customs fees may apply</small>
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="fw-bold mb-3">Shipping Rates</h2>
              <p>We offer competitive shipping rates based on your location and order size:</p>
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>Orders over ₹50:</strong> Free standard shipping<br />
                  <small className="text-muted">Continental US only</small>
                </li>
                <li className="list-group-item">
                  <strong>Orders under ₹50:</strong> Flat rate ₹5.99
                </li>
                <li className="list-group-item">
                  <strong>Expedited shipping:</strong> ₹12.99
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="fw-bold mb-3">Special Considerations for Fishing Scales</h2>
              <p>Our precision fishing scales require careful handling:</p>
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>All scales are shipped in protective packaging</strong><br />
                  <small className="text-muted">Includes waterproof materials when needed</small>
                </li>
                <li className="list-group-item">
                  <strong>Battery-operated models ship with batteries removed</strong><br />
                  <small className="text-muted">For safety during transit</small>
                </li>
                <li className="list-group-item">
                  <strong>Calibration certificates included where applicable</strong>
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="fw-bold mb-3">Order Processing</h2>
              <p className="mb-0">
                Most orders ship within 1 business day. Orders placed after 2pm EST will process the next business day.
                Weekend orders ship Monday.
              </p>
            </div>

            <div className="mb-5">
              <h2 className="fw-bold mb-3">Tracking Information</h2>
              <p className="mb-0">
                You&apos;ll receive a tracking number via email as soon as your order ships. Our system updates tracking in real-time
                so you can follow your fishing scale&apos;s journey to your doorstep.
              </p>
            </div>

            <div className="bg-light p-4 rounded">
              <h3 className="fw-bold mb-3">Need Help With Your Order?</h3>
              <p className="mb-0">
                Contact our customer service team at <strong>support@scales.com</strong> or call <strong>(555) 123-4567</strong> for any shipping inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShippingPolicy;
