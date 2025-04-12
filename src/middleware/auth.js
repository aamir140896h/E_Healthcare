import jwt from "jsonwebtoken";
const authenticateUser = (req, res, next) => {
  const token = req.header.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
  } catch (error) {
    return res.status(403).json({ message: "invalid token" });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbiden" });
    }
    next();
  };
};

export default { authenticateUser, authorizeRole };
