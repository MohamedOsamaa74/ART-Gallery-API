const {Product}=require('../models/Product');
const asyncHandler=require('express-async-handler');
const {validateCreateProduct}= require('../validations/productValidations')

    const addProduct=asyncHandler(async (req,res)=>{
        const {error}= validateCreateProduct(req.body);
        if(error){
        return res.status(400).json({Message:error.details[0].message}); 
        }
    const product = new Product({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:req.body.image
    });
    const result= await product.save();
        return res.status(201).json(result);
    });


    const getProductById = asyncHandler(async(req,res)=>{
        const product= await Product.findById(req.params.id);
        return !product?res.status(404).message("This product Not Found") :
                        res.status(200).json(product)
        });

    const getAllProducts=asyncHandler(async (req,res)=>{
            const products= await Product.find();
            return products.length>0?res.status(200).json(products) :
            res.status(404).message("No Products Until Now")
            });




module.exports={
    addProduct,
    getAllProducts,
    getProductById,
}