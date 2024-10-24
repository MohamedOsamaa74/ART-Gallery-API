const { required, bool } = require('joi');
const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:15,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        maxlength:15,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength: 100
    },
    email:{
        type:String,
        required:true,
        maxlength:30,
        unique: true,
        trim:true
    },
    isVerified:{
        type:Boolean,
        required:false,
        default:false
    },
    phone:{
        type:String,
        required:false,
        maxlength:11,
        minlength:11,
        unique: false,
        match: [/^01[0,1,2,5]\d{8}$/, 'Please enter a valid phone number']
    },
    address:{
        type:String,
        required:false,
        maxlength:50,
    },
    role:{
        type:String,
        enum:["Admin","Customer"],
        default: "Customer"
    },

},
{
    timestamps:true
});
const User=mongoose.model("User",UserSchema);
module.exports={
    User
};