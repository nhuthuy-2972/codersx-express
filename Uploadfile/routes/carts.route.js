const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');

router.get('/add/:productId', cartsController.add);

module.exports = router;