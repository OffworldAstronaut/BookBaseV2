const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html', 'books.html'));
});

module.exports = router;
