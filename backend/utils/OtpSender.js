import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
    if (!transporter) {
        console.log('Creating transporter with EMAIL_USER:', process.env.EMAIL_USER);
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            }
        });
    }
    return transporter;
};


const sendOtpEmail = async (to, otp) => {
    const transporter = getTransporter();
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
