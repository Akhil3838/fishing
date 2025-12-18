"use client";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import CategoryHome from "./components/CategoryHome";
import Newproducts from "./components/Newproducts";
import { useEffect, useState , useRef } from "react";
import {  newCategoryApi } from "./services/allApi";
import Hotproduct from "./components/Hotproduct";
import VideoBanner from "./components/VideoBanner";
import Offer from "./components/Offer";
import Gallery from "./components/Gallery";
import Brands from "./components/Brands";
import AboutSection from "./components/AboutSection";



export default function Home() {
const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const audioRef = useRef(null); // Reference for audio element
  const [isPlaying, setIsPlaying] = useState(true);
   const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
    useEffect(() => {
    if (isMobile) {
      // pause music automatically on mobile
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await newCategoryApi();
        const categories = result.data.data || [];
        console.log(result);
        
        setCategory(categories);
        
        if (categories.length > 0) {
          setActiveCategory(categories[0].slug);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isReloaded = sessionStorage.getItem('hasReloaded');
      if (!isReloaded) {
        sessionStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }
    }
  }, []);
  
  // Audio control effect
  useEffect(() => {
    if (audioRef.current) {
      // Modern browsers require interaction before playing audio
      // So we'll try to play, but catch any errors
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
          // You might want to show a play button instead
        });
      }
    }
  }, []);
  return (
    <>
     {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        loop
        src="/assets/catch.mp3" // Replace with your audio file path
      />
      
    {/* <Tophead/> */}
    <Header/>



{/* {/* <!-- Hero Banner Start --> */}
<Banner/>
{/* <!-- Banner End --> */}

<section className="discount-section-2">
  {/* <div className="container">
    <div className="row">
      <div className="col-lg-8">
        <div className="discount-product overlay-anim">
          <div className="content-ds">
            <h3>
              <span>Hurry Up</span>
              Deal of the Day
            </h3>
            <p>
              Lorem ipsum dolor sit amet, onsectetur<br /> adipiscing elituis leo luctus
            </p>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>340.00
                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>230.00
                  </span>
                </ins>
              </span>
            </div>
            <a className="fishto-btn" href="single-product.html">Buy Now</a>
          </div>
          <div className="ds-thumb">
            <img src="assets/images/d1.png" alt="image" />
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="offser-text">
          <h3>Sale<span>only today</span>50% off</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est id leo luctus</p>
        </div>
      </div>
    </div>
  </div> */}
</section>


{/* Category Start */}
<section className="category-section-2">
  {/* <div className="container">

    <CategoryHome/>
  </div> */}
</section>
{/* Category End */}

{/* <!-- new Product Start --> */}
<section className="product-section-2 mt-4">
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2 className="sec_titles">New Products</h2>
      </div>
    </div>

    <div className="row category-scroll d-flex justify-content-center text-center mt-4 mx-auto">
      {category.length > 0 ? (
        category.map((item) => (
          <div
            key={item.id || item.slug}
            className="col-4 col-sm-3 col-md-2 mb-4 d-flex flex-column align-items-center"
          >
            <div
              className={`category-circle ${
                activeCategory === item.slug ? "active" : ""
              }`}
              onClick={() => setActiveCategory(item.slug)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.icon || "/default-category.jpg"} // fallback image
                alt={item.category_name}
                className="img-fluid rounded-circle shadow-lg p-3 border border-2"
              />
            </div>
            <h5
              className={`mt-2 text-center text-wrap ${
                activeCategory === item.slug ? "active-name" : ""
              }`}
            >
              {item.category_name}
            </h5>
          </div>
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>

    <Newproducts activeCategory={activeCategory} />
  </div>
</section>
   {/* <!-- Product End --> */}
   <div>
    <VideoBanner/>
   </div>

        {/* <!-- About Start --> */}
{/* <section className="about-section" style={{marginTop:'70px'}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-md-6">
                <div className="ab-thumb ">
                    <img src="assets/images/about/about2.jpg" alt="about" style={{borderRadius:'15px'}} />
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="sub_title">About Us <span></span></div>
                <h2 className="sec_titles">Know About Scaless products and collections</h2>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="icon-box-1">
                            <i className="fishto-diving-gogglesfishto"></i>
                            <h4>Jhinga Shrimp</h4>
                            <p>Jhinga is a proven shrimp lure, known for delivering exceptional results with monster catches.
It has consistently landed huge Mangrove jacks, groupers and massive snappers. Built with high performance elasticity and tough construction, this shrimp is engineered to perfection for extreme performance in Indian waters.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="icon-box-1">
                            <i className="fishto-swordfishfishto"></i>
                            <h4>Scaless Bags</h4>
                            <p>Keep your fishing gear organized and protected with Scaless Fishing’s premium range of accessories. Safely store your lures and hooks in the Scaless fishing lure box, featuring 16 spacious compartments and 6 dedicated hook boxes. Secure your rods with the Scaless fishing rod strap, available in blue or white, and protect your reels with the economy fishing reel pouch.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="icon-box-1">
                            <i className="fishto-reel1fishto"></i>
                            <h4>Scaless Gal Hooks</h4>
                            <p>The Scaless worm hook jighead delivers exceptional action for your shads, boosting your hook-up ratio. Built with extra-sharp high-strength hooks, it’s ideal for both freshwater and saltwater fishing. Perfect for anglers using soft plastics or shrimp, this jighead combines durability, precision, and performance to exceed expectations on every cast.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="icon-box-1">
                            <i className="fishto-earthwormfishto"></i>
                            <h4>Scaless Accessories</h4>
                            <p>Designed to prevent damage by securely strapping rod pieces together. Protect your gear effortlessly with our rod piece straps. Meet the ultimate necessity of preventing line release from the spool. Keep your fishing experience seamless and hassle-free with our innovative solution.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
 */}
<AboutSection/>
{/* <!-- About End --> */}

{/* <!-- Client Start --> */}
{/* Client Start */}
<section className="client-section cs-2">
  <div className="container">
    <Brands/>
  </div>
</section>
{/* Client End */}
{/* <!-- Client End --> */}




{/* <!-- Discount Start --> */}
<section
  className="discount-section-3"
  style={{ backgroundImage: 'url(assets/images/1.png)' }}
>
  <Offer/>
</section>
{/* <!-- Discount End --> */}


{/* <!-- Hot Start --> */}
<section className="hot-product-section">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <h2 className="sec_titles">Hot Item</h2>
            </div>
            <div className="col-md-6 text-end">
                <a href="/shopping" className="fishto-btn">View all products <i className="nss-long-arrow-right1"></i></a>
            </div>
        </div>


<Hotproduct/>


    </div>
</section>
{/* <!-- Hot End --> */}

{/* <!-- Gallery Start --> */}
<section className="gallery-section">
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 text-center">
                <h2 className="sec_titles">Our Gallery</h2>
            </div>
        </div>
        <Gallery/>
    </div>
</section>
{/* <!-- Gallery End --> */}

{/* <!-- Blog Start --> */}
<section className="post-section">
    {/* <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h2 className="sec_titles">Latest Posts</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="blog-item-2">
                    <div className="bp-thumb">
                        <img src="assets/images/b11.jpg" alt="image" />
                    </div>
                    <div className="bp-details">
                        <a href="single-blog.html" className="date"><span>calendar</span> 21 Dec. 2019</a>
                        <div className="bp-meta">
                            <p><span>user</span> By <a href="#">Admin</a></p>
                            <p><span>comment</span> <a href="#">2 Comments</a></p>
                        </div>
                        <h3><a href="single-blog.html">How To Pick the Best Spinnerbait Blade for Bass in Any Conditions</a></h3>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="blog-item-2">
                    <div className="bp-thumb">
                        <img src="assets/images/b22.jpg" alt="image" />
                    </div>
                    <div className="bp-details">
                        <a href="single-blog.html" className="date"><span>calendar</span> 21 Dec. 2019</a>
                        <div className="bp-meta">
                            <p><span>user</span> By <a href="#">Admin</a></p>
                            <p><span>comment</span> <a href="#">2 Comments</a></p>
                        </div>
                        <h3><a href="single-blog.html">21 of the Best Colleges for Hunters and Anglers</a></h3>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="blog-item-2">
                    <div className="bp-thumb">
                        <img src="assets/images/b33.jpg" alt="image" />
                    </div>
                    <div className="bp-details">
                        <a href="single-blog.html" className="date"><span>calendar</span> 21 Dec. 2019</a>
                        <div className="bp-meta">
                            <p><span>user</span> By <a href="#">Admin</a></p>
                            <p><span>comment</span> <a href="#">2 Comments</a></p>
                        </div>
                        <h3><a href="single-blog.html">The Obsessive Cult of Microfishing Life-Listers</a></h3>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
</section>
{/* <!-- Blog End --> */}

<div className="container py-5">
  {/* Modern Background Music Controls */}
  <div className=" music my-4 d-flex">
    <div className="bg-glas p-3 rounded-pill shadow-sm border border-2" style={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }}>
      {!isPlaying ? (
        <button
          onClick={() => {
            audioRef.current.play();
            setIsPlaying(true);
          }}
          className="btn btn-icon rounded-circle p-3 bg-gradient-success "
          aria-label="Play music"
          style={{
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
          }}
        >
          <i className="fas fa-music fa-lg" style={{
            animation: isPlaying ? 'pulse 1.5s infinite' : 'none'
          }}/>
        </button>
      ) : (
        <button
          onClick={() => {
            audioRef.current.pause();
            setIsPlaying(false);
          }}
          className="btn btn-icon rounded-circle p-3 bg-gradient-danger"
          aria-label="Mute music"
          style={{
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
          }}
        >
          <i className="fas fa-volume-up fa-lg"/>
        </button>
      )}
      
      {/* Optional volume slider */}
      {/* <div className="d-inline-flex align-items-center ms-3" style={{width: '100px'}}>
        <input 
          type="range" 
          className="form-range" 
          min="0" 
          max="1" 
          step="0.01"
          defaultValue="0.7"
          onChange={(e) => audioRef.current.volume = e.target.value}
          style={{
            accentColor: '#09ae00ff',
            cursor: 'pointer',
            height:'10px'
          }}
        />
      </div> */}


    </div>
  </div>
</div>     

 <Footer/>
    </>
  );
}
