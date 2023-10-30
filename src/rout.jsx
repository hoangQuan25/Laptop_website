import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Product from './components/product/product';
import Cart from './components/cart/cart';
import Contact from './components/contact/contact';
import About from './components/about/about';
import Admin from './components/admin/admin';
import CheckBill from './components/admin/checkBill';
import Success from './components/successCheckout/success';
import Cancel from './components/cancelCheckout/cancel';

const Rout = ({ product, setProduct, detail, view, close, setClose, cart, setCart, addToCart }) => {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home
          detail={detail}
          view={view}
          setProduct={setProduct}
          close={close}
          setClose={setClose}
          addToCart={addToCart}
        />}
        />
        <Route path='/product' element={<Product
          product={product}
          setProduct={setProduct}
          detail={detail}
          view={view}
          close={close}
          setClose={setClose}
          addToCart={addToCart}
        />}
        />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about'  element={<About />} />
        <Route path='/admin' element={<Admin detail={detail} view={view} close={close} setClose={setClose} />} />
        <Route path='/checkBill' element={<CheckBill detail={detail} view={view} close={close} setClose={setClose} />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
      </Routes>
    </>
  );
};

export default Rout;
