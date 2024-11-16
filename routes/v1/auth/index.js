import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { login, register, logout } from "../../../controller/auth/index.js"
import verifyToken from '../../../middleware/verifyToken.js';
import getUserData from '../../../controller/user/getUserData.js';

const router = Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/` }), async (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7day" });
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.redirect(`${process.env.FRONTEND_URL}/`);
});

router.post('/register', register);
router.post('/login', login)

// logout to user
router.get('/logout', logout);

router.get('/user', verifyToken, getUserData);

export default router;
