import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineShoppingCart, AiOutlineEye, AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { FiTruck, FiDollarSign, FiHeadphones } from 'react-icons/fi';
import { BiSolidDiscount } from 'react-icons/bi';
import Homeproduct from './homeproduct';
import './home.css';

const Home = ({ detail, view, close, setClose }) => {
  return (
    <>
      {
        close ?
          <div className='productDetail'>
            <div className='container'>
              <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
              {
                detail.map((p) => {
                  return (
                    <div className='productBox'>
                      <div className='img_box'>
                        <img src={p.Img} alt={p.Title} />
                      </div>
                      <div className='detail'>
                        <h4>{p.Cat}</h4>
                        <h2>{p.Title}</h2>
                        <p>{p.Describe}</p>
                        <h3>{p.Price} đ</h3>
                        <button>Add to cart</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null
      }

      <div className='top_banner'>
        <div className='container'>
          <div className='detail'>
            <h2>The best laptop of October 2023!</h2>
            <Link to='/product' className='link'>Our shop<AiOutlineArrowRight /></Link>
          </div>
          <div className='img_box'>
            <img className='img1' src='./img/slider.png' alt='slider'></img>
            <img className='img2' src='./img/slider2.png' alt='slider2'></img>
            <img className='img3' src='./img/slider3.png' alt='slider3'></img>
          </div>
        </div>
      </div>
      <div className='product_type'>
        <div className='container'>
          <div className='box'>
            <div className='img_box'>
              <img src='./img/gaming_laptop.png' alt='gaming laptop'></img>
            </div>
            <div className='detail'>
              <p>Gaming laptop</p>
            </div>
          </div>
          <div className='box'>
            <div className='img_box'>
              <img src='./img/office_laptop.png' alt='office laptop'></img>
            </div>
            <div className='detail'>
              <p>Office laptop</p>
            </div>
          </div>
          <div className='box'>
            <div className='img_box'>
              <img src='./img/highend_laptop.png' alt='highend laptop'></img>
            </div>
            <div className='detail'>
              <p>High quality laptop</p>
            </div>
          </div>
          <div className='box'>
            <div className='img_box'>
              <img src='./img/macbook.png' alt='macbook'></img>
            </div>
            <div className='detail'>
              <p>Macbook</p>
            </div>
          </div>
        </div>
      </div>
      <div className='about'>
        <div className='container'>
          <div className='box'>
            <div className='icon'>
              <FiTruck />
            </div>
            <div className='detail'>
              <h3>Freeshipping</h3>
              <p>for every order more than 10000000 VND</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon'>
              <FiDollarSign />
            </div>
            <div className='detail'>
              <h3>Return & refund</h3>
              <p>we ensure our quality</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon'>
              <BiSolidDiscount />
            </div>
            <div className='detail'>
              <h3>Discount offering</h3>
              <p>when buying multiple products</p>
            </div>
          </div>
          <div className='box'>
            <div className='icon'>
              <FiHeadphones />
            </div>
            <div className='detail'>
              <h3>Customer service</h3>
              <p>we are always ready!</p>
            </div>
          </div>
        </div>
      </div>
      <div className='product'>
        <h2>Top-selling products</h2>
        <div className='container'>
          {Homeproduct.map((elm) => {
            return (
              <div className='box' key={elm.id}>
                <div className='img_box'>
                  <img src={elm.Img} alt={elm.Title} />
                  <div className='icon'>
                    <li><AiOutlineShoppingCart /></li>
                    <li onClick={() => view(elm)}><AiOutlineEye /></li>
                    <li><AiOutlineHeart /></li>
                  </div>
                </div>
                <div className='detail'>
                  <h3>{elm.Title}</h3>
                  <h4>{elm.Price} đ</h4>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='banner'>
        <div className='container'>
          <div className='detail'>
            <h4>LATEST TECHNOLOGY!</h4>
            <h3>Macbook Pro 16 M2 2023</h3>
            <p>54290000 đ</p>
            <Link className='link' to='/product'>Our shop<AiOutlineArrowRight /></Link>
          </div>
          <div className='img_box'>
            <img src='./img/slider4.png' alt='Macbook Pro 16 M2 2023' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home