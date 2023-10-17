import React, { useState } from 'react'
import Nav from './nav'
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom'
import Rout from './rout';
import Productdetail from './productdetail';

const App = () => {
  // set add to cart
  const [cart, setCart] = useState([]);
  // set product detail
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState([]); 
  // filter system
  const [product, setProduct] = useState(Productdetail);
  const searchButton = (product) => {
    const change = Productdetail.filter((p) => {
      return p.Cat.toLowerCase() === product.toLowerCase() || p.Title.toLowerCase().includes(product.toLowerCase());
    });
    setProduct(change);
  }
  // view product detail
  const view = (product) => {
    setDetail([{ ...product }]);
    setClose(true); 
  }
  
  // add to cart 
  const addToCart = (product) => {

  }
  return (
    <div>
      <BrowserRouter>
        <Nav searchButton={searchButton}/>
        <Rout 
          product={product} 
          setProduct={setProduct} 
          detail={detail} 
          view={view} 
          close={close} 
          setClose={setClose} 
          cart={cart} 
          setCart={setCart} 
          addToCart={addToCart}
        />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App