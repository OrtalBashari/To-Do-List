const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

//API for register
router.post('/Signup', async(req, res) => {
    try {
        const {username, email, password} = req.body;

        //check if the user exists
        const existsUser = await User.findOne({email});
        if(existsUser) return res.status(400).json({message: "User already exists"});

        //Password encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({username, email, password:hashedPassword});
        await newUser.save();

        res.status(201).json({message: "user registered successfully "});
    }

    catch(error) {
        res.status(500).json({message: "Error registering user", error});
    }
});

//API for login

router.post('/Signin', async(req, res) => {
    try {
        const {email, password} = req.body;

        //check if the user exists
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        //create a token jwt
        const createToken = jwt.sign({id: user._id}, "your_secret_key", {expiresIn: "1h"});

        res.status(200).json({createToken, user});
    }

    catch (error) {
        res.status(500).json({message: "Error logging in", error});
    }
}
);

module.exports = router;