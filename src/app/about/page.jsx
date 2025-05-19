import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function about() {
  return (
    <>
    <Header/>
    {/* About Start */}
<section className="about-section-2 pad_top">
  <div className="container">
    <div className="row">
      <div className="col-lg-7">
        <div className="ab-thumb">
          <img src="assets/images/about2.png" alt="about" />
        </div>
      </div>
      <div className="col-lg-5">
        <div className="sub_title">About Us <span></span></div>
        <h2 className="sec_titles">Heard of betta fish before</h2>
        <p className="sec_desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est id leo luctus gravida a in ipsum. Vivamus vel molestie nisipsum. Vivamus vel moles
        </p>
        <ul className="listing-item">
          <li><i className="nss-check1"></i>Best Quality Product</li>
          <li><i className="nss-check1"></i>Vestibulum libero</li>
          <li><i className="nss-check1"></i>Quis velit adipiscing</li>
          <li><i className="nss-check1"></i>Integer posuere pulvinar</li>
        </ul>
        <a href="about.html" className="fishto-btn">Learn More</a>
      </div>
    </div>
  </div>
</section>
{/* About End */}

{/* Why Choose Us Start */}
<section className="choose-us-section" style={{ backgroundImage: "url(assets/images/1.png)" }}>
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2 className="sec_titles">Why Choose Us</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-4 col-md-6">
        <div className="icon-box-1 in_top">
          <i className="fishto-diving-gogglesfishto"></i>
          <h4>Largemouth Bass</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est id leo luctus gravida a in ipsum. Vivamus vel molestie nisi.
          </p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="icon-box-1 in_top">
          <i className="fishto-swordfishfishto"></i>
          <h4>Pescar Lubina</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est id leo luctus gravida a in ipsum. Vivamus vel molestie nisi.
          </p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="icon-box-1 in_top">
          <i className="fishto-earthwormfishto"></i>
          <h4>Causes & Prevention</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est id leo luctus gravida a in ipsum. Vivamus vel molestie nisi.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Why Choose Us End */}

{/* Mailchimp Start */}
<section className="mailchimp-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="mailchimp-area">
          <div className="row">
            <div className="col-lg-7 col-md-7">
              <div className="icon-box-1">
                <i className="nss-envelope2"></i>
                <h4>Subscribe Newsletter</h4>
                <p>Get latest updates and offers.</p>
              </div>
              <div className="newsletter-form">
                <form className="mc4wp-form" method="post">
                  <input type="email" name="EMAIL" placeholder="Email" required />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 text-right">
              <img src="assets/images/mail.png" alt="mail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Mailchimp End */}

{/* Gallery Start */}
<section className="gallery-section marg-gal">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2 className="sec_titles">Our Gallery</h2>
      </div>
    </div>
    <div className="row">
      <div className="gallery-slider owl-carousel">
        <div className="gallery-item">
          <img src="assets/images/g1.jpg" alt="" />
          <div className="gall-content">
            <h4>Redcap Oranda<br /> Goldfis</h4>
            <a
              className="popup"
              href="assets/images/g1.jpg"
              data-rel="lightcase:myCollection:slideshow"
            >
              +
            </a>
          </div>
        </div>
        <div className="gallery-item">
          <img src="assets/images/g2.jpg" alt="" />
          <div className="gall-content">
            <h4>Redcap Oranda<br /> Goldfis</h4>
            <a
              className="popup"
              href="assets/images/g2.jpg"
              data-rel="lightcase:myCollection:slideshow"
            >
              +
            </a>
          </div>
        </div>
        <div className="gallery-item">
          <img src="assets/images/g3.jpg" alt="" />
          <div className="gall-content">
            <h4>Redcap Oranda<br /> Goldfis</h4>
            <a
              className="popup"
              href="assets/images/g3.jpg"
              data-rel="lightcase:myCollection:slideshow"
            >
              +
            </a>
          </div>
        </div>
        <div className="gallery-item">
          <img src="assets/images/g4.jpg" alt="" />
          <div className="gall-content">
            <h4>Redcap Oranda<br /> Goldfis</h4>
            <a
              className="popup"
              href="assets/images/g4.jpg"
              data-rel="lightcase:myCollection:slideshow"
            >
              +
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Gallery End */}

{/* Client Start */}
<section className="client-section cs-2">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="client-slider owl-carousel">
          <a href="#"><img src="assets/images/logo/1.png" alt="logo" /></a>
          <a href="#"><img src="assets/images/logo/2.png" alt="logo" /></a>
          <a href="#"><img src="assets/images/logo/3.png" alt="logo" /></a>
          <a href="#"><img src="assets/images/logo/4.png" alt="logo" /></a>
          <a href="#"><img src="assets/images/logo/5.png" alt="logo" /></a>
          <a href="#"><img src="assets/images/logo/6.png" alt="logo" /></a>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Client End */}
<Footer/>
    </>
  )
}

export default about