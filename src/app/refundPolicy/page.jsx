import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RefundPolicy() {
  return (
<>
<Header/>
        <div className="container" style={{paddingTop:'170px',paddingBottom:'10px'}}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">Refund Policy</h1>
                <p className="lead">Our commitment to your satisfaction</p>
              </div>
    
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <h2 className="fw-bold mb-3 text-primary">30-Day Money Back Guarantee</h2>
                  <p>
                    We stand behind our fishing scales with a 30-day money-back guarantee. 
                    If you're not completely satisfied with your purchase, you may return it 
                    within 30 days of delivery for a full refund of the product price.
                  </p>
                </div>
              </div>
    
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="fw-bold mb-3">Return Conditions</h3>
                  <p>To be eligible for a return and refund, your item must:</p>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Be in the original packaging with all accessories
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Include all original documentation and certificates
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Be unused and in the same condition as received
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Not show signs of damage or misuse
                    </li>
                  </ul>
                  <p className="mb-0">
                    <strong>Note:</strong> Shipping costs are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </div>
    
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="fw-bold mb-3">How to Return</h3>
                  <ol className="mb-3">
                    <li className="mb-2">Contact our support team at returns@scales-fishing.com to initiate your return</li>
                    <li className="mb-2">You'll receive a Return Merchandise Authorization (RMA) number</li>
                    <li className="mb-2">Pack the item securely in its original packaging</li>
                    <li className="mb-2">Include the RMA number on the outside of the package</li>
                    <li className="mb-2">Ship the item to the address provided</li>
                  </ol>
                  <p className="mb-0">
                    <strong>Processing Time:</strong> Refunds are processed within 5 business days after we receive your return.
                  </p>
                </div>
              </div>
    
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="fw-bold mb-3">Warranty Claims</h3>
                  <p>
                    All our fishing scales come with a <strong>1-year manufacturer's warranty</strong> against defects in materials and workmanship.
                  </p>
                  <p className="mb-0">
                    For warranty claims after 30 days but within 1 year of purchase, please contact our support team with proof of purchase and description of the issue.
                  </p>
                </div>
              </div>
    
              <div className="card mb-4 border-0 shadow-sm bg-light">
                <div className="card-body">
                  <h3 className="fw-bold mb-3">Non-Refundable Items</h3>
                  <ul className="mb-3">
                    <li className="mb-2">Used or damaged products</li>
                    <li className="mb-2">Products missing serial numbers or authentication stickers</li>
                    <li className="mb-2">Products not purchased directly from Scales-Fishing</li>
                    <li className="mb-2">Digital products or downloadable software</li>
                  </ul>
                  <p className="mb-0 fst-italic">
                    Exceptions may apply for defective items or incorrect shipments.
                  </p>
                </div>
              </div>
    
              <div className="alert alert-info mt-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-info-circle-fill me-3 fs-4"></i>
                  <div>
                    <h4 className="alert-heading">Need Help?</h4>
                    <p className="mb-0">
                      Contact our customer service team at <strong>support@scales.com</strong> or call <strong>(555) 123-4567</strong> for any refund-related inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <Footer/>
</>  );
}

export default RefundPolicy;