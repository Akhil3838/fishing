import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TermsAndCondition() {
  return (
<>
<Header/>
        <div className="container" style={{paddingTop:'150px'}} >
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5 text-start">
              <h2 className="card-title text-center mb-4 fw-bold text-primary">Terms and Conditions</h2>
              <p className="lead text-center mb-5">
                Last Updated: 12-04-2025 <br />
                Welcome to Scaless.com (“Fargozi”, “we”, “us”, or “our”). By accessing or using our website or services (collectively, the “Service”), you agree to be bound by these Terms and Conditions (“Terms”).
              </p>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">1. Acceptance of Terms</h4>
                <p className="text-muted">
                  Your use of our Service constitutes your acceptance of these Terms. If you do not agree, you must not use the Service.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">2. Services Overview</h4>
                <p className="text-muted">
                  Fargozi is an online platform where users can discover and purchase curated fashion, lifestyle, and unique goods. All transactions are directly between buyers and sellers. Fargozi does not own or sell the listed items.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">3. User Accounts</h4>
                <p className="text-muted">
                  Users must be at least 18 years old to register. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">4. Listings and Transactions</h4>
                <p className="text-muted">
                  Sellers must ensure their listings are accurate and compliant with all applicable laws. Buyers must read descriptions carefully before making purchases. We do not guarantee delivery or condition of items. Disputes must be reported within 3 days of delivery.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">5. Payments and Fees</h4>
                <p className="text-muted">
                  We charge service and/or transaction fees, which are subject to change. All prices are shown in INR unless otherwise stated. We may withhold payments for fraud prevention or dispute resolution.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">6. Prohibited Conduct</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-muted">Post or sell illegal or counterfeit goods</li>
                  <li className="list-group-item text-muted">Violate intellectual property rights</li>
                  <li className="list-group-item text-muted">Use the platform for spam, harassment, or fraud</li>
                  <li className="list-group-item text-muted">Disrupt the Service or attempt unauthorized access</li>
                </ul>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">7. Intellectual Property</h4>
                <p className="text-muted">
                  All Fargozi content, trademarks, and logos are our intellectual property. You may not reproduce or misuse them without prior written permission.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">8. Termination</h4>
                <p className="text-muted">
                  We reserve the right to suspend or terminate any account for violations of these Terms or for other reasons at our discretion.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">9. Limitation of Liability</h4>
                <p className="text-muted">
                  Fargozi is not liable for indirect or consequential damages arising from use of the Service. Our total liability is limited to the amount of fees you’ve paid us in the past 6 months, or ₹2,000, whichever is higher.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">10. Dispute Resolution</h4>
                <p className="text-muted">
                  Disputes will be resolved through binding arbitration in accordance with Indian law. Class actions are not permitted.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">11. Changes to Terms</h4>
                <p className="text-muted">
                  We may modify these Terms at any time. Continued use of the Service implies acceptance of the updated Terms.
                </p>
              </div>
    
              <div className="mb-4">
                <h4 className="fw-bold text-secondary mb-3">12. Contact</h4>
                <p className="text-muted">
                  For questions or concerns, email us at: <a href="mailto:buy@fargozi.com">buy@Scaless.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
    <Footer/>
</>  );
}

export default TermsAndCondition;
