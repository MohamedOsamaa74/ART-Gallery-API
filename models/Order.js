const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    deliveredOn: {
        type: Date,
        required: false,
        validate:{
            validator: function(value){
                return !value||value>this.createdOn;
            },
            message: 'deliveredOn cannot be before createdOn'
        }
    },
    shippingAddress: {
        type: String,
        required: true,
        maxlength: 100
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
        default: "pending" 
    }
},
{
    timestamps: true 
}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order
};
