'use client';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/cartitem/CartItem';
import CartSidebar from '../components/cartitem/CartSidebar';
import { getCartApi } from '../services/allApi';
import { deleteCartResponseContext, updateResponseContext } from '../context/Contextshare';
import Image from 'next/image';

function Cart() {
  const { deleteCartResponse } = useContext(deleteCartResponseContext);
  const { updateCartResponse } = useContext(updateResponseContext);

  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState({ subTotal: '', total: '' });
  const [browserId, setBrowserId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('browser_id');
      if (!id) {
        id = Date.now() + Math.random().toString(36).substr(2, 10);
        localStorage.setItem('browser_id', id);
      }
      setBrowserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!browserId) return;

      const formData = new FormData();
      formData.append('session_id', browserId);

      const token = isClient ? sessionStorage.getItem('token') : null;
      const reqHeader = token ? {
        Authorization: `Bearer ${token}`,
      } : {};

      try {
        const result = await getCartApi(formData, reqHeader);
        if (result.data && result.data.cartItems.length > 0) {
          setCart(result.data.cartItems);
          setSummary({
            subTotal: result.data.subTotal,
            total: result.data.total,
          });
        } else {
          setCart([]);
          setSummary({ subTotal: '', total: '' });
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, [browserId, deleteCartResponse, updateCartResponse, isClient]);

  return (
    <>
      <Header />
      <section className="cart-section" style={{paddingTop:'160px'}}>
        <div className="container">
          {cart.length > 0 ? (
            <div className="row">
              <div className="col-lg-8">
                <CartItem cart={cart} />
              </div>
              <div className="col-lg-4">
                <CartSidebar summary={summary} />
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
             <div className="animated-cart mb-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width="120"
    height="120"
    className="cart-bounce"
    fill="#ccc"
  >
    <path d="M528.12 301.319l47.273-208A16 16 0 0 0 560 80H128l-9.4-32H24A24 24 0 0 0 0 72v16a24 24 0 0 0 24 24h66.6l61.2 204.319a63.994 63.994 0 1 0 77.2 84.681h143.2a63.994 63.994 0 1 0 77.2-84.681zM172 416a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm256 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" />
  </svg>
</div>
<h3 className="mb-3">Your Cart is Empty</h3>
<p className="text-muted">Looks like you havent added anything to your cart yet</p>

              {/* <a href="/shopping[fishing-reels]" className="btn btn-primary mt-3">Continue Shopping</a> */}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;