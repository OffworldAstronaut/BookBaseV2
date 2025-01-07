// Importing required modules
const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const path = require('path')

// Create an Express application
const app = express(); 

// Middleware
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html', 'index.html')); 
});

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
