const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/authors', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html', 'authors.html'));
});

module.exports = router;
