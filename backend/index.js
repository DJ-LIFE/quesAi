const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./src/routes/index');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.json());

app.use(cookieParser());

const connectToDb = async () => {
    try {
       await mongoose.connect('mongodb+srv://gk22719:gD7tMXuVDurkygR6@cluster0.sxhbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'); 
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
