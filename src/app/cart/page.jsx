'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/cartitem/CartItem';
import CartSidebar from '../components/cartitem/CartSidebar';
import { getCartApi } from '../services/allApi';

function Cart() {
  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({ subTotal: "", total: "" });

  const cartItem = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    try {
      const result = await getCartApi(reqHeader);
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

  useEffect(() => {
    cartItem();
  }, []);

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
