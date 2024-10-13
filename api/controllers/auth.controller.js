import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    // saving the new user
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return "User not found";
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return "Wrong credentials";
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // seperating password and other user credentials
    const { password: hashedPassword, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};
