const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
    REFRESH_TOKEN_MAX_AGE_MS,
    generateAccessToken,
    generateRefreshToken,
    setAuthCookies,
    clearAuthCookies,
} = require("../helpers/authHelper");

// --------------------------------------------------
// Register
// --------------------------------------------------

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Ensure unique email/username
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    // Hash password before saving
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    // Store hashed refresh token and expiry
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
        success: true,
        message: "Account created",
        data: { id: user._id, username, email },
    });
};

// --------------------------------------------------
// Login
// --------------------------------------------------

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate credentials
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    // Rotate refresh token
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
        success: true,
        message: "Login successful",
        data: { id: user._id, username: user.username, email: user.email },
    });
};

// --------------------------------------------------
// Refresh Access Token
// --------------------------------------------------

exports.refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Missing refresh token",
        });
    }

    // Find the user whose stored refresh token hash matches the presented token
    const candidates = await User.find({
        refreshTokenExpiresAt: { $gt: new Date() },
        refreshTokenHash: { $ne: null },
    });

    let user = null;
    for (const candidate of candidates) {
        if (await bcrypt.compare(refreshToken, candidate.refreshTokenHash)) {
            user = candidate;
            break;
        }
    }

    if (!user) {
        clearAuthCookies(res);
        return res.status(401).json({
            success: false,
            message: "Invalid refresh token",
        });
    }

    // Rotate refresh token and issue new access token
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken();

    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);
    await user.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({
        success: true,
        message: "Token refreshed",
    });
};

// --------------------------------------------------
// Get Current User 
// --------------------------------------------------

exports.getMe = async (req, res) => {
    res.json({
        success: true,
        data: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};

// --------------------------------------------------
// Logout
// --------------------------------------------------

exports.logoutUser = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    // Revoke matching refresh token server-side
    if (refreshToken) {
        const candidates = await User.find({
            refreshTokenExpiresAt: { $gt: new Date() },
            refreshTokenHash: { $ne: null },
        }).select('+refreshTokenHash');

        for (const candidate of candidates) {
            if (await bcrypt.compare(refreshToken, candidate.refreshTokenHash)) {
                candidate.refreshTokenHash = null;
                candidate.refreshTokenExpiresAt = null;
                await candidate.save();
                break;
            }
        }
    }

    clearAuthCookies(res);

    res.json({
        success: true,
        message: "Logged out",
    });
};
