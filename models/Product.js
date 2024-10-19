const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:50, 
        trim:true       
    },
    description:{
        type:String,
        required:false,
        minlength:3,
        trim:true       
    },
    price:{
        type:Number,
        required:true,
        min:0,
        validate:{
            validator: function(value){
                return value>=1;
            },
            message:"invaid Price"
        }

    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
        validate: {
            validator: function(value) {
                return /\.(jpg|jpeg|png|gif)$/i.test(value);
            },
            message: 'Image must be a valid with Formate Like : jpg, jpeg, png'
        }
    }

},
{
    timestamps:true
});

const Product=mongoose.model("Product",ProductSchema);
module.exports={
    Product
};