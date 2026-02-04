import User from "../models/UserModel.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/OtpGenerator.js";
import sendOtpEmail from "../utils/OtpSender.js";

export const register = async (req, res) => {
  const { username, email, phone } = req.body;

  try {
    // Check if user exists
    let existingUser = await User.findOne({ email });

    // Create user ONLY if not exists
    if (!existingUser) {
      existingUser = await User.create({
        username,
        email,
        phone,
        isverified: false,
      });
    }

    // Remove old OTP if exists
    await Otp.deleteMany({ email });

    // Generate OTP
    const otp = generateOtp().toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP
    await Otp.create({ email, otp, expiresAt });

    // Send Email
    await sendOtpEmail(email, otp);

    console.log(`OTP for ${email}: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email });
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

    if (otpRecord.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpRecord.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP valid → verify user
    user.isverified = true;
    await user.save();

    // Delete OTP after success
    await Otp.deleteOne({ email });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
