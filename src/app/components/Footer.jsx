import React from 'react'

function Footer() {
  return (
    <>
    {/* <!-- Footer Start --> */}
<footer className="footer">
     <a href="https://wa.me/+919946901506" target="_blank">
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
    <a className="fa" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
        <i className="fa-brands fa-facebook-f"></i>
    </a>
    <a className="tw" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">
        <i className="fa-brands fa-x-twitter"></i>
    </a>
    <a className="yo" target="_blank" rel="noopener noreferrer" href="https://youtube.com/">
        <i className="fa-brands fa-youtube"></i>
    </a>
    <a className="in" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/">
        <i className="fa-brands fa-instagram"></i>
    </a>
    <a className="ti" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/">
        <i className="fa-brands fa-tiktok"></i>
    </a>
</div>                    </div>
                </aside>
            </div>
            <div className="col-lg-2 col-md-6">
                <aside className="widget">
                    <h3 className="widget-title">Useful Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/profile">User</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/blog">Blog</a></li>
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
                        <li><a href="/">Support</a></li>
                        <li><a href="/shopping">Stores</a></li>
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