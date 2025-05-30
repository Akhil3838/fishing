import { addResponseContext } from '@/app/context/Contextshare';
import { addToCartApi } from '@/app/services/allApi'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ProductListItem = ({ product }) => {
  const {setAddcartResponse} =useContext(addResponseContext)
  
  const handleAddToCart = async (product_id, sku_id) => {
    const token = sessionStorage.getItem("token");
  
    // Generate browser_id if it doesn't exist
    if (!localStorage.getItem("browser_id")) {
      const browserId = Date.now() + Math.random().toString(36).substr(2, 10);
      localStorage.setItem("browser_id", browserId);
    }
    const browserId = localStorage.getItem("browser_id");
    console.log(browserId);
    
  
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
      
      console.log(formData);
      
      const result = await addToCartApi(formData, reqHeader);
      console.log("Cart Response:", result);
      if (result.status === 200) {
            setAddcartResponse(result.data)
  
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
  
  return (
    <div className="product-list-view">
      <div className="row">
        <div className="col-lg-4 col-md-5">
          <div className="product-thumb">
            <img src={product.icon} alt="product" />
          </div>
        </div>
        <div className="col-lg-8 col-md-7">
          <div className="product-details">
            <h5> <Link href={`/productDetails/${product?.slug}`}>
            {product?.product_name}
          </Link></h5>
            <div className="ratings">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="icon_star_alt"></i>
              ))}
              <span>( 1 )</span>
            </div>
            <div className="product_price clearfix">
              <span className="price"><span><span>$</span>{product?.sku_new[0].special_price.toFixed(2)}</span></span>
            </div>
            <p>{product.short_description}</p>
            <div className="listing-meta">
              <a className="add-to-cart" href=""  onClick={() => handleAddToCart(product.id, product.sku_new
[0].id)}
><i className="nss-shopping-cart1"></i>Add To Cart</a>
               <Link  className="view" href={`/productDetails/${product?.slug}`}>
          <i className="nss-eye1"></i>
          </Link>
              {/* <a href="single-product.html" className="view"></a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem