const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const bookRoutes = require('../src/routes/book_routes');
const authorRoutes = require('../src/routes/author_routes');

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Use routes
app.use(bookRoutes);
app.use(authorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
