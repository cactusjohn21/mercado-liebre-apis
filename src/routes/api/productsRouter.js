// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const apiProductsController = require('../../controllers/api/productsController');

router.get('/products/latest', apiProductsController.latest); /* GET - home page */
router.get('/products/offers', apiProductsController.offers); /* GET - search results */
router.get('/products/categories', apiProductsController.category);
router.get('/products/categories/:category', apiProductsController.categoryDetail); 

module.exports = router;