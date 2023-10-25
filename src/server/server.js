const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Function to log messages to a file
function logMessage(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}\n\n`;

    fs.appendFile('Contact.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

function logChange(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${message}\n\n`;

    fs.appendFile('Update.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Route to handle incoming messages
app.post('/messages', (req, res) => {
    const { Name, Email, Subject, Message } = req.body;

    // Log the message
    logMessage(`Received message from :\n\t${Name} (${Email}): \n\t${Subject} \n\t${Message}`);

    // Send a response back to the client
    res.json({ success: true, message: 'Message received successfully' });
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

    // log the changes into a file
    logChange(`Modified product list.\n\n`);

}

// Call the function to format the data and export to productdetail.js
formatDataForProductDetail();
// then(() => {
//     pool.end();
// }).catch(error => {
//     console.error('Error:', error);
//     pool.end();
// });



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});