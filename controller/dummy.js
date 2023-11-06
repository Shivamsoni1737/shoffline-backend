const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dregister = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, phone });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "Shoffline India", {
      expiresIn: "1h",
    });
    // const token = await User.generateToken();

    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { dregister };
