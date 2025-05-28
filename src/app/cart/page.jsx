'use client';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/cartitem/CartItem';
import CartSidebar from '../components/cartitem/CartSidebar';
import { getCartApi } from '../services/allApi';
import { deleteCartResponseContext, updateResponseContext } from '../context/Contextshare';

function Cart() {
    const { deleteCartResponse } = useContext(deleteCartResponseContext);
      const { updateCartResponse } = useContext(updateResponseContext);


  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({ subTotal: "", total: "" });

const cartItem = async () => {
  let browserId = localStorage.getItem("browser_id");
  
  if (!browserId) {
    browserId = Date.now() + Math.random().toString(36).substr(2, 10);
    localStorage.setItem("browser_id", browserId);
  }


  const formData = new FormData();
  formData.append("session_id", browserId);
  

  const token = sessionStorage.getItem("token");
  const reqHeader = {
    "Authorization": `Bearer ${token}`
    // Remove Content-Type when sending FormData; let the browser set it
  };

  try {
    const result = await getCartApi(formData, reqHeader);
    console.log("API Response:", result.data);

    if (result.data && result.data.cartItems.length > 0) {
      setCart(result.data.cartItems);
      setSummary({ 
        subTotal: result.data.subTotal, 
        total: result.data.total 
      });
    } else {
      setCart([]);
      setSummary({ subTotal: "", total: "" });
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};
console.log(cart);
console.log(summary);


  useEffect(() => {
    cartItem();
  }, [deleteCartResponse,updateCartResponse]);

  return (
    <>
      <Header />
      <section className="cart-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <CartItem cart={cart} />
            </div>
            <div className="col-lg-4">
              <CartSidebar summary={summary} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
