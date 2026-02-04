import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"NodeMail" <${process.env.EMAIL_USER}>`,
    to,
    subject: "NodeMail | DigiBank OTP Verification",
    html: `<h2>Your OTP is <b>${otp}</b></h2><p>Valid for 10 minutes</p>`,
  });
};

export default sendOtpEmail;
