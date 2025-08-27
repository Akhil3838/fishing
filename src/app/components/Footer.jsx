import React from 'react'

function Footer() {
  return (
    <>
    {/* <!-- Footer Start --> */}
<footer className="footer">
    <a href="https://www.shiprocket.in/shipment-tracking/" target="_blank" className="track-float">
  <h6 className='mt-3 text-light'>Track Order</h6>
</a>

     <a href="https://wa.me/+918848873343" target="_blank">
            <img className="whatsapp-float" src="/assets/images/msg.png"/>
       </a>
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-6">
                <aside className="widget">
                    <div className="about-widget">
                        <a href="index.html">  <img src="assets/images/logo/log2.png" alt="" />
                        </a>
                        <p>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit. Duis at<br /> est id leo luctus gravida a in ipsum.</p>
<div className="ab-social">
    <a className="fa" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=61577220032117&rdid=15NsuVd0hjHZXVGF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GMLnqMaui%2F#">
        <i className="fa-brands fa-facebook-f"></i>
    </a>
    <a className="tw" target="_blank" rel="noopener noreferrer" href="https://wa.me/+918848873343">
        <i className="fa-brands fa-whatsapp"></i>
    </a>
    <a className="yo" target="_blank" rel="noopener noreferrer" href="https://youtube.com/">
        <i className="fa-brands fa-youtube"></i>
    </a>
    <a className="in" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/scalesstackle?igsh=cmM1M">
        <i className="fa-brands fa-instagram"></i>
    </a>
</div>                    </div>
                </aside>
            </div>
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
                        {/* <li><a href="index-2.html">News</a></li> */}
                    </ul>
                </aside>
            </div>
            <div className="col-lg-3 col-md-6">
                <aside className="widget">
                    <h3 className="widget-title">Why Buy From Us</h3>
                    <ul>
                        <li><a href="/shopping">Shipping & Delivery</a></li>
                        {/* <li><a href="index-2.html">Secure Payment</a></li> */}
                        
                        <li><a href="/">Services</a></li>
                        {/* <li><a href="index-2.html">Returns</a></li> */}
                    </ul>
                </aside>
            </div>
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
        {/* <!-- Copryrgint Start --> */}
        <div className="row">
            <div className="col-lg-12">
                <div className="copyright text-center">
                    <p>© 2025 <a href="https://psdtowpwork.com/">Scaless</a> All rights reserved.</p>
                </div>
            </div>
        </div>
        {/* <!-- Copryrgint End --> */}
    </div>
</footer>
{/* <!-- Footer End --> */}

    </>
  )
}

export default Footer