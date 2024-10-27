const productController = require('../controllers/product.controller');
const express = require('express');
const router = express.Router();


router.get('/store', productController.storeData);
router.get('/transactions', productController.getAllTransactions);
router.get('/stats', productController.getProductStats);


module.exports = router;