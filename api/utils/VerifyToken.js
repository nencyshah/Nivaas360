import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    // Accept either Bearer header or cookie
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    const cookieToken = req.cookies?.access_token || null;
    const token = bearerToken || cookieToken;

    console.log("=== VerifyToken Debug ===");
    console.log("Origin:", req.headers.origin);
    console.log("Method:", req.method);
    console.log("Path:", req.path);
    console.log("All Cookies:", req.cookies);
    console.log("authHeader:", authHeader);
    console.log("bearerToken:", bearerToken);
    console.log("cookieToken:", cookieToken);
    console.log("Final token:", token ? "EXISTS" : "MISSING");
    console.log("========================");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: token missing" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info for downstream checks
    req.user = { id: payload.id || payload._id, role: payload.role };
    
    console.log("Token verified for user:", req.user.id);
    return next();
  } catch (err) {
    console.log("Token verification error:", err.message);
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized: token invalid or expired",
      });
  }
};
