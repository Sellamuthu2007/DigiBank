import user from '../models/UserModel.js';
import otpmodel from '../models/Otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateOtp from '../utils/OtpGenerator.js';


export const register = async (req , res) => {
    const {username , email , phone } = req.body;

    try{
        // check if user already exists
        const existingUser = await user.findOne({ email });
        if(existingUser){
            return res.status(400).json({message : 'User already exists'});
        }


        // create new user
        const newUser = new user({
            username,
            email,
            phone,
            isverified: false
        });

        const otp = generateOtp();
        
        const expiresAt = Date.now() + 10 * 60 * 1000; // otp valid for 10 minutes
        
        const newOtp = new otpmodel({
            email,
            otp,
            expiresAt
        });

        const otp_data = await otpmodel.create(newOtp);

        console.log(`OTP for ${email}: ${otp}`);


        const usercreated = await user.create(newUser);

        return res.status(201).json({message : "user registered successfully" , user : usercreated , otp : otp_data});
    }
    catch(err){
       return  res.status(500).json({message : "server error"});
    }
}


export const verifyOtp = async (req , res) => {
    const { email , otp  } = req.body;

    try{
        // find user by phone number
        const finduser = await otpmodel.findOne({ email });
        if(!finduser){
            return res.status(400).json({message : "user not found"});
        }
        
        //verify otp
        if(finduser.expiresAt < Date.now()){
            return res.status(400).json({message: "otp expired"});
        }

        //check otp
        if(finduser.otp !== otp){
            return res.status(400).json({message: "invalid otp"});
        }

          await user.updateOne(
           { email },
           { isverified: true }
          );

          await otpmodel.deleteOne({ email }); // Removes old OTP if exists

        return res.status(200).json({message: "otp verified successfully"});
    }
    catch(err){
        return res.status(500).json({message: "server error"});
    }
}
