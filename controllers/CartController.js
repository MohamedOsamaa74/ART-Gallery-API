const asyncHandler=require('express-async-handler');
const {validateCreateCart}= require('../validations/cartValidations');
const {Cart} = require('../models/Cart');


const addCart= asyncHandler(async (req,res)=>{
  const {error}= validateCreateCart(req.body);
  if(error){
    return res.status(400).json({Message:"Invalid User Id"});
  }
  const cart= new Cart({
    userId:req.body.userId,
    createdAt:req.body.createdAt
  });
  const result= await product.save();
  return res.status(201).json(result);
});

const deleteCart= asyncHandler(async (req,res)=>{
const cart= await Cart.findById(req.params.id);
if(cart){
   await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json({Message:"Cart Deleted Successfully"});
} 
return res.status(200).json({Message:"Cart Not Found"});

});

// AddItemToCart
// GetCartItems
// RemoveItemFromCart

module.exports={
    addCart,
    deleteCart
}