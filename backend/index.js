const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const router = require('./src/routes/index');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.json());

app.use(cookieParser());
app.use(cors());

const connectToDb = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI); 
       console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDb();
app.use('/api/v1', router);
app.get('/', (req, res) => {
    res.send('Hello World!');
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

module.exports = app;
