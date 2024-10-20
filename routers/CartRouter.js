const express=require('express');
const router=express.Router();
const cartController= require('../controllers/CartController')

router.post("/",cartController.addCart);
router.delete("/",cartController.deleteCart);

module.exports=router;