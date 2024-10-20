const express=require('express');
const router=express.Router();
const productController = require('../controllers/ProductController');
const { Product } = require('../models/Product');


router.post("/",productController.addProduct);
router.get("/search", productController.searchByName);
router.get("/:id",productController.getProductById);
router.get("/",productController.getAllProducts);
router.put("/:id",productController.editProduct);
router.delete("/:id",productController.deleteProduct);

module.exports = router ;