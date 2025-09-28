'use client';
import React, { useEffect, useState } from 'react'
import { bannerApi } from '../services/allApi'

function Footer() {
  const [link, setLink] = useState([])

  const handleLink = async () => {
    try {
      const res = await bannerApi()
      console.log(res.data.settings)
      setLink(res.data.settings)
    } catch (error) {
      console.error("Error fetching footer links:", error)
    }
  }

  useEffect(() => {
    handleLink()
  }, [])

  // helper function to get value by label
  const getValue = (label) => {
    const item = link.find((i) => i.label === label)
    return item ? item.value : ""
  }

  return (
    <>
      {/* <!-- Footer Start --> */}
      <footer className="footer">
        <a
          href="https://www.shiprocket.in/shipment-tracking/"
          target="_blank"
          className="track-float"
          rel="noopener noreferrer"
        >
          <h6 className="mt-3 text-light">Track Order</h6>
        </a>

        {/* WhatsApp Floating Button */}
        <a href={`https://wa.me/${getValue("whatsapp_no")}`} target="_blank" rel="noopener noreferrer">
          <img className="whatsapp-float" src="/assets/images/msg.png" alt="whatsapp" />
        </a>

        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-lg-4 col-md-6">
              <aside className="widget">
                <div className="about-widget">
                  <a href="/">
                    <img src="assets/images/logo/log2.png" alt="Scaless Logo" />
                  </a>
                 <p>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit. Duis at<br /> est id leo luctus gravida a in ipsum.</p>
                  <div className="ab-social">
                    <a className="fa" target="_blank" rel="noopener noreferrer" href={getValue("facebook")}>
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a className="tw" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${getValue("whatsapp_no")}`}>
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a className="yo" target="_blank" rel="noopener noreferrer" href={getValue("youtube")}>
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a className="in" target="_blank" rel="noopener noreferrer" href={getValue("instagram1")}>
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-6">
              <aside className="widget">
                <h3 className="widget-title">Useful Links</h3>
                <ul>
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms of Service</a></li>
                  <li><a href="/about">About us</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="/shippingPolicy">Shipping Policy</a></li>
                  <li><a href="/refundPolicy">Refund Policy</a></li>
                </ul>
              </aside>
            </div>

            {/* Why Buy From Us */}
            <div className="col-lg-3 col-md-6">
              <aside className="widget">
                <h3 className="widget-title">Why Buy From Us</h3>
                <ul>
                  <li><a href="/shopping">Shipping & Delivery</a></li>
                  <li><a href="/">Services</a></li>
                </ul>
              </aside>
            </div>

            {/* Subscribe Section */}
            <div className="col-lg-3 col-md-6">
              <aside className="widget widget_mc4wp_form_widget">
                <h3 className="widget-title">Subscribe</h3>
                <form className="mc4wp-form" method="post">
                  <input type="email" name="EMAIL" placeholder="Email" required />
                  <input type="submit" value="Subscribe" />
                </form>
              </aside>
              <p>Get the latest updates via email. Any time you may unsubscribe</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright text-center">
                <p>© 2025 <a href="/">Scaless</a> All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer End --> */}
    </>
  )
}

export default Footer
