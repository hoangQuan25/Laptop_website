import React from 'react'
import Productdetail from '../data/productdetail'
import { AiOutlineShoppingCart, AiOutlineEye, AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai'
import { useAuth0 } from "@auth0/auth0-react"
import './product.css'

const Product = ({ product, setProduct, detail, view, close, setClose, addToCart }) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const filteredProduct = (product) => {
        const update = Productdetail.filter((p) => p.Cat === product || p.Brand === product);
        setProduct(update);
    };
    const AllProducts = () => {
        setProduct(Productdetail);
    };

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
                                                <h2>{p.Title}</h2>
                                                <p>{p.Describe}</p>
                                                <h3>{p.Price} đ</h3>
                                                <button onClick={() => addToCart(p)}>Add to cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : null
            }

            <div className='products'>
                <h3>Products</h3>
                <p>Home . product</p>
                <div className='container'>
                    <div className='filter'>
                        <div className='categories'>
                            <h3>Categories</h3>
                            <ul>
                                <li onClick={() => AllProducts("Gaming")}>All products</li>
                                <li onClick={() => filteredProduct("Gaming")}>Gaming laptop</li>
                                <li onClick={() => filteredProduct("Office")}>Office laptop</li>
                                <li onClick={() => filteredProduct("Highend")}>High quality laptop</li>
                            </ul>
                            <h3>Brands</h3>
                            <ul>
                                <li onClick={() => filteredProduct("Lenovo")}>Lenovo</li>
                                <li onClick={() => filteredProduct("Asus")}>Asus</li>
                                <li onClick={() => filteredProduct("HP")}>HP</li>
                                <li onClick={() => filteredProduct("Macbook")}>Macbook</li>
                                <li onClick={() => filteredProduct("Dell")}>Dell</li>
                                <li onClick={() => filteredProduct("Acer")}>Acer</li>
                            </ul>
                        </div>
                    </div>
                    <div className='productbox'>
                        <div className='content'>
                            {
                                product.map((elm) => {
                                    return <>
                                        <div className='box' key={elm.id}>
                                            <div className='img_box'>
                                                <img src={elm.Img} alt={elm.Title} />
                                                <div className='icon'>
                                                    {
                                                        isAuthenticated ?
                                                            <li onClick={() => addToCart(elm)}><AiOutlineShoppingCart /></li>
                                                            :
                                                            <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                                                    }
                                                    <li onClick={() => view(elm)}><AiOutlineEye /></li>
                                                    <li><AiOutlineHeart /></li>
                                                </div>
                                            </div>
                                            <div className='detail'>
                                                <h3>{elm.Title}</h3>
                                                <h4>{elm.Price} đ</h4>
                                            </div>
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product