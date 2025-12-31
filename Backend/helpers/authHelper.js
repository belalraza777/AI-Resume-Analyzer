const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const NODE_ENV = process.env.NODE_ENV || "development";
const JWT_SECRET = process.env.JWT_SECRET;

// Token lifetimes
const ACCESS_TOKEN_EXPIRY = "15m";
const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Create short-lived JWT access token
const generateAccessToken = (userId) =>
    jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

// Create opaque refresh token (random string)
const generateRefreshToken = () =>
    crypto.randomBytes(64).toString("hex");

// Set auth cookies (HTTP-only)
const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        maxAge: ACCESS_TOKEN_MAX_AGE_MS,
        path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        maxAge: REFRESH_TOKEN_MAX_AGE_MS,
        path: "/auth/refresh",
    });
};

// Clear auth cookies on logout or invalid refresh
const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
};

module.exports = {
    ACCESS_TOKEN_EXPIRY,
    ACCESS_TOKEN_MAX_AGE_MS,
    REFRESH_TOKEN_MAX_AGE_MS,
    generateAccessToken,
    generateRefreshToken,
    setAuthCookies,
    clearAuthCookies,
};
