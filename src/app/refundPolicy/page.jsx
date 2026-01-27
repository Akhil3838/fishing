'use client';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RefundPolicy() {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '170px', paddingBottom: '10px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="text-center mb-5">
              <h1 className="fw-bold text-primary">Return, Refund & Replacement Policy</h1>
              <p className="lead">www.scalesstackles.com</p>
              <p>
                At Scaless tackles, we value your satisfaction and aim to provide a transparent and fair refund,
                return, and replacement process. Please read the policy carefully before placing an order,
                as completing a purchase implies acceptance of the terms below.
              </p>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3 text-primary">When is a Product Eligible for Return or Replacement?</h3>
                <p>A product is eligible for return or replacement only in the following cases:</p>
                <ol>
                  <li><strong>Wrong Product Received:</strong> The item received is dimensionally or specification-wise different from what was ordered.</li>
                  <li><strong>Damaged Product:</strong> The product is found damaged inside the original manufacturer packaging at the time of delivery.</li>
                  <li><strong>Orders with Shipping Insurance:</strong> Claims will be considered only if shipping insurance was opted for and the required claim process is followed correctly.</li>
                </ol>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">When is a Product NOT Eligible for Return or Replacement?</h3>
                <p>Returns or replacements will not be accepted in the following situations:</p>
                <ol>
                  <li><strong>Change of Mind:</strong> If the correct product as ordered is delivered and the buyer later wishes to exchange it for another product or variant.</li>
                  <li><strong>Minor Variations:</strong> Slight differences in colour shade, finish quality, machining, weight, length, model updates, or minor rust/discoloration are not valid reasons for return.</li>
                  <li><strong>Manufacturer Updates:</strong> Changes made by brands or manufacturers (design, parts, specifications, or production facility) without prior notice are not valid grounds for return. Buyers are advised to verify specifications on the brand’s official website before placing an order.</li>
                  <li><strong>Packaging or Accessories:</strong> Damage to outer packaging, missing manuals, covers, or carry bags does not qualify for returns or refunds.</li>
                </ol>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Reporting Damages</h3>
                <p>Any issue must be reported within 24 hours of delivery. Delivery date records from shipping partners will be treated as final.</p>

                <h5 className="fw-bold mt-3">Mandatory Unboxing Video</h5>
                <p>A continuous, unedited unboxing video is mandatory for all claims.</p>

                <h6 className="fw-bold">Unboxing Video Guidelines</h6>
                <ul>
                  <li>Show the entire sealed package as received.</li>
                  <li>Clearly display the shipping label with recipient name, address, and order ID.</li>
                  <li>Capture the complete unboxing process in one continuous shot without cuts.</li>
                  <li>Clearly show the wrong product or visible damage, zoomed and identifiable.</li>
                  <li>Claims without a proper unboxing video will not be processed.</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Return & Claim Process</h3>
                <ul>
                  <li><strong>Submit Video & Claim:</strong> Email the unboxing video along with order details and invoice to <strong>mail@scalessindia12@gmail.com</strong> within 24 hours of delivery.</li>
                  <li>Our team will review the video and confirm whether the claim is valid.</li>
                  <li><strong>Reverse Pickup / Self Dispatch:</strong> Reverse pickup will be arranged if available at your pin code. If reverse pickup is unavailable, the buyer must self-dispatch the product.</li>
                  <li><strong>Repacking Video Required:</strong> A single-shot video showing the repacking of the product and address labelling is mandatory for dispatched returns.</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm bg-light">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Refund / Replacement Options</h3>
                <p>Once the returned product reaches our warehouse and passes inspection, one of the following will be offered:</p>
                <ul>
                  <li>Replacement (subject to stock availability).</li>
                  <li>Store Credit (valid for 3 months).</li>
                  <li>Refund.</li>
                </ul>
                <p><strong>Refunds</strong> are typically processed within <strong>7–10 business days</strong> after approval.</p>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Important Notes</h3>
                <ul>
                  <li>No Refund/Replacement Without Video: If you don’t provide an unboxing video as per the guidelines or did not opt for shipping insurance, the return may not be approved.</li>
                  <li>No Claims Without Insurance: In case you didn't opt for shipping insurance and the package is damaged or lost in transit, no claim will be accepted.</li>
                </ul>

                <h5 className="fw-bold mt-3">In Transit Damage</h5>
                <ul>
                  <li>Check Before Accepting: Inspect the package for damage when it arrives. If damaged, do not accept it or give the OTP.</li>
                  <li>Record a video showing the damage and return the package to the delivery person.</li>
                </ul>
              </div>
            </div>

            <div className="card mb-4 border-0 shadow-sm bg-light">
              <div className="card-body">
                <h3 className="fw-bold mb-3">Things to Note</h3>
                <ol>
                  <li>For any claim to be processed, a clear video of both unpacking/unboxing and repacking is mandatory. Claims may not be accepted if the video is not recorded as per the above guidelines.</li>
                  <li>If shipping insurance was not selected at the time of placing the order, refunds, exchanges, replacements, or store credits may not be available for damaged products.</li>
                  <li>Customers are required to record an unpacking/unboxing video for all packages and follow the claim procedure as outlined above to ensure smooth processing.</li>
                  <li>Claim requests must be reported within 24 hours of receiving the package. Requests submitted after this period may not be entertained.</li>
                </ol>
              </div>
            </div>

            <div className="alert alert-info mt-4">
              <div className="d-flex align-items-center">
                <i className="bi bi-info-circle-fill me-3 fs-4"></i>
                <div>
                  <h4 className="alert-heading">General Rules</h4>
                  <ul className="mb-2">
                    <li><strong>Final Decision:</strong> Scaless tackles reserves the final right to approve or reject any return/refund claim. By placing an order, you agree to all the terms above.</li>
                  </ul>
                  <p className="mb-0">
                    For assistance, please email us at <strong>mail@scalessindia12@gmail.com</strong> or WhatsApp <strong>+91 8848873343</strong>.
                    <br />
                    Please refer to the detailed Claim / Refund / Return process below to understand the steps to be followed and the timelines.
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

export default RefundPolicy;
