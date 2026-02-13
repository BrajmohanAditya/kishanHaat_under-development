const jwt = require("jsonwebtoken");

const sendToken = async (user, statusCode, res) => {
  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  // Cookie options: production should use secure + SameSite=None (for cross-site cookies)
  // For local development we set secure=false but still use SameSite=None to allow cross-site XHRs.
  // NOTE: Browsers require Secure when SameSite=None on non-localhost; ensure HTTPS in production.
  // Fix for local development: SameSite=None requires Secure=true.
  // In dev (HTTP), we cannot use Secure=true, so we must use SameSite=Lax (or default).
  const isProduction = process.env.NODE_ENV === "production";

  const accessCookieOpts = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 12 * 60 * 60 * 1000, // 12 hours
  };

  const refreshCookieOpts = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("accessToken", accessToken, accessCookieOpts);
  res.cookie("refreshToken", refreshToken, refreshCookieOpts);
  res.status(statusCode).json({
    success: true,
    user,
  });
};
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  }); // Short-lived
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  ); // Long-lived
};

module.exports = { sendToken, generateAccessToken, generateRefreshToken };
