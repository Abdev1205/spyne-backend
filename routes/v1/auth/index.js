import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { login, register, logout } from "../../../controller/auth/index.js"
import verifyToken from '../../../middleware/verifyToken.js';
import getUserData from '../../../controller/user/getUserData.js';

const router = Router();


/**
 * @openapi
 * /auth/google:
 *   get:
 *     description: Google OAuth login
 *     responses:
 *       200:
 *         description: Redirects to frontend after successful authentication
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     description: Google OAuth callback
 *     responses:
 *       200:
 *         description: Redirects to frontend after authentication and sets JWT in cookie
 */
router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/` }), async (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7day" });
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.redirect(`${process.env.FRONTEND_URL}/`);
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     description: Register a new user
 *     responses:
 *       201:
 *         description: User successfully registered
 */
router.post('/register', register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Login an existing user
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
router.post('/login', login)

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     description: Logout the current user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/logout', logout);

/**
 * @openapi
 * /auth/user:
 *   get:
 *     description: Get the user data (requires authentication)
 *     responses:
 *       200:
 *         description: Returns user data
 */
router.get('/user', verifyToken, getUserData);

export default router;
