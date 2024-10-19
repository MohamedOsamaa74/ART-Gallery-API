const express = require('express');
const ConnectDB = require('./config/db');
const {notFound, errorHandler} = require('./middlewares/ErrorHandler');
const productRouter=require('./routers/ProductRouter');
// Connect to MongoDB
ConnectDB();

const app = express();
app.use(express.json());
app.use('/api/product',productRouter);
//app.use(notFound);
//app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));