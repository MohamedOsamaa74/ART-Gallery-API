const Joi = require('joi');

function validateCreateProduct(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().max(50).required().messages({
            'string.empty': 'Product name is required',
            'string.max': 'Product name cannot exceed 50 characters',
            'any.required': 'Product name is required'
        }),
        description: Joi.string().trim().min(3).required().messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 3 characters long',
            'any.required': 'Description is required'
        }),
        price: Joi.number().min(0)
            .custom((value, helpers) => {
                if (value <= 1) {
                    return helpers.message('Price must be greater than 1');
                }
                return value;
            })
            .required()
            .messages({
                'number.base': 'Price must be a number',
                'number.min': 'Price must be greater than or equal to 0',
                'any.required': 'Price is required'
            }),
        category: Joi.string().required().messages({
            'string.empty': 'Category is required',
            'any.required': 'Category Field is required'
        }),
        image: Joi.string()
            .pattern(/\.(jpg|jpeg|png|gif)$/i)
            .messages({
                'string.pattern.base': 'Image must be a valid format like: jpg, jpeg, png, or gif'
            }),
    });

    return schema.validate(obj);
}

module.exports = {
    validateCreateProduct
};
