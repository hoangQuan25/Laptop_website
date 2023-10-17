import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import '/cart.css'

const Cart = ({ cart, setCart }) => {
    return (
        <>
            <div className='container'>
                {cart.length === 0 && 
                    <div className='emptyCart'>
                        <h2 className='empty'>Cart is empty!</h2>
                        <Link to='/product'>Shop now!</Link>
                    </div>
                }
                <div className='content'>
                    {
                        cart.map((e) => {
                            return (
                                <div className='item' key={e.id}>
                                    <div className='img_box'>
                                        <img src={e.Img} alt={e.Title} />
                                    </div>
                                    <div className='detail'>
                                        <h4>{e.Cat}</h4>
                                        <h3>{e.Title}</h3>
                                        <p>{e.Price}</p>
                                        <button><AiOutlineCloseCircle /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Cart