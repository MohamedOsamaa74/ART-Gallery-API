const { Order } = require('../models/Order');
const { OrderProduct } = require('../models/OrderProduct');
const asyncHandler = require('express-async-handler');
const { CartProducts } = require('../models/CartProduct');


const makeOrder = asyncHandler(async (req, res) => {
    const { userId, products, shippingAddress, createdOn } = req.body;
    if (!products || products.length === 0) {
        return res.status(400).json({ message: "Cannot create order, no products selected" });
    }

    try {
        const order = new Order({
            userId,
            shippingAddress,
            createdOn: createdOn || new Date(),
            status: req.body.status || 'pending'
        });

        const savedOrder = await order.save();

        const orderProducts = [];
        for (const product of products) {
            const orderProduct = new OrderProduct({
                orderId: savedOrder._id,
                productId: product.productId,
                quantity: product.quantity,
                totalPrice: product.quantity * product.price, 
            });

            const savedOrderProduct = await orderProduct.save();
            orderProducts.push(savedOrderProduct); 
        }

        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder,
            orderProducts,
        });
    } catch (err) {
       res.status(500).json({ message: 'an Error Ocured Try again' });
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('userId', 'name email'); 
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const orderProducts = await OrderProduct.find({ orderId }).populate('productId', 'name price'); 
    res.status(200).json({
        order,
        products: orderProducts
    });
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
    }

    await OrderProduct.deleteMany({ orderId });

    res.status(200).json({
        message: 'Order deleted successfully',
    });
});

const getAllOrders = asyncHandler(async (req, res) => {
   
    const orders = await Order.find().populate('userId', 'name email'); 
    const orderIds = orders.map(order => order._id); 
    const orderProducts = await OrderProduct.find({ orderId: { $in: orderIds } }).populate('productId', 'name price'); 

    const ordersWithProducts = orders.map(order => ({
        ...order.toObject(), 
        products: orderProducts.filter(op => op.orderId.toString() === order._id.toString()) 
    }));
if(ordersWithProducts.length>0){
   return  res.status(200).json({
        message: 'Orders fetched successfully',
        orders: ordersWithProducts,
    });
}
return  res.status(404).json({
    message: 'No Orders Found',
});
});

module.exports = { 
    makeOrder,
    deleteOrder,
    getAllOrders,
    getOrderById 
};
