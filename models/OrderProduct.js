const mongoose = require('mongoose');

const OrderProductSchema= new mongoose.Schema({

    orderId:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    },
    totalPrice:{
        type:Number,
        min:0,
        validate:{
            validator: function(value){
                return value>=1;
            },
            message:"invaid Price"
        },
        required:true
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
const OrderProduct= mongoose.model("OrderProduct",OrderProductSchema);
module.exports={
    OrderProduct
}