const express = require('express');
const ConnectDB = require('./config/db');
const {notFound, errorHandler} = require('./middlewares/ErrorHandler');
const productRouter=require('./routers/ProductRouter');
const cartRouter=require('./routers/CartRouter');

// Connect to MongoDB
ConnectDB();

const app = express();
app.use(express.json());
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
//app.use(notFound);
//app.use(errorHandler);

const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));