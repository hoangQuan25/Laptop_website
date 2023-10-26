import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios';
import './checkBill.css'


const CheckBill = ({ detail, view, close, setClose }) => {
    const [recentBills, setRecentBills] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        axios.get('/checkBill')
            .then(response => {

                const formattedBills = response.data.groupedBillData.map(bill => ({
                    ...bill,
                    date: formatDateString(bill.date),
                }));

                setRecentBills(formattedBills);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once

    // helper function to format dates
    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options).replace(',', ' ');
    };
    return (
        <>
            <div className='bills-section'>
                {
                    close ?
                        <div className='bill-detail'>
                            <div className='container'>
                                <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                                {
                                    detail.map((b) => {
                                        return (
                                            <div className='bill-box'>
                                                <div className='detail'>
                                                    <p>At: {b.date}</p>
                                                    <h3>From: {b.email}</h3>
                                                    {b.billDetails.map(detail => (
                                                        <li key={detail.productId}>
                                                            <p>Product ID: {detail.productId}</p>
                                                            <p>Quantity: {detail.quantity}</p>
                                                        </li>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        : null
                }
                <div className="content">
                    {recentBills.map(bill => (
                        <div key={bill.id} className="bill-details" onClick={() => view(bill)}>
                            <p>Date: {bill.date}</p>
                            <p>From user: {bill.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CheckBill