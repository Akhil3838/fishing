import React, { useState, useEffect } from 'react';
import { getPriceDetailsApi } from '../services/allApi';

function SingleProduct({ product, variants }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // add to cart
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
  
  // Group variant options by attribute_name
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

  // Fetch price from your API
  const fetchPrice = async (selected) => {
    try {
      const variantIds = Object.values(selected);
      const reqBody = { variant_option_ids: variantIds };
      const response = await getPriceDetailsApi(reqBody);
      setImg(response.data);
      
      
      setPrice(response.data.sku?.special_price || "N/A");
    } catch (error) {
      console.error("Error fetching price details:", error);
      setPrice("N/A");
    }
  };

  // Auto-select first option of each variant on mount
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


  // Handle variant selection
  const handleVariantSelect = (attribute, optionId) => {
    const updatedSelection = { ...selectedVariants, [attribute]: optionId };
    setSelectedVariants(updatedSelection);

    if (Object.keys(groupedVariants).every(attr => updatedSelection[attr])) {
      fetchPrice(updatedSelection);
    }
  };

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

console.log(product);

  return (
    <>
      <div className="row" style={{ paddingTop: '100px' }}>
        <div className="col-lg-6 col-md-6">
          <div className="productSlide">
            {img?.images?.map((imageObj, index) => (
              <div 
                className={`sp_img ${index === currentSlide ? 'active' : ''}`} 
                key={index}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <img src={imageObj.image} alt={`product-${index}`}/>
              </div>
            ))}
          </div>
          <ul className="indicator-slider">
            {img?.images?.map((imageObj, index) => (
              <li 
                key={index} 
                role="presentation"
                className={index === currentSlide ? 'active' : ''}
                onClick={() => goToSlide(index)}
              >
                <img src={imageObj.image} alt={`product-${index}`} />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="product-decp">
            <h4>{product?.product_name}</h4>
            <div className="product_price clearfix">
              <span className="price"><span><span>₹</span>{price}</span></span>
            </div>
            <div className="ratings">
              <i className="icon_star_alt"></i><i className="icon_star_alt"></i><i className="icon_star_alt"></i><i className="icon_star_alt"></i><i className="icon_star_alt"></i><span>( 1 )</span>
            </div>
            <div className="excerpt">
              <p>{product?.short_description}</p>
            </div>

            {Object.entries(groupedVariants).map(([attribute, options], index) => (
              <div className="product-variant mb-3" key={index}>
                <label><strong>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}:</strong></label>
                <div className="variant-options">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleVariantSelect(attribute, option.id)}
                      className={`btn btn-outline-dark btn-sm  ${selectedVariants[attribute] === option.id ? 'active' : ''}`} style={{marginRight:'10px'}}>
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="listing-meta">
              <a className="add-to-cart" href="/cart"   onClick={() => handleAddToCart(product.id, product.sku_new
[0].id)}><i className="nss-shopping-cart1"></i>Add To Cart</a>
            </div>
            <div className="metatext"><span>Category:</span> <a href="#">{product?.category
?.category_name}</a></div>
            <div className="pd-share">
              <span>Share:</span>
              <div className="product-share">
                <a target="_blank" href="https://www.facebook.com/"><i className="nss-facebook-f"></i></a>
                <a target="_blank" href="https://twitter.com/"><i className="nss-twitter"></i></a>
                <a target="_blank" href="https://www.instagram.com/"><i className="nss-instagram"></i></a>
                <a target="_blank" href="https://www.google.com/"><i className="nss-google-plus-g"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;