import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Product from './product';
import Cart from './cart';

const Rout = ({ product, setProduct, detail, view, close, setClose, cart, setCart, addToCart }) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home
          detail={detail}
          view={view}
          close={close}
          setClose={setClose}
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
      </Routes>
    </>
  );
};

export default Rout;
