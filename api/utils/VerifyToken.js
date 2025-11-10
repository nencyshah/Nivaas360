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

    console.log("VerifyToken authHeader:", authHeader);
    console.log("VerifyToken bearerToken:", bearerToken);
    console.log("VerifyToken cookieToken:", cookieToken);
    console.log("VerifyToken token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: token missing" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info for downstream checks
    req.user = { id: payload.id || payload._id, role: payload.role };

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized: token invalid or expired",
      });
  }
};
