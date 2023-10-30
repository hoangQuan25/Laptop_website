import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDoneOutline } from 'react-icons/md'
import axios from 'axios';
import './checkBill.css'


const CheckBill = ({ detail, view, close, setClose }) => {
    const [recentBills, setRecentBills] = useState([]);

    const handleStatusUpdate = (billId, status) => {
        // Send the updated status to the server
        axios.post('/approveBill', { billId, status })
            .then(response => {
                setRecentBills(recentBills.filter(bill => bill.id !== billId));
            })
            .catch(error => {
                console.error('Error updating bill status:', error);
                // Handle error as needed
            });
    };

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
            {recentBills.length > 0 ?
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
                                                        <div className='text'>
                                                            <p>At: {b.date}</p>
                                                            <h3>From: {b.email}</h3>
                                                            {b.billDetails.map(detail => (
                                                                <li key={detail.productId}>
                                                                    <p>Product ID: {detail.productId}</p>
                                                                    <p>Quantity: {detail.quantity}</p>
                                                                </li>
                                                            ))}
                                                        </div>
                                                        <div className='buttons'>
                                                            <button id='a' onClick={() => handleStatusUpdate(b.id, 1)}>Approve</button>
                                                            <button id='r' onClick={() => handleStatusUpdate(b.id, 0)}>Reject</button>
                                                        </div>
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
                : <div className='no-bill'>
                    <div className='content'>
                        <h1><MdDoneOutline /></h1>
                        <h2>There are no unread bills. Please reload the site to check again.</h2>
                    </div>
                </div>
            }

        </>
    )
}

export default CheckBill