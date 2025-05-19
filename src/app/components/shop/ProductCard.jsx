import { addToCartApi } from '@/app/services/allApi'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductCard = ({ product }) => {
  const [addCartResponse, setAddcartResponse] = useState(null)
  const [pendingCartItem, setPendingCartItem] = useState(null)

  const handleAddToCart = async ( product_id, sku_id) => {
    const token = sessionStorage.getItem("token");

    // if (!token) {
    //   setPendingCartItem({ product_id, sku_id });
    //   toast.error("Please login to add to cart!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     theme: "colored",
    //   });
    //   return;
    // }

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("quantity", 1);
    formData.append("sku_id", sku_id);

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      
      const result = await addToCartApi(formData, reqHeader);
      console.log("Cart Response:", result);
      if (result.status === 200) {
        // setAddcartResponse(result.data);
        toast.success("Item added successfully!", {
          position: "top-center",
          autoClose: 1000,
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

  return (
    <div className="product-item-1 text-center">
      <div className="product-thumb">
        <img src={product?.icon} alt="product" />
        <div className="product-meta">
          <Link href={`/productDetails/${product?.slug}`} className="view">
            <i className="nss-eye1"></i>
          </Link>
        </div>
        <a
          className="add-to-cart"
          href="#"
                           onClick={() => handleAddToCart(product.id, product.sku_new
[0].id)}

        >
          <i className="nss-shopping-cart1"></i>Add To Cart
        </a>
      </div>
      <div className="product-details">
        <h5>
          <Link href={`/productDetails/${product?.slug}`}>
            {product?.product_name}
          </Link>
        </h5>
        <div className="ratings">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="icon_star_alt"></i>
          ))}
          <span>( 1 )</span>
        </div>
        <div className="product_price clearfix">
          <span className="price"><span><span>$</span>{product?.sku_new[0].special_price.toFixed(2)}</span></span>
        </div>
      </div>
            <ToastContainer />

    </div>
  );
}

export default ProductCard
