import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function contact() {
  return (
    <>
    <Header/>
            {/* <!-- Gamps Start --> */}
        <div className="fishto-map grayscale">
            <iframe src="https://www.google.com/maps/embed/v1/place?q=West+Englewood+Chicago,+IL+60636+USA&amp;key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
        </div>
        {/* <!-- Gamps Start --> */}

        <section className="contact-setion">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4">
        <div className="contact-box">
          <i className="nss-phone1"></i>
          <h5>Phone</h5>
          <p>212-333-4633</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="contact-box cb2">
          <i className="nss-envelope-open1"></i>
          <h5>Email</h5>
          <p>Yourname@gmail.com</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="contact-box cb3">
          <i className="nss-map-marker-alt1"></i>
          <h5>Address</h5>
          <p>Ultrices tristique</p>
        </div>
      </div>
    </div>

    <div className="row mt-60">
      <div className="col-md-6">
        <div className="ci-info">
          <div className="sub_title">Get In Touch</div>
          <h2 className="sec_titles">
            We love to hear from you feel free to get in touch
          </h2>
          <p className="sec_desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="contact-form">
          <form action="#" method="post" id="contact-form">
            <input type="text" name="con_name" className="required" placeholder="Your Name" />
            <input type="email" name="con_email" className="required" placeholder="Your E-mail" />
            <input type="text" name="con_subject" placeholder="Subject" />
            <textarea name="con_message" className="required" placeholder="Your Message"></textarea>
            <input type="submit" value="Send Message" />
            <img src="assets/images/ajax.gif" alt="ajax" className="fisto_loader" />
            <div className="fisto_con_message"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<Footer/>
    </>
  )
}

export default contact