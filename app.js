const express = require('express');
const ConnectDB = require('./config/db');
const {notFound, errorHandler} = require('./middlewares/ErrorHandler');
const productRouter=require('./routers/ProductRouter');
const AuthRouter = require('./routers/AuthRouter');
const UserRouter = require('./routers/UserRouter');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
ConnectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/product',productRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));