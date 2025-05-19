import React from 'react'

function Tophead() {
  return (
    <>
    {/* <!-- Topbar Start --> */}
<section className="topbar tp-two">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-8">
        <div className="topinfo">
          <p>
            <i className="icon_mail_alt"></i>
            <a href="mailto:info@website.com">info@website.com</a>
          </p>
          <p>
            <i className="nss-phone2"></i>+ 124 569 89 09
          </p>
        </div>
      </div>
      <div className="col-md-4">
        <ul className="topsocial">
          <li>
            <a target="_blank" href="https://www.facebook.com/">
              <i className="nss-facebook-f"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/">
              <i className="nss-twitter"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.google.com/">
              <i className="nss-google-plus-g"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.instagram.com/">
              <i className="nss-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
{/* <!-- Topbar End --> */}

    </>
  )
}

export default Tophead