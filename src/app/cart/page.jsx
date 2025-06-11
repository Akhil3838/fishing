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