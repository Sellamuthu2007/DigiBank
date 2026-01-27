import user from '../models/UserModel.js';
import otpmodel from '../models/Otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateOtp from '../utils/OtpGenerator.js';


export const register = async (req , res) => {
    const {username , email , phone } = req.body;

    try{
        // check if user already exists
        console.log('Checking existing user with email:', email);
        const existingUser = await user.findOne({ email });
        if(existingUser){
            console.log('User already exists with email:', email);
            return res.status(400).json({message : 'User already exists'});
        }

        // Check for existing phone
        console.log('Checking existing phone:', phone);
        const existingPhone = await user.findOne({ phone });
        if(existingPhone){
            console.log('Phone already exists:', phone);
            return res.status(400).json({message : 'Phone number already exists'});
        }

        // create new user
        console.log('Creating new user object...');
        const newUser = new user({
            username,
            email,
            phone,
            isverified: false
        });

        console.log('Generating OTP...');
        const otp = generateOtp();
        
        const expiresAt = Date.now() + 10 * 60 * 1000; // otp valid for 10 minutes
        
        console.log('Creating OTP object...');
        const newOtp = new otpmodel({
            email,
            otp,
            expiresAt
        });

        console.log('Saving OTP to database...');
        const otp_data = await otpmodel.create(newOtp);
        console.log('OTP saved successfully');

        console.log(`OTP for ${email}: ${otp}`);

        console.log('Saving user to database...');
        const usercreated = await user.create(newUser);
        console.log('User saved successfully');

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
