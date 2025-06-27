'use client';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PrivacyAndPolicy() {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '170px', paddingBottom: '10px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="fw-bold text-primary">Privacy Policy</h1>
              <p className="lead">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="fw-bold mb-3 text-primary">Introduction</h2>
                <p>
                  Scales (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our fishing scale products.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>Personal Information:</strong> Name, email, phone number, shipping/billing address
                  </li>
                  <li className="list-group-item">
                    <strong>Payment Information:</strong> Credit card details (processed securely via payment processors)
                  </li>
                  <li className="list-group-item">
                    <strong>Device Information:</strong> IP address, browser type, operating system
                  </li>
                  <li className="list-group-item">
                    <strong>Usage Data:</strong> Pages visited, products viewed, purchase history
                  </li>
                </ul>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">How We Use Your Information</h3>
                <ol className="mb-3">
                  <li className="mb-2">Process and fulfill your orders</li>
                  <li className="mb-2">Provide customer support</li>
                  <li className="mb-2">Improve our products and services</li>
                  <li className="mb-2">Send promotional communications (with your consent)</li>
                  <li className="mb-2">Prevent fraudulent transactions</li>
                  <li className="mb-2">Comply with legal obligations</li>
                </ol>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Data Sharing and Disclosure</h3>
                <p>We may share information with:</p>
                <ul className="mb-3">
                  <li className="mb-2">Payment processors to complete transactions</li>
                  <li className="mb-2">Shipping carriers to deliver products</li>
                  <li className="mb-2">Service providers who assist our business operations</li>
                  <li className="mb-2">Legal authorities when required by law</li>
                </ul>
                <p className="mb-0">
                  We never sell your personal information to third parties.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Data Security</h3>
                <p>
                  We implement appropriate security measures including:
                </p>
                <ul className="mb-3">
                  <li className="mb-2">SSL encryption for all data transmissions</li>
                  <li className="mb-2">Secure storage of sensitive information</li>
                  <li className="mb-2">Regular security assessments</li>
                  <li className="mb-2">Limited access to personal data</li>
                </ul>
                <p className="mb-0">
                  While we strive to protect your information, no method of transmission over the Internet is 100% secure.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Your Rights</h3>
                <p>Depending on your location, you may have the right to:</p>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li className="mb-2">Access your personal data</li>
                      <li className="mb-2">Request correction of inaccurate data</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li className="mb-2">Request deletion of your data</li>
                      <li className="mb-2">Opt-out of marketing communications</li>
                    </ul>
                  </div>
                </div>
                <p className="mb-0">
                  To exercise these rights, please contact us at privacy@scales-fishing.com.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Cookies and Tracking</h3>
                <p>
                  We use cookies and similar technologies to:
                </p>
                <ul className="mb-3">
                  <li className="mb-2">Remember your preferences</li>
                  <li className="mb-2">Analyze website traffic</li>
                  <li className="mb-2">Improve user experience</li>
                </ul>
                <p className="mb-0">
                  You can control cookies through your browser settings.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Children&apos;s Privacy</h3>
                <p className="mb-0">
                  Our services are not directed to individuals under 16. We do not knowingly collect personal information from children.
                </p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Policy Changes</h3>
                <p className="mb-0">
                  We may update this policy periodically. The updated version will be posted on our website with a new &quot;Last Updated&quot; date.
                </p>
              </div>
            </div>

            <div className="alert alert-info mt-4">
              <div className="d-flex align-items-center">
                <i className="bi bi-info-circle-fill me-3 fs-4"></i>
                <div>
                  <h4 className="alert-heading">Contact Us</h4>
                  <p className="mb-0">
                    For privacy-related questions or concerns, please contact us at:<br />
                    <strong>privacy@scales.com</strong> or <strong>(555) 987-6543</strong>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyAndPolicy;
