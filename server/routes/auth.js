const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });   
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Signup failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "secret", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/test", (req, res) => {
    res.send("✅ Auth route working!");
});
 
module.exports = router;
