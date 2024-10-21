const express=require('express');
const router=express.Router();
const cartController= require('../controllers/CartController')

router.post("/",cartController.addCart);
router.delete("/",cartController.deleteCart);
router.post("/add-product", cartController.addProductToCart);
router.get('/cartItems/:userId', cartController.getCartItems);
router.get('/removeItem/:productId', cartController.removeItemFromCart);

module.exports=router;