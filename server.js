import express from 'express';
import session from 'express-session';
import './helper/passport.js'; // Passport configuration
import connectDb from "./Db/connect.js"
import authRoutes from "./routes/v1/auth/index.js"
import uploadRoutes from "./routes/v1/upload/index.js"
import carRoutes from "./routes/v1/car/index.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import { config } from "dotenv";
import swaggerDocs from './swagger.js';

config({
  path: ".env"
});

// server configuration
const app = express();
const PORT = process.env.PORT || 5000;

// all middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: "abhaymishra",
//   cookie: { maxAge: 3600000 * 24 }
// }))


app.use(session({
  resave: false, // Recommended setting
  saveUninitialized: false, // Recommended setting
  secret: process.env.SESSION_SECRET || "abhaymishra", // Use an environment variable for security
  cookie: {
    maxAge: 3600000 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
    httpOnly: true, // Helps mitigate XSS attacks
    sameSite: 'lax' // Adjust as needed (e.g., 'strict' or 'none')
  }
}));


// route middlware
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/car', carRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

swaggerDocs(app, PORT);
// databse connection 
const databaseConnection = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.get("/", (req, res) => {
      res.send("Hi Welcome Spyne Backend")
    })
  } catch (error) {
    console.log(error);
  }
}
databaseConnection();
