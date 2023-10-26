import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import './admin.css';

const DashboardBox = ({ title, value, icon }) => {
  return (
    <div className="dashboard-box">
      <div className='icon'>{icon}</div>
      <div className='content'>
        <h2>{value}</h2>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

const Admin = ({ detail, view, close, setClose }) => {
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentMessages, setRecentMessages] = useState([]);


  useEffect(() => {
    // Fetch data from the server
    axios.get('/admin')
      .then(response => {
        console.log(response.data);
        setProducts(response.data.num_of_products);
        setCustomers(response.data.total_users);
        setRevenue(response.data.total_revenue);

        const formattedMessages = response.data.recentMessages.map(message => ({
          ...message,
          date: formatDateString(message.date),
        }));

        setRecentMessages(formattedMessages);
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

  // handle the add product
  const [product, setProduct] = useState(
    {
      id: '',
      Title: '',
      Cat: '',
      Brand: '',
      Price: '',
      Img: '',
      Describe: ''
    }
  );

  let name, value;
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [name]: value })
  };

  const sendData = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!product.Title || !product.Cat || !product.Brand || !product.Price || !product.Img || !product.Describe) {
      alert('Please fill in all fields');
      return;
    }

    // If all checks pass, proceed with sending data
    const { id, Title, Cat, Brand, Price, Img, Describe, Available } = product;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id, Title, Cat, Brand, Price, Img, Describe, Available
      })
    };

    try {
      const res = await fetch('http://localhost:3000/admin', options);

      if (res.ok) {
        alert('Product added successfully');
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
      <div className="upper">
        <div className="admin-dashboard">
          <DashboardBox title="Products" value={products} icon={<AiOutlineShoppingCart />} />
          <DashboardBox title="Customers" value={customers} icon={<AiOutlineUserAdd />} />
          <DashboardBox title="Revenue this month" value={revenue + ' Đ'} icon={<BsCoin />} />
        </div>
      </div>
      <div className="lower">
        <div className="form-section">
          <h2>Add product</h2>
          <form method='POST'>
            <input type='text' name='id' value={product.id} placeholder='Id' required autoComplete='off' onChange={data} />
            <input type='text' name='Title' value={product.Title} placeholder='Title' required autoComplete='off' onChange={data} />
            <input type='text' name='Cat' value={product.Cat} placeholder='Cat' required autoComplete='off' onChange={data} />
            <input type='text' name='Brand' value={product.Brand} placeholder='Brand' required autoComplete='off' onChange={data} />
            <input type='text' name='Price' value={product.Price} placeholder='Price' required autoComplete='off' onChange={data} />
            <input type='text' name='Img' value={product.Img} placeholder='Img link' required autoComplete='off' onChange={data} />
            <input type='text' name='Available' value={product.Available} placeholder='Quantity available' required autoComplete='off' onChange={data} />
            <textarea name='Describe' value={product.Describe} placeholder='Describe' required autoComplete='off' onChange={data} />
            <button type='submit' onClick={sendData}>Add product</button>
          </form>
        </div>
        <div className="messages-section">
          <h2>Recent messages</h2>
          {
            close ?
              <div className='message-detail'>
                <div className='container'>
                  <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                  {
                    detail.map((p) => {
                      return (
                        <div className='message-box'>
                          <div className='detail'>
                            <p>At: {p.date}</p>
                            <h2>From: {p.name}</h2>
                            <p>{p.email}</p>
                            <h3>{p.subject}</h3>
                            <p>{p.message}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              : null
          }
          {recentMessages.map((message, index) => (
            <div key={index} className="message-block" onClick={() => view(message)}>
              <p><strong>From:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Subject:</strong> {message.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
