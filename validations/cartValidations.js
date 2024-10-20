const Joi= require('joi');


function validateCreateCart(obj) {
    const schema = Joi.object({

        userId: Joi.string().required().messages({
            'string.empty': 'UserId is required',
            'any.required': 'UserId is required'
        }),
       
    });

    return schema.validate(obj);
};

module.exports={
    validateCreateCart,
    
}