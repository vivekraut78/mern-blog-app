const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async (req, res) => 
{
  try 
  {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created", userId: user._id });
  } 
  catch (err) 
  {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => 
{
  try 
  {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const verifyToken = require('../middleware/auth'); 

router.get('/me', verifyToken, (req, res) => 
{ 
  res.json({ message: 'You are authenticated', userId: req.userId }); 
})

module.exports = router;