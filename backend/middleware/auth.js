import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
  
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Access Denied. No token provided." });
    }
  
    const token = authHeader.split(" ")[1]; 
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send({ message: "Invalid token." });
    }
  };

  export default auth
