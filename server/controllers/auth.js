import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register user */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* loging in */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // finds user
    const user = await User.findOne({ email: email });

    // if user doesn not match..
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // check if the password matches
    const isMatch = await bcrypt.compare(password, use.password);

    // if password does not matches
    if (!isMatch)
      return res.status(400).json({ msg: "Password does not matches" });

    // create a json web token with user id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    // returns user and the token
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
