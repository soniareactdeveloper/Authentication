const userSchema = require("../models/userSchema");

const registration = async (req, res) => {
  try {
    const { fullname, email, password, avatar } = req.body;

    if (!fullname) return res.status(400).json({ error: "fullname is required" });
    if (!email) return res.status(400).json({ error: "email is required" });
    if (!password) return res.status(400).json({ error: "password is required" });

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });
    

    const user = new userSchema({
      fullname,
      email,
      password,
      avatar
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


const login = (req, res) => {
  res.send("Login route");
};

module.exports = { registration, login };
