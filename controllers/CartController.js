const asyncHandler=require('express-async-handler');
const {validateCreateCart}= require('../validations/cartValidations');
const {Cart} = require('../models/Cart');
const { Product } = require('../models/Product');
const { CartProducts }= require('../models/CartProduct');
const { User } = require('../models/User');

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

const addProductToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "This Product Not Found" });
  }
  let cart = await Cart.findOne({ userId });
  
  if (!cart) {
    cart = new Cart({
      userId: userId,
      createdAt: Date.now(), 
    });
    await cart.save();
    const cartProducts = new CartProducts({
      cartId: cart._id, 
      productId: productId,
      quantity: quantity
    });
    await cartProducts.save();

    return res.status(201).json({ message: `${product.name} added to Cart Successfully` });
  }

  let cartProduct = await CartProducts.findOne({ cartId: cart._id, productId: productId });
  
  if (cartProduct) {
    cartProduct.quantity += quantity;
    await cartProduct.save();
    return res.status(200).json({ message: `${product.name} quantity updated in cart` });
  } else {
    const newCartProduct = new CartProducts({
      cartId: cart._id,
      productId: productId,
      quantity: quantity
    });
    await newCartProduct.save();
    return res.status(201).json({ message: `${product.name} added to Cart Successfully` });
  }
});


// GetCartItems
const getCartItems = asyncHandler(async (req, res) => {
 
  const { userId } = req.params;
    if(!userId){
      return res.status(401).json({Message:"Invalid User"})
    }
  const userCart = await Cart.findOne({ userId: userId });
  console.log(userCart);
  
  if (userCart) {
  
    const cartItems = await CartProducts.find({ cartId: userCart._id });
    console.log(cartItems);
    
    return  cartItems.length > 0 ? res.status(200).json(cartItems) : 
    res.status(200).json({ Message: `No items in your cart` }) ;
  }
   else {
    return res.status(400).json({ Message: `You don't have any cart yet` });
  }
});

// RemoveItemFromCart

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cartProduct = await CartProducts.findOne({ productId: productId });

  if (cartProduct) {
  
      const result = await CartProducts.findByIdAndDelete(cartProduct._id);
      
      return res.status(200).json({ message: `Product Deleted Successfully From Cart ${cartProduct.cartId}`});
  } else {
      return res.status(400).json({ message: "This Product Not Found in This Cart" });
  }
});

module.exports={
    addCart,
    deleteCart,
    addProductToCart ,  
     getCartItems,
     removeItemFromCart
}