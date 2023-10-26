const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// add messages to server
app.post('/messages', async (req, res) => {
  try {
    const { Name, Email, Subject, Message } = req.body;

    // Insert the message into the "contact" table with the current date
    const result = await pool.query(
      'INSERT INTO contact (name, email, subject, message, date) VALUES ($1, $2, $3, $4, NOW())',
      [Name, Email, Subject, Message]
    );

    // Send a response back to the client
    res.json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    console.error('Error inserting message into database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// connect to database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laptop_website',
  password: 'sinhvien',
  port: 5432, // Change the port if needed
});

// Fetch data from the laptops table
async function fetchLaptopsData() {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM laptops');
    return result.rows;
  } finally {
    client.release();
  }
}

// send bill data to the db
app.post('/cart', async (req, res) => {
  try {
    const { email, cart, totalPrice } = req.body;

    // Insert into 'bill' table
    const billResult = await pool.query(
      'INSERT INTO bill (date, email, totalprice) VALUES (NOW(), $1, $2) RETURNING id',
      [email, totalPrice]
    );

    const billId = billResult.rows[0].id;

    // Insert into 'bill_detail' table for each product in the cart
    for (const cartItem of cart) {
      await pool.query('INSERT INTO bill_detail (bill_id, product_id, quantity) VALUES ($1, $2, $3)', [billId, cartItem.id, cartItem.qty]);
    }

    res.status(201).json({ message: 'Bill and details added successfully', billId });
  } catch (error) {
    console.error('Error adding bill and details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// add user to the server
app.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the email already exists
    const checkQuery = 'SELECT * FROM users WHERE user_email = $1';
    const checkValues = [name];
    const existingUser = await pool.query(checkQuery, checkValues);

    if (existingUser.rows.length === 0) {
      // Only insert the user if the email does not exist
      // Assuming 'users' is your PostgreSQL table name
      const insertQuery = 'INSERT INTO users (user_id, user_email) VALUES (DEFAULT, $1) RETURNING *';
      const insertValues = [name];

      const result = await pool.query(insertQuery, insertValues);

      console.log('User added to the database:', result.rows[0]);
      res.status(201).json({ message: 'User added successfully' });
    } else {
      // Do nothing or send a different response if needed
      res.status(200).json({ message: 'User already exists, did nothing' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get stats from database
app.get('/admin', async (req, res) => {
  try {
    // Query for total users
    const usersResult = await pool.query('SELECT COUNT(*) AS total_users FROM users');

    // Query for total revenue of the month
    const revenueResult = await pool.query(`
      SELECT SUM(totalprice) AS total_revenue
      FROM bill
      WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM CURRENT_DATE)
    `);

    // Query for the number of products in laptops
    const productsResult = await pool.query('SELECT COUNT(*) AS num_of_products FROM laptops');

    // Fetch recent messages
    const messagesQuery = 'SELECT * FROM contact ORDER BY date DESC LIMIT 3;';
    const messagesResult = await pool.query(messagesQuery);
    const recentMessages = messagesResult.rows;

    // Send the results as JSON
    res.json({
      total_users: usersResult.rows[0].total_users,
      total_revenue: revenueResult.rows[0].total_revenue || 0, // Ensure a default value if there is no revenue
      num_of_products: productsResult.rows[0].num_of_products,
      recentMessages
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
// Format the fetched data into the structure used in productdetail.js
async function formatDataForProductDetail() {
  const laptopsData = await fetchLaptopsData();

  const formattedData = laptopsData.map(laptop => ({
    id: laptop.id,
    Title: laptop.title,
    Cat: laptop.category,
    Brand: laptop.brand,
    Price: laptop.price,
    Img: laptop.image_url,
    Describe: laptop.description,
  }));

  // Export the formatted data to a file (productdetail.js)
  fs.writeFileSync('../components/data/productdetail.js', `const Productdetail = ${JSON.stringify(formattedData, null, 2)};\n\nexport default Productdetail;`);
}

// Call the function to format the data and export to productdetail.js
formatDataForProductDetail();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});