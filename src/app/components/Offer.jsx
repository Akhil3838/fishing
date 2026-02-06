import React, { useEffect, useState } from 'react'
import { OfferproductApi } from '../services/allApi'
import { useRouter } from 'next/navigation'   // for navigation
import { toast } from 'react-toastify'

// Import your functions here (or define them inside this component)
import { addToCartApi } from '../services/allApi'
import Link from 'next/link'

function Offer() {
  const [products, setProducts] = useState([])
  const router = useRouter()

  // Fetch Offer Products
  const Hotproducts = async () => {
    const result = await OfferproductApi()
    setProducts(result.data.products)
  }

  useEffect(() => {
    Hotproducts()
  }, [])
console.log(products);

  // ✅ Buy Now Function
  const handleBuyNow = async (product_id, sku_id, qty) => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', qty);
    formData.append('sku_id', sku_id);
    formData.append('cart_type', 'buy');

    const reqHeader = {
      ...(token && { Authorization: `Bearer ${token}` })
    };


    try {
      const result = await addToCartApi(formData, reqHeader);
      if (result.status === 200) {
        const cartType = result?.data?.cartType || 'default';
        router.push(`/checkout?${cartType}`);
      } else if (result.status === 422) {
        toast.warning("Quantity limit exceeded!", { position: "bottom-center", autoClose: 1500 });
      } else {
        toast.error('Unexpected response from server', { position: 'top-center', autoClose: 3000, theme: 'colored' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart!';
      toast.error(errorMessage, { position: 'top-center', autoClose: 3000, theme: 'colored' });
    }
  };

  // ✅ Add To Cart Function
  const handleAddToCart = async (product_id, sku_id, qty) => {
    const token = sessionStorage.getItem('token');
    
    if (!localStorage.getItem('browser_id')) {
      const browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem('browser_id', browserId);
    }
    const browserId = localStorage.getItem('browser_id');

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', qty);
    formData.append('sku_id', sku_id);
    formData.append('session_id', browserId);

    const reqHeader = {};
    if (token) reqHeader.Authorization = `Bearer ${token}`;

    try {
      const result = await addToCartApi(formData, reqHeader);
      if (result.status === 200) {
        toast.success('Item added to cart!', { position: 'top-center', autoClose: 2000, theme: 'colored' });
        router.push('/cart');
      }
    } catch (error) {
      toast.error('Failed to add item to cart!', { position: 'top-center', autoClose: 3000, theme: 'colored' });
    }
  };
    
  return (
    <>
      <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2 className="sec_titles">Deals & Offer</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 col-md-12">
        <div className="discount-product overlay-anim">
          <div className="content-ds">
            <h3>
              <span>Hurry Up</span>
              Deal of the Day
            </h3>
            <p>
              {products[0]?.product_name}
            </p>
<small className="two-line-text">{products[0]?.short_description}</small>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[0]?.sku_new[0]?.price}

                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[0]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <button
                className="fishto-btn"
                onClick={() => handleBuyNow(products[0]?.id, products[0]?.sku_new[0]?.id, 1)}
              >
                Buy Now
              </button>   
                     </div>
          <div className="ds-thumb">
           <a href={`/productDetails/${products[0]?.slug}`}> <img src={products[0]?.icon} alt="image"  className="offer-img" /></a>
          </div>
        </div>
      </div>

      {/* Product Item 1 */}
      <div className="col-lg-3 col-md-6 ">
        <div className="product-item-2 text-center">
          <div className="product-thumb">
           <a href={`/productDetails/${products[1]?.slug}`}> <img src={products[1]?.icon} alt="image"  className="offer-img" /></a>
          </div>
          <div className="product-details">
            <h5><a href={`/productDetails/${products[1]?.slug}`}>{products[1]?.product_name}</a></h5>
            <div className="ratings">
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[1]?.sku_new[0]?.price}
                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[1]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <div className="product-meta">
              {/* <a href="" className="view"><i className="nss-eye1" ></i></a> */}
              {/* <a href="wishlist.html" className="whishlist"><i className="nss-heart1"></i></a> */}
               {/* <button
                  className="cart"
                  onClick={() => handleAddToCart(products[1]?._id, products[1]?.sku_new[0]?._id, 1)}
                >
                  <i className="nss-shopping-cart1"></i>
                </button> */}
                 <button
                className="fishto-btn"
                onClick={() => handleBuyNow(products[0]?.id, products[0]?.sku_new[0]?.id, 1)}
              >
                Buy Now
              </button> 
            </div>
          </div>
        </div>
      </div>

      {/* Product Item 2 */}
      <div className="col-lg-3 col-md-6">
        <div className="product-item-2 text-center">
          <div className="product-thumb">
           <a href={`/productDetails/${products[2]?.slug}`}> <img src={products[2]?.icon} alt="image"  className="offer-img" /></a>
          </div>
          <div className="product-details">
            <h5><a  href={`/productDetails/${products[2]?.slug}`}>{products[2]?.product_name}</a></h5>
            <div className="ratings">
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <i className="icon_star_alt"></i>
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[2]?.sku_new[0]?.price}
                  </span>
                </del>
                <ins>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₹</span>{products[2]?.sku_new[0]?.special_price}
                  </span>
                </ins>
              </span>
            </div>
            <div className="product-meta">
              {/* <a href="single-product.html" className="view"><i className="nss-eye1"></i></a> */}
              {/* <a href="wishlist.html" className="whishlist"><i className="nss-heart1"></i></a> */}
              {/* <a href="cart.html" className="cart"><i className="nss-shopping-cart1"></i></a> */}

               <button
                className="fishto-btn"
                onClick={() => handleBuyNow(products[0]?.id, products[0]?.sku_new[0]?.id, 1)}
              >
                Buy Now
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default Offer