import React from 'react'
import { FaFacebook, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='container'>
                    <div className='about'>
                        <div className='logo'>
                            <img src='./img/shoplogo.png' alt='logo' onClick={() => window.location.href = '/'}/>
                        </div>
                        <div className='detail'>
                            <p>This is a website for selling laptops online, created with React. Contact me via: </p>
                            <div className='icon'>
                                <li onClick={() => window.location.href = 'https://www.facebook.com/quan.nguyenhoang25/'}><FaFacebook /></li>
                                <li onClick={() => window.location.href = 'https://www.instagram.com/qniichan/'}><FaInstagram /></li>
                                <li onClick={() => window.location.href = 'https://www.youtube.com/channel/UC5XNf11qMCQ75wwDIXKMmwA'}><FaYoutube /></li>
                                <li onClick={() => window.location.href = 'https://github.com/hoangQuan25'}><FaGithub /></li>
                            </div>
                        </div>
                    </div>
                    <div className='account'>
                        <h3>My account</h3>
                        <ul>
                            <li>Account</li>
                            <li>Order</li>
                            <li>Cart</li>
                            <li>Shipping</li>
                            <li>Return</li>
                        </ul>
                    </div>
                    <div className='page'>
                        <h3>Pages</h3>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer