const express = require('express');
const User = require('../model/userModel');
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }

}

const signin = async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = { signup, signin };