import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './contact.css'

const Contact = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [user, setUser] = useState(
        {
            Name: '',
            Email: '',
            Subject: '',
            Message: ''
        }
    );

    let name, value;
    const data = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    };

    const sendData = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!user.Name || !user.Email || !user.Subject || !user.Message) {
            alert('Please fill in all fields');
            return;
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.Email)) {
            alert('Please enter a valid email address');
            return;
        }

        // If all checks pass, proceed with sending data
        const { Name, Email, Subject, Message } = user;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                Name, Email, Subject, Message
            })
        };

        try {
            const res = await fetch('https://laptop-website-308d0-default-rtdb.firebaseio.com/Message.json', options);

            if (res.ok) {
                alert('Your message has been sent');
            } else {
                alert('An error has occurred');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            alert('An error has occurred');
        }
    };

    return (
        <>
            <div className='contact_container'>
                <div className='content'>
                    <h2>Contact us</h2>
                    <div className='form'>
                        <form method='POST'>
                            <input type='text' name='Name' value={user.Name} placeholder='Enter your full name' required autoComplete='off' onChange={data} />
                            <input type='email' name='Email' value={user.Email} placeholder='Enter your e-mail' required autoComplete='off' onChange={data} />
                            <input type='text' name='Subject' value={user.Subject} placeholder='Enter your subject' required autoComplete='off' onChange={data} />
                            <textarea name='Message' value={user.Message} placeholder='Enter your message' required autoComplete='off' onChange={data} />
                            {
                                isAuthenticated ?
                                    <button type='submit' onClick={sendData}>Send</button>
                                    :
                                    <button type='submit' onClick={() => loginWithRedirect()}>Login to send</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact