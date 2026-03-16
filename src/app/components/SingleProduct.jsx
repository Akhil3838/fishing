import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPriceDetailsApi, addToCartApi, remainderApi } from '../services/allApi';
import { useRouter } from 'next/navigation';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';


function SingleProduct({ product, variants, onPriceChange }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [price, setPrice] = useState('');
  const [orgPrice, setOrgPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [skuId, setSkuId] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
const [zoomActive, setZoomActive] = useState(false);
  // const [colorImg, setColorImg] = useState('');
  const [variantImages, setVariantImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedVariants, setExpandedVariants] = useState({});
  const router = useRouter();

  const imagesArray = Object.values(product?.images || {});
console.log(product);

  const toggleExpandVariant = (attribute) => {
    setExpandedVariants(prev => ({
      ...prev,
      [attribute]: !prev[attribute]
    }));
  };

const handleBuyNow = async (product_id,sku_id, qty) => {
  const token = sessionStorage.getItem('token');
  
  // Redirect to login if no token
  if (!token) {
    router.push('/login');
    return; // Early return to avoid nesting
  }

  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('quantity', qty);
  formData.append('sku_id', sku_id);
  formData.append('cart_type', 'buy');

  const reqHeader = {
    ...(token && { Authorization: `Bearer ${token}` }) // Conditional header
  };

  try {
    const result = await addToCartApi(formData, reqHeader);
    console.log(result);
    
    if (result.status === 200) {
      const cartType = result?.data?.cartType || 'default'; // Fallback value
      router.push(`/checkout?${cartType}`);
    } 
    else if (result.status === 422) {
      toast.warning("Quantity limit exceeded!", {
        position: "bottom-center",
        autoClose: 1500,
      });
    } else {
      // Handle other status codes
      toast.error('Unexpected response from server', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    
    // More specific error messages based on error type
    const errorMessage = error.response?.data?.message 
      || 'Failed to add item to cart!';
    
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 3000,
      theme: 'colored',
    });
  }
};
  const handleAddToCart = async (product_id,sku_id,qty) => {
    const token = sessionStorage.getItem('token');

    if (!localStorage.getItem('browser_id')) {
      const browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem('browser_id', browserId);
    }
    const browserId = localStorage.getItem('browser_id');

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity',qty);
    formData.append('sku_id', sku_id);
    formData.append('session_id', browserId);

    const reqHeader = {};
    if (token) reqHeader.Authorization = `Bearer ${token}`;

    try {
      const result = await addToCartApi(formData, reqHeader);
      if (result.status === 200) {
        // toast.success('Item added to cart!', {
        //   position: 'top-center',
        //   autoClose: 3000,
        //   theme: 'colored',
        // });
       router.push('/cart');

      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  const groupedVariants = variants.reduce((acc, curr) => {
    if (!acc[curr.attribute_name]) acc[curr.attribute_name] = [];
    curr.variant_options.forEach(option => {
      acc[curr.attribute_name].push({ id: option.id, name: option.option_name ,stock:option.stock_status, image: option.images[0] });
    });
    return acc;
  }, {});

  const fetchPrice = async (selected) => {
    try {
      const variantIds = Object.values(selected);
      const reqBody = { variant_option_ids: variantIds };

      const response = await getPriceDetailsApi(reqBody);
      console.log('price status',response);
      
      const fetchedPrice = response.data.sku?.special_price || 'N/A';
      const originalPrice = response.data.sku?.price || 'N/A';
      const stock_status=response.data.sku?.stock_status || 'N/A';
      const sku_id=response.data.sku?.id || 'N/A';

      setPrice(fetchedPrice);
      setOrgPrice(originalPrice);
      setStockStatus(stock_status);
      setSkuId(sku_id);

const hasColor = Object.keys(selected).some(attr => attr.toLowerCase() === 'color');

if (hasColor && response.data.images && response.data.images.length > 0) {
  const imgs = response.data.images.map(img => img.image);
  setVariantImages(imgs);        // ✅ store all images
  setCurrentSlide(0);
} else {
  setVariantImages([]);
}
      if (onPriceChange) onPriceChange(response);
    } catch (error) {
      console.error('Error fetching price details:', error);
      setPrice('N/A');
      if (onPriceChange) onPriceChange('N/A');
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState('');

console.log(stockStatus);

const handleSubmit = async () => {
  if (!mobile || mobile.length < 10) {
    toast.warning('Please enter a valid mobile number', {
      position: 'bottom-center',
      autoClose: 2000,
    });
    return;
  }



  try {

    const formData = new FormData();
    formData.append('sku_id', skuId);
    formData.append('phone', mobile);


   const result = await remainderApi(formData);
   console.log(result);
   

    toast.success('You will be notified when product is back in stock 🔔', {
      position: 'bottom-center',
      autoClose: 2000,
    });

    setMobile('');
    setShowModal(false);
  } catch (error) {
    console.error('Remainder error:', error);

    toast.error('Failed to register reminder. Please try again.', {
      position: 'bottom-center',
      autoClose: 2000,
    });
  }
};

  useEffect(() => {
    const defaultSelection = {};
    for (const [attribute, options] of Object.entries(groupedVariants)) {
      if (options.length > 0) {
        defaultSelection[attribute] = options[0].id;
      }
    }
    setSelectedVariants(defaultSelection);

    if (Object.keys(groupedVariants).every(attr => defaultSelection[attr])) {
      fetchPrice(defaultSelection);
    }
  }, [variants]);

  const handleVariantSelect = (attribute, optionId) => {
    const updatedSelection = { ...selectedVariants, [attribute]: optionId };
    setSelectedVariants(updatedSelection);
      // Auto scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

    if (Object.keys(groupedVariants).every(attr => updatedSelection[attr])) {
      fetchPrice(updatedSelection);
    }
  };
const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setZoomPosition({ x, y });
  setZoomActive(true);
};

const handleMouseLeave = () => {
  setZoomActive(false);
};

const [isLargeScreen, setIsLargeScreen] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsLargeScreen(window.innerWidth >= 992); // lg breakpoint
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
const imagesToShow = variantImages.length > 0 ? variantImages : imagesArray;
  return (
    <>
      <div className="row" style={{ paddingTop: '100px' }}>
        <div className="col-lg-6 col-md-6">
          <div className="productSlide" style={{ paddingLeft: '75px' }}>
            {imagesToShow.map((imageUrl, index) => (
              <div
                className={`sp_img ${index === currentSlide ? 'active' : ''}`}
                key={index}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
 <div
    className="image-zoom-container"
    onMouseMove={isLargeScreen ? handleMouseMove : undefined}
    onMouseLeave={isLargeScreen ? handleMouseLeave : undefined}
  >
    <img
      src={imageUrl}
      alt={`product-${index}`}
      style={{
        transformOrigin: isLargeScreen
          ? `${zoomPosition.x}% ${zoomPosition.y}%`
          : "center",
        transform: isLargeScreen && zoomActive ? "scale(2)" : "scale(1)",
      }}
    />
  </div>  
              </div>
            ))}
            <ul className="indicator-slider-vertical">
              {imagesToShow.map((imageUrl, index) => (
                <li
                  key={index}
                  role="presentation"
                  className={index === currentSlide ? 'active' : ''}
                  onClick={() => goToSlide(index)}
                >
                  <img src={imageUrl} alt={`product-thumb-${index}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6 col-md-6" >
          <div className="product-decp">
            <h4>{product?.product_name}</h4>
            <div className="product_price clearfix d-flex align-items-center">
              {price ? (
                <>
                  <span className="price text-dark fw-bold me-3">₹{price}</span>
                  <span className="border-start mx-2" style={{ height: '19px' }}></span>
                  <small className="ms-3">
                    <del className="text-muted">₹{orgPrice}</del>
                  </small>
                </>
              ) : (
                <span className="price text-dark fw-bold">₹{orgPrice}</span>
              )}
            </div>

            <div className="ratings">
              <i className="icon_star_alt"></i><i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i><i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i><span>( 1 )</span>
            </div>

            <div className="excerpt mb-3">
              <p>{product?.short_description}</p>
              <hr />
{stockStatus === 'out-of-stock' && <div
  style={{
    backgroundColor: '#ffdecdff',
    border: '1px solid #ffeeba',
    color: '#856404',
    padding: '12px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    marginTop: '10px',
  }}
>
  <i
    className="fa-solid fa-box-open"
    style={{ fontSize: '18px' }}
  ></i>

  <p style={{ margin: 0 }}>
    This product is currently <strong>out of stock</strong>
  </p>

  {/* Right side button */}
  {/* Notify Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginLeft: 'auto',
          backgroundColor: '#341b86ff',
          border: 'none',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Notify Me 🔔
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '320px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <h4 style={{ marginBottom: '10px' }}>
              Get Notified 🔔
            </h4>

            <p style={{ fontSize: '14px', color: '#666' }}>
              Enter your mobile number and we’ll notify you when it’s back in stock.
            </p>

            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                marginTop: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '15px',
                gap: '10px',
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#341b86ff',
                  border: 'none',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

}
            </div>

            {Object.entries(groupedVariants).map(([attribute, options], index) => {
              const isExpanded = expandedVariants[attribute];
              const displayOptions = isExpanded ? options : options.slice(0, 6);
              const hasMoreOptions = options.length > 6;
console.log(displayOptions);
console.log(groupedVariants);


              return (
                <div className="product-variant mb-3" key={index}>
                  <label className="mb-3"><strong>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}:</strong></label>
                  <div className="variant-options">
                  {displayOptions.map(option => {

  // COLOR VARIANT
if (attribute.toLowerCase() === "color" && option.image) {
  return (
    <div
      key={option.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
      onClick={() => handleVariantSelect(attribute, option.id)}
    >
      {/* Image Circle */}
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          overflow: "hidden",
          border:
            selectedVariants[attribute] === option.id
              ? "2px solid black"
              : "1px solid #ddd",
          position: "relative",
        }}
      >
        <img
          src={option.image}
          alt={option.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* OUT OF STOCK CROSS */}
        {option.stock === "out-of-stock" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="red"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </div>
        )}
      </div>

      {/* Option Name */}
      <span
        style={{
          fontSize: "12px",
          marginTop: "5px",
          textAlign: "center",
        }}
      >
        {option.name}
      </span>
    </div>
  );
}
  // OTHER VARIANTS
  return (
    <button
      key={option.id}
      onClick={() => handleVariantSelect(attribute, option.id)}
      className={`btn btn-outline-dark mt-1 btn-sm ${
        selectedVariants[attribute] === option.id ? "active" : ""
      }`}
      style={{ marginRight: "10px", marginBottom: "5px" }}
    >
      {option.name.toUpperCase()}
    </button>
  );
})}
                    {hasMoreOptions && (
                      <button
                        onClick={() => toggleExpandVariant(attribute)}
                        className="btn btn-link btn-sm mt-1"
                        style={{ textDecoration: 'none', color: '#0e5acdff' }}
                      >
                        {isExpanded ? 'See Less' : 'See More...'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

{stockStatus === 'in-stock' &&<>
              <div className="d-flex flex-row align-items-center gap-3 flex-wrap">
                <div className="listing-meta my-3 d-flex align-items-center border rounded px-2 py-2">
                  <button className="btn btn-sm" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>−</button>
                  <span className="mx-3 fw-bold">{quantity}</span>
                  <button className="btn btn-sm" onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
  
                <div className="listing-meta my-3">
                  <a
                    className="add-to-cart rounded-1"
                    href="/cart"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product.id, product.sku_new[0].id,quantity);
                    }}
                  >
                    Add To Cart
                  </a>
                </div>
              </div>
  
              <button
                className="btn btn-dark w-100 btn-lg mb-3"
                onClick={() => handleBuyNow(product.id, product.sku_new[0].id, quantity)}
              >
                <i className="fas fa-bolt me-2"></i>Buy Now
              </button>
  
</>
}<div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
  {/* Left Side: Category */}
  <div className="metatext d-flex align-items-center gap-2">
    <span>Category:</span>
    <a href="#">{product?.category?.category_name}</a>
  </div>

  {/* Right Side: Share Products */}
  <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
    <div
      className="rounded d-flex justify-content-center align-items-center"
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
      }}
    >
      <i className="nss-share" style={{ fontSize: '18px' }}></i>
    </div>
   <Link href={''}> <h6 className="mb-0 share-text">Share Products</h6></Link>
  </div>
</div>

<hr />
            <div className="mt-4 p-3 border rounded bg-white text-center">
              <h6 className="fw-semibold mb-3">
                <i className="fas fa-lock me-2 text-dark"></i>
                Guaranteed Safe Checkout
              </h6>
              <div className="d-flex justify-content-center gap-3 flex-wrap align-items-center">
                <img src="/assets/images/amex.webp" alt="Amex" height="30" />
                <img src="/assets/images/card2.webp" alt="MasterCard" height="30" />
                <img src="/assets/images/card3.webp" alt="RuPay" height="30" />
                <img src="/assets/images/card4.webp" alt="Visa" height="30" />
                <img src="/assets/images/card5.webp" alt="Discover" height="30" />
              </div>
            </div>
          </div>
        </div>
      </div>
            <ToastContainer />

    </>
  );
}

export default SingleProduct;