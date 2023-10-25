import React, { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi';
import { PiHandbagSimpleBold } from 'react-icons/pi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './nav.css';

const Nav = ({ searchButton }) => {
    const [search, setSearch] = useState();
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const isAdmin = (isAuthenticated && user.name === 'hoangquandz2502@gmail.com');

    useEffect(() => {
        const sendDataToServer = async () => {
            try {
                // Wait for the authentication process to complete
                const token = await getAccessTokenSilently();
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: user.name })
                };

                await sendData(options);
            } catch (e) {
                console.error(e);
            }
        };

        if (isAuthenticated) {
            sendDataToServer();
        }
    }, [isAuthenticated, user, getAccessTokenSilently]);


    const sendData = async (options) => {
        try {
            const res = await fetch('http://localhost:3000', options);
            console.log('Server response:', res);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <>
            <div className='main_header'>
                <div className='container'>
                    <div className='logo'>
                        <img className='logo' src='./img/shoplogo.png' alt='this is my logo' onClick={() => window.location.href = '/'}></img>
                    </div>
                    {
                        !isAdmin && <div className='search_box'>
                            <input type='text' value={search} placeholder='What are you searching for...' autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={() => searchButton(search)}>Search</button>
                        </div>
                    }
                    <div className='icon'>
                        {
                            isAuthenticated &&
                            (
                                <div className='account'>
                                    <div className='user_icon'>
                                        <MdOutlineAccountCircle />
                                    </div>
                                    <p>Hello, {isAdmin ? 'Admin' : user.name}</p>
                                </div>
                            )
                        }

                        {
                            !isAdmin && <div className='second_icon'>
                                <Link to='/' className='link'><FiHeart /></Link>
                                <Link to='/Cart' className='link'><PiHandbagSimpleBold /></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='header'>
                <div className='container'>
                    <div className='nav'>
                        {
                            !isAdmin ? <ul>
                                <li>
                                    <Link to='/' className='link'>Home</Link>
                                </li>
                                <li>
                                    <Link to='/product' className='link'>Product</Link>
                                </li>
                                <li>
                                    <Link to='/about' className='link'>About</Link>
                                </li>
                                <li>
                                    <Link to='/contact' className='link'>Contact</Link>
                                </li>
                            </ul>
                                : <ul>
                                    <li>
                                        <Link to='/product' className='link'>Product</Link>
                                    </li>
                                    <li>
                                        <Link to='/admin' className='link'>Admin</Link>
                                    </li>
                                </ul>
                        }
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
