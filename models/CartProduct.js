const mongoose = require('mongoose');

const CartProductsSchema= new mongoose.Schema({
    cartId:{
        type:mongoose.Types.ObjectId,
        ref:"Cart",
        required:true,
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
        min:1,
    }

},
{
    timestamps:true
});

const CartProducts= mongoose.model("CartProducts",CartProductsSchema);
module.exports={
    CartProducts
}