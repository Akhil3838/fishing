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
          <p>8848873343</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="contact-box cb2">
          <i className="nss-envelope-open1"></i>
          <h5>Email</h5>
          <p>scalessindia12@gmail.com</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="contact-box cb3">
          <i className="nss-map-marker-alt1"></i>
          <h5>Address</h5>
          <small>First floor, KHRA BHAWAN, opp. biolab, Near old bustand Payyanur, Kannur [dist.], Kerala, PIN-670307</small>
        </div>
      </div>
    </div>

    <div className="row mt-60">
      <div className="col-md-6">
<div className="ci-info">
  <div className="sub_title">Get In Touch</div>
  <h2 className="sec_titles">
    We love to hear from you  connect with Scaless today
  </h2>
  <p className="sec_desc">
    At <strong>Scaless</strong>, we are passionate about bringing you the best 
    fishing gear and accessories to make every catch a memorable one. 
    Whether you are an experienced angler or just starting out, our team is 
    here to help you find the right equipment for your adventures.  
    Have questions, feedback, or special requests? Reach out to us and we are 
    always ready to assist fellow fishing enthusiasts.  
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