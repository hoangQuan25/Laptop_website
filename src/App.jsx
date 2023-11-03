import React, { useState } from 'react'
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import { BrowserRouter } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Rout from './rout';
import Productdetail from './components/data/productdetail';
import FacebookMsg from './components/FacebookMsg';

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const isAdmin = (isAuthenticated && user.name === 'admin@gmail.com');
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
  const view = (content) => {
    setDetail([{ ...content }]);
    setClose(true);
  }

  // add to cart 

  const addToCart = (product) => {
    const exist = cart.find((p) => {
      return p.id === product.id;
    });

    if (exist) {
      alert("This product has already been added to your cart");
      return;
    }
    setCart([...cart, { ...product, qty: 1 }]);
    alert("Product added successfully!");
  }

  return (
    <div>
      <BrowserRouter>
        <Nav searchButton={searchButton} />
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
        {
          !isAdmin && <FacebookMsg />
        }
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App