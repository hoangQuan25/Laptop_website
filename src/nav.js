import React, { useState } from 'react'
import { FaLaptopCode } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { PiHandbagSimpleBold } from 'react-icons/pi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css';

const Nav = ({ searchButton }) => {
    const [search, setSearch] = useState()
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <>
            <div className='free'>
                <div className='icon'>
                    <FaLaptopCode />
                </div>
                <p>Miễn phí vận chuyển với đơn hàng trên 10 triệu VNĐ!</p>
            </div>
            <div className='main_header'>
                <div className='container'>
                    <div className='logo'>
                        <img className='logo' src='./img/shoplogo.png' alt='this is my logo' onClick={() => window.location.href = '/'}></img>
                    </div>
                    <div className='search_box'>
                        <input type='text' value={search} placeholder='What are you searching for...' autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={() => searchButton(search)}>Search</button>
                    </div>
                    <div className='icon'>
                        {
                            isAuthenticated &&
                            (
                                <div className='account'>
                                    <div className='user_icon'>
                                        <MdOutlineAccountCircle />
                                    </div>
                                    <p>Chào, {user.name}</p>
                                </div>
                            )
                        }

                        <div className='second_icon'>
                            <Link to='/' className='link'><FiHeart /></Link>
                            <Link to='/Cart' className='link'><PiHandbagSimpleBold /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header'>
                <div className='container'>
                    <div className='nav'>
                        <ul>
                            <li>
                                <Link to='/' className='link'>Home</Link>
                            </li>
                            <li>
                                <Link to='/product' className='link'>Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to='/about' className='link'>About</Link>
                            </li>
                            <li>
                                <Link to='/contact' className='link'>Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='auth'>
                        {
                            isAuthenticated ?
                                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><FiLogOut /></button>
                                :
                                <button onClick={() => loginWithRedirect()}><FiLogIn /></button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav