const mongoose = require('mongoose');


const CartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    }
},
{
    timestamps:true
});
const Cart= mongoose.model("Cart",CartSchema);
module.exports={
    Cart
};