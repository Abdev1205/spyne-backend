import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config({
  path: ".env"
});

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const matchPassword = bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7day" });
    console.log("body : ", req.body, "\n token : ", token);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    return res.status(200).json({ success: true, message: "User logged in successfully", user: existingUser });



  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid email or password.' });
  }
}

export default login