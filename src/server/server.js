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
formatDataForProductDetail().then(() => {
    pool.end();
}).catch(error => {
    console.error('Error:', error);
    pool.end();
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});