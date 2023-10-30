import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import './cart.css'

const Cart = ({ cart, setCart }) => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    // increase quantity
    const increase = (product) => {
        const exist = cart.find((p) => {
            return p.id === product.id;
        });

        setCart(cart.map((p) => {
            return p.id === product.id ? { ...exist, qty: exist.qty + 1 } : p;
        }));
    }

    // decrease quantity
    const decrease = (product) => {
        const exist = cart.find((p) => {
            return p.id === product.id;
        });

        setCart(cart.map((p) => {
            return p.id === product.id ? { ...exist, qty: exist.qty === 0 ? 0 : exist.qty - 1 } : p;
        }));
    }

    // remove product from cart
    const removeProduct = (product) => {
        const exist = cart.find((p) => {
            return p.id === product.id;
        });

        if (exist.qty > 0) {
            setCart(cart.filter((p) => {
                return p.id !== product.id;
            }))
        }
    }

    //total price 
    const totalPrice = cart.reduce((price, item) => price + item.qty * item.Price, 0);

    
    // send data to server
    const handleCheckout = async () => {

        try {
            const email = user.name;

            const response = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers you may need, such as authorization headers
                },
                body: JSON.stringify({ email, cart, totalPrice }),
            })
            .then((res) => res.json())
            .then((url) => window.location.href = url);

            if (response.ok) {
                // Successfully sent data to the server
                console.log('Successfully checked out');
                // Additional logic if needed, e.g., redirecting to a confirmation page
            } else {
                console.log('Failed to checkout:', response.statusText);
                // Handle errors appropriately
            }
        } catch (error) {
            alert('Error during checkout:', error);
            // Handle errors appropriately
        }
    };

    return (
        <>
            <div className='cartContainer'>
                {cart.length === 0 &&
                    <div className='emptyCart'>
                        <h2 className='empty'>Cart is empty!</h2>
                        <Link to='/product' className='emptyCartBtn'>Shop now!</Link>
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
                                        <div className='info'>
                                            <h3>{e.Title}</h3>
                                            <p>Price: {e.Price} đ</p>
                                            <div className='qty'>
                                                <button className='increase' onClick={() => increase(e)}>+</button>
                                                <input type='text' value={e.qty} />
                                                <button className='decrease' onClick={() => decrease(e)}>-</button>
                                            </div>
                                            <h4 className='total'>Total: {e.Price * e.qty} đ</h4>
                                        </div>
                                        <div className='close'>
                                            <button onClick={() => removeProduct(e)}><AiOutlineCloseCircle /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    cart.length > 0 &&
                    <>
                        <h2 className='totalPrice'>Total: {totalPrice} đ </h2>
                        <button className='checkout' onClick={
                            isAuthenticated ? handleCheckout : () => loginWithRedirect()
                        }>Checkout</button>
                    </>
                }
            </div>
        </>
    )
}

export default Cart