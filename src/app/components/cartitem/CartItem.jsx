import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { deleteCartApi, updateCartApi } from '@/app/services/allApi';
import { deleteCartResponseContext, updateResponseContext } from '@/app/context/Contextshare';

function CartItem({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});
  const { setDeleteCartResponse } = useContext(deleteCartResponseContext);
  const { setUpdateCartResponse } = useContext(updateResponseContext);
  const [disabledItems, setDisabledItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState([]);

  // Load from localStorage on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedQuantities = localStorage.getItem("quantities");
      if (storedQuantities) {
        setQuantities(JSON.parse(storedQuantities));
      }
    }
  }, []);

  // Update quantities from cart when cart changes
  useEffect(() => {
    if (cart?.length > 0) {
      const initialQuantities = {};
      cart.forEach(item => {
        initialQuantities[item.id] = item.quantity || 1;
      });
      setQuantities(initialQuantities);
      localStorage.setItem("quantities", JSON.stringify(initialQuantities));
    }
  }, [cart]);

  const updateCartQuantity = async (id, quantity) => {
    setLoadingItems(prev => [...new Set([...prev, id])]);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("cart_item_id", id);
    formData.append("quantity", quantity);
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await updateCartApi(formData, reqHeader);
      setUpdateCartResponse(result.data);
      if (result.status === 200) {
        setDisabledItems(prev => prev.filter(itemId => itemId !== id));
        return true;
      } else if (result.status === 400) {
        setDisabledItems(prev => [...new Set([...prev, id])]);
        toast.warning("Quantity limit exceeded!", {
          position: "bottom-center",
          autoClose: 1500,
        });
        return false;
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      return false;
    } finally {
      setTimeout(() => {
        setLoadingItems(prev => prev.filter(itemId => itemId !== id));
      }, 1000);
    }
  };

  const increaseQuantity = async (id) => {
    if (disabledItems.includes(id)) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Maximum quantity reached!',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
    const updatedQuantity = (quantities[id] || 1) + 1;
    const success = await updateCartQuantity(id, updatedQuantity);
    if (success) {
      const newQuantities = { ...quantities, [id]: updatedQuantity };
      setQuantities(newQuantities);
      localStorage.setItem("quantities", JSON.stringify(newQuantities));
    }
  };

  const decreaseQuantity = async (id) => {
    const updatedQuantity = Math.max((quantities[id] || 1) - 1, 1);
    const success = await updateCartQuantity(id, updatedQuantity);
    if (success) {
      const newQuantities = { ...quantities, [id]: updatedQuantity };
      setQuantities(newQuantities);
      localStorage.setItem("quantities", JSON.stringify(newQuantities));
    }
  };

  const removeItem = async (id) => {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("cart_item_id", id);
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await deleteCartApi(formData, reqHeader);
      if (result.status === 200) {
        setDeleteCartResponse(result.data);
        toast.error("Deleted Successfully!", { position: "top-center", autoClose: 1000 });
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[id];
        localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
        setQuantities(updatedQuantities);
        setCart(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <form className="woocommerce-cart-form" action="#">
      <table className="cart-table">
        <thead>
          <tr>
            <th className="product-remove">&nbsp;</th>
            <th className="product-name-thumbnail">Product</th>
            <th className="product-price">Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-total">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <tr className="cart-item" key={item.id}>
                <td className="product-remove">
                  <button type="button" className='btn' onClick={() => removeItem(item.id)}>X</button>
                </td>
                <td className="product-thumbnail-title">
                  <a href="#" className="pd-img">
                    <img src={item.product_items?.image || "assets/images/product/c1.jpg"} alt="product" />
                  </a>
                  <a className="product-name" href="#">{item.product_name || "Product Name"}</a>
                </td>
                <td className="product-unit-price">
                  <div className="product_price clearfix">
                    <span className="price">₹{item.price.toFixed(2)}</span>
                  </div>
                </td>
                <td className="product-quantity clearfix">
                  <div className="quantityd clearfix">
                    <button className="qtyBtn btnMinus" onClick={() => decreaseQuantity(item.id)} disabled={loadingItems.includes(item.id)}>-</button>
                    <input
                      name="qty"
                      value={quantities[item.id] || item.quantity}
                      title="Qty"
                      className="input-text qty text carqty"
                      type="text"
                      readOnly
                    />
                    <button className="qtyBtn btnPlus" onClick={() => increaseQuantity(item.id)} disabled={loadingItems.includes(item.id)}>+</button>
                  </div>
                </td>
                <td className="product-total">
                  <div className="product_price clearfix">
                    <span className="price">₹{(item.price * (quantities[item.id] || item.quantity)).toFixed(2)}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Your cart is empty.</td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
}

export default CartItem;
