import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function blog() {
  return (
    <>
    <Header/>
    {/* Blog Section Start */}
<section className="blogpage-section">
  <div className="container">
    <div className="row">
      {[
        {
          img: "assets/images/blog/1.jpg",
          title: "Dunc porta semper lacus a varius",
        },
        {
          img: "assets/images/blog/2.jpg",
          title: "Dolor tellus malesuada semper",
        },
        {
          img: "assets/images/blog/3.jpg",
          title: "Vel condimentum diam varius",
        },
        {
          img: "assets/images/blog/4.jpg",
          title: "Mauris velit dapibus nonumyporta",
        },
        {
          img: "assets/images/blog/5.jpg",
          title: "Vacation Ideas and Summer Fishing Trips",
        },
        {
          img: "assets/images/blog/6.jpg",
          title: "Overfishing Biologists Warn Fishermen",
        },
      ].map((blog, index) => (
        <div key={index} className="col-lg-4 col-md-6">
          <div className="blog-item-3 grid-view">
            <div className="bi-thumb">
              <img src={blog.img} alt="blog" />
            </div>
            <div className="bi-details">
              <h3><a href="single-blog.html">{blog.title}</a></h3>
              <div className="bi-meta">
                <span><i className="nss-user1"></i><a href="#">Jacob Stewart</a></span>
                <span><i className="nss-comments1"></i>Comments (05)</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="row">
      <div className="col-lg-12 fishto-pagination">
        <a className="next" href="#"><i className="nss-chevron-left1"></i></a>
        <span className="current">1</span>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">...</a>
        <a href="#">10</a>
        <a className="next" href="#"><i className="nss-chevron-right1"></i></a>
      </div>
    </div>
  </div>
</section>
{/* Blog Section End */}
<Footer/>
    </>
  )
}

export default blog