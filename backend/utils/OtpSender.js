import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // must be 'user', not 'email'
        pass: process.env.EMAIL_PASS, // must be 'pass', not 'pwd'
    }
});

const sendOtpEmail = async (to, otp) => {
    const mailContent = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your OTP to Login into DigiBank',
        text: `Your OTP: ${otp}. OTP will expire within 10 minutes`,
    };
    try {
        const info = await transporter.sendMail(mailContent);
        console.log(`Nodemailer response:`, info);
        if (info.accepted && info.accepted.length > 0) {
            console.log(`OTP email sent to: ${to}`);
        } else {
            console.log(`OTP email NOT accepted by server for: ${to}`);
        }
    } catch (error) {
        console.log(`Error while sending OTP:`, error);
        throw error;
    }
}

export default sendOtpEmail;

