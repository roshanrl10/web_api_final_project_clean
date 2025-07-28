const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    const { username, email, firstName,
        lastName, password } = req.body
    // validation
    if (!username || !email || !password) {
        return res.status(400).json(
            {
                "success": false,
                "message": "Missing fields"
            }
        )
    }
    // db logic in try/catch
    try {
        const existingUser = await User.findOne(
            {
                $or: [{ "username": username },
                { "email": email }]
            }
        )
        if (existingUser) {
            return res.status(400).json(
                {
                    "success": false,
                    "message": "User exists"
                }
            )
        }
        // hash password
        const hasedPas = await bcrypt.hash(
            password, 10
        ) // 10 is complexity
        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            password: hasedPas
        })
        await newUser.save()
        return res.status(201).json(
            {
                "success": true,
                "message": "User Registered"
            }
        )
    } catch (err) {
        return res.status(500).json(
            { "success": false, "message": "Server error" }
        )
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    // validation
    if (!email || !password) {
        return res.status(400).json(
            { "success": false, "message": "Missing field" }
        )
    }
    try {
        const getUser = await User.findOne(
            { email: email }
        )
        if (!getUser) {
            return res.status(403).json(
                { "success": false, "message": "User not found" }
            )
        }
        const passwordCHeck = await bcrypt.compare(password, getUser.password) // pass, hashed password
        if (!passwordCHeck) {
            return res.status(403).json(
                { "success": false, "message": "Invalid credentials" }
            )
        }
        // 
        const payload = {
            "_id": getUser._id,
            "email": getUser.email,
            "username": getUser.username,
            "role": getUser.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        return res.status(200).json(
            {
                "success": true,
                "message": "Login Successful",
                "data": getUser,
                "token": token // return token in login
            }
        )
    } catch (err) {
        return res.status(500).json(
            { "success": false, "message": "Server error" }
        )
    }
}