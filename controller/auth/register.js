import User from "../../models/user.js";
import bcrypt from 'bcrypt';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // Check if the user has registered via Google
      if (existingUser.googleId && !existingUser.password) {
        // User registered via Google and does not have a password
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.status(200).json({ success: true, message: 'Password set successfully. You can now log in using your email and password.', user: existingUser });
      } else if (existingUser.password) {
        // User already registered with email and password
        return res.status(400).json({ success: false, message: 'Email already registered. Please log in.' });
      } else {
        // Other case where the user exists but no password or googleId (this shouldn't usually happen)
        return res.status(400).json({ success: false, message: 'Email already registered. Please log in.' });
      }
    }

    // New user registration
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      googleId: null
    });
    console.log("new user ", newUser, "\n password: ", password);
    const user = await newUser.save();
    return res.status(201).json({ success: true, message: 'Registration successful.', user: user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.', error });
  }
}

export default register;
