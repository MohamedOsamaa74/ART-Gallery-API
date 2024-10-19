const {Product}=require('../models/Product');
const asyncHandler=require('express-async-handler');
const {validateCreateProduct, validateEditProduct}= require('../validations/productValidations')

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

        return !product?res.status(404).json({message:"This Product Not Found"}) :
                        res.status(200).json(product);
            });


    const getAllProducts=asyncHandler(async (req,res)=>{
            const products= await Product.find();

            return products.length>0?res.status(200).json(products) :

            res.status(404).json({message:"There is No Products Until Now"})
            });


    const editProduct = asyncHandler(async (req, res) => {
                const { error } = validateEditProduct(req.body);
                if (error) {
                    return res.status(400).json({ Message: error.details[0].message });
                }           
                const product = await Product.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ Message: 'Product not found' });
                }
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
                    {   $set: {
                            name: req.body.name,
                            description: req.body.description,
                            price: req.body.price,
                            category: req.body.category,
                            image: req.body.image,
                        },
                    },{ new: true }); 

                return res.status(200).json(updatedProduct);
            });
            
            const deleteProduct = asyncHandler(async (req, res) => {
                const product = await Product.findById(req.params.id); 
            
                if (product) {
                    await Product.findByIdAndDelete(req.params.id);
                    return res.status(200).json({ Message: "Product Deleted Successfully" }); 
                }
            
                return res.status(404).json({ Message: "Product Not Found" }); 
            });
            

const searchByName = asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ Message: 'Enter Product name to search' });
    }
    const products = await Product.find({
        name: { $regex: new RegExp(name, 'i') } 
    });
    if (products.length === 0) {
        return res.status(404).json({ Message: 'No products found with the given name' });
    }
    return res.status(200).json(products);
});


module.exports={
    addProduct,
    getAllProducts,
    getProductById,
    editProduct,
    deleteProduct,
    searchByName
}