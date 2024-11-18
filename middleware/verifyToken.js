import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("cookies value are : ", req.cookies)
  console.log("tokens value are ", token)
  if (!token) {
    return res.status(403).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    // console.log("user id from jwt decode", decoded.id, decoded);
    req.id = decoded.id;
    next();
  });
};


export default verifyToken;

