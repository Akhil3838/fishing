import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPriceDetailsApi, addToCartApi } from '../services/allApi';
import RazorpayEMIWidget from './RazorpayEMIWidget';
import { useRouter } from 'next/navigation';


function SingleProduct({ product, variants, onPriceChange }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [price, setPrice] = useState("");
    const [orgPrice, setOrgPrice] = useState("");
const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Convert image object to array
  const imagesArray = Object.values(product?.images || {});

  // buynow
  const [quantity, setQuantity] = useState(1);


    const handleBuyNow = async (product_id, sku_id,qty) => {
    const token = sessionStorage.getItem("token");
  
    // Generate browser_id if it doesn't exist
  
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("quantity",qty);
    formData.append("sku_id", sku_id);
    formData.append("cart_type","buy");

    const reqHeader = {};
    if (token) {
      reqHeader.Authorization = `Bearer ${token}`;
    }
  
    try {
      
      console.log(formData);
      
      const result = await addToCartApi(formData, reqHeader);
      console.log("buy Response:", result);
      if (result.status === 200) {
        const cartType=result?.data?.cartType
router.push(`/checkout?${cartType}`);
        // toast.success("Item added successfully!", {
        //   position: "top-center",
        //   autoClose: 3000,
        //   theme: "colored",
        // });
                // setTimeout(() => router.push('/cart'), 2000);
  
  
       
      }
       
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };


  // buy end

  const handleAddToCart = async (product_id, sku_id) => {
    const token = sessionStorage.getItem("token");

    if (!localStorage.getItem("browser_id")) {
      const browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem("browser_id", browserId);
    }
    const browserId = localStorage.getItem("browser_id");

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("quantity", 1);
    formData.append("sku_id", sku_id);
    formData.append("session_id", browserId);

    const reqHeader = {};
    if (token) {
      reqHeader.Authorization = `Bearer ${token}`;
    }

    try {
      const result = await addToCartApi(formData, reqHeader);
      if (result.status === 200) {
        toast.success("Item added to cart!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const groupedVariants = variants.reduce((acc, curr) => {
    if (!acc[curr.attribute_name]) {
      acc[curr.attribute_name] = [];
    }
    curr.variant_options.forEach(option => {
      acc[curr.attribute_name].push({
        id: option.id,
        name: option.option_name,
      });
    });
    return acc;
  }, {});

  // buynow
  // const [quantity, setQuantity] = useState(1);

// const handleBuyNow = (productId, skuId, qty) => {
  // Example: Save to session or redirect to checkout
  // console.log("Buying:", productId, skuId, qty);
  // Redirect to checkout or open payment modal
  // Example:
  // router.push(`/checkout?product=${productId}&sku=${skuId}&qty=${qty}`);
// };


const fetchPrice = async (selected) => {
  try {
    const variantIds = Object.values(selected);
    const reqBody = { variant_option_ids: variantIds };
    const response = await getPriceDetailsApi(reqBody);
    const fetchedPrice = response.data.sku?.special_price || "N/A";
    const orginalPrice = response.data.sku?.price || "N/A";

    setPrice(fetchedPrice);
    setOrgPrice(orginalPrice)

    // ✅ Immediately pass the correct value
    if (onPriceChange) {
      onPriceChange(response);
    }
  } catch (error) {
    console.error("Error fetching price details:", error);
    setPrice("N/A");
    onPriceChange && onPriceChange("N/A");
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

    if (Object.keys(groupedVariants).every(attr => updatedSelection[attr])) {
      fetchPrice(updatedSelection);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="row" style={{ paddingTop: '100px' }}>
<div className="col-lg-6 col-md-6">
  <div className="productSlide">
    {imagesArray.map((imageUrl, index) => (
      <div
        className={`sp_img ${index === currentSlide ? 'active' : ''}`}
        key={index}
        style={{ display: index === currentSlide ? 'block' : 'none' }}
      >
        <img src={imageUrl} alt={`product-${index}`} />
      </div>
    ))}
    <ul className="indicator-slider-vertical">
      {imagesArray.map((imageUrl, index) => (
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
        <div className="col-lg-6 col-md-6">
          <div className="product-decp">
            <h4>{product?.product_name}</h4>
           <div className="product_price clearfix d-flex align-items-center">
  {price ? (
    <>
      <span className="price text-dark fw-bold me-3">₹{price}</span>

      {/* Vertical line separator */}
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
              <hr/>
            </div>

            {Object.entries(groupedVariants).map(([attribute, options], index) => (
              <div className="product-variant mb-3" key={index}>
                <label className='mb-3'><strong>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}:</strong></label>
                <div className="variant-options">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleVariantSelect(attribute, option.id)}
                      className={`btn btn-outline-dark btn-sm ${selectedVariants[attribute] === option.id ? 'active' : ''}`}
                      style={{ marginRight: '10px' }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

<div className='d-flex flex-row align-items-center gap-3 flex-wrap'>
  <div className="listing-meta my-3 d-flex align-items-center border rounded px-2 py-2">
    <button
      className="btn btn-sm"
      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
    >
      −
    </button>
    <span className="mx-3 fw-bold">{quantity}</span>
    <button
      className="btn btn-sm"
      onClick={() => setQuantity(prev => prev + 1)}
    >
      +
    </button>
  </div>

  <div className="listing-meta my-3">
    <a
      className="add-to-cart rounded-1"
      href="/cart"
      onClick={() =>
        handleAddToCart(product.id, product.sku_new[0].id)
      }
    >
      Add To Cart
    </a>
  </div>
</div>

  {/* Buy Now Button */}
  <button
    className="btn btn-dark w-100 btn-lg mb-3"
    onClick={() => handleBuyNow(product.id, product.sku_new[0].id, quantity)}
  >
    <i className="fas fa-bolt me-2"></i>Buy Now
  </button>

            <div className="metatext">
              <span>Category:</span> <a href="#">{product?.category?.category_name}</a>
            </div>

            <div className="pd-share">
              <span>Share:</span>
              <div className="product-share">
                <a target="_blank" href="https://www.facebook.com/"><i className="nss-facebook-f"></i></a>
                <a target="_blank" href="https://twitter.com/"><i className="nss-whatsapp"></i></a>
              </div>
            </div>

            {/* {price && !isNaN(price) && (
              <div className="razorpay-widget border rounded p-3 mt-4 shadow-sm">
                <RazorpayEMIWidget amount={price * 100} />
              </div>
            )} */}
<div className="mt-4 p-3 border rounded bg-white text-center">
  <h6 className="fw-semibold mb-3">
    <i className="fas fa-lock me-2 text-dark"></i>
    Guaranteed Safe Checkout
  </h6>
  <div className="d-flex justify-content-center gap-3 flex-wrap align-items-center">
    <img src="https://furnistage.toscroll.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Famex.be442ffc.png&w=2048&q=75" alt="Amex" height="30" />
    <img src="https://furnistage.toscroll.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmastercard.a33e053d.png&w=2048&q=75" alt="MasterCard" height="30" />
    <img src="https://furnistage.toscroll.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frupay.2b439649.png&w=2048&q=75" alt="RuPay" height="30" />
    <img src="https://furnistage.toscroll.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvisa.21ba85e2.png&w=2048&q=75" alt="Visa" height="30" />
    <img src="https://furnistage.toscroll.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiscover.b14ae41f.png&w=1080&q=75" alt="Discover" height="30" />
  </div>
</div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
