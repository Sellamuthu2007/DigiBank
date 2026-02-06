import user from '../models/student/UserModel.js';
import otpmodel from '../models/Otp.js';
import Institution_user from '../models/Institution/InstitutionUser.js'
import organization_user from '../models/Organization/OrganizationUser.js'
import jwt from 'jsonwebtoken';
import generateOtp from '../utils/OtpGenerator.js';
import sendOtpEmail from '../utils/OtpSender.js';

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

    if (String(otpRecord.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP valid → verify user
    user.isverified = true;
    await user.save();

    // Delete OTP after success
    await Otp.deleteOne({ email });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallback_secret",
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

export const login = async (req , res) => {
    const { email } = req.body;

    try{
        const findUser = await user.findOne({ email });

        if(!findUser){
            return res.status(400).json({message : "user not found"});
        }

        if(!findUser.isverified){
            return res.status(400).json({message : "user not verified"});
        }

        while(true){
            const already_otp_exist = await otpmodel.findOne({email});
            if(already_otp_exist){
              await otpmodel.deleteOne({email});
            }
            else{
              break;
            }
        }

        const otp = generateOtp();
        const expiresAt = Date.now() + 10 * 60 * 1000; // otp valid for 10 minutes

        // create new otp
        const newOtp = new otpmodel({
            email,
            otp,
            expiresAt
        });
        sendOtpEmail(email, otp).then(() => {
            console.log('OTP email sent successfully');
        }).catch((emailErr) => {
            console.error('Failed to send OTP email:', emailErr);
        }); 

        const otp_data = await otpmodel.create(newOtp);

         // Send OTP email to user
        try {
            await sendOtpEmail(email, otp);

            console.log('OTP email sent successfully');
        } catch (emailErr) {
            console.error('Failed to send OTP email:', emailErr);
            // Optionally, you can return an error or continue
        }

        console.log(`OTP for ${email}: ${otp}`);

        return res.status(200).json({message : "login successful" , otp : otp_data});
    }
    catch(error){
        return res.status(500).json({message : "server error"});
    }
}



// Institution register and login handling

export const Institution_register = async (req , res) => {
    const {name , phoneNumber , email , password} = req.body;

    try{
        const existingPhone = await Institution_user.findOne({phone_number: phoneNumber});

        if(existingPhone){
            return res.status(400).json({message : 'user with phone already exists'});
        }

        const existingEmail = await Institution_user.findOne({email});

        if(existingEmail){
           return  res.status(400).json({message : 'user with this mail already exists'});
        }

        //creating a new Institution user
        const new_institution = new Institution_user({
            name,
            phone_number: phoneNumber,
            email,
            password
        });

        //save user to database
        const savedUser = await new_institution.save();

        //user created send response

        return res.status(200).json({message : 'user created successfully' , user : savedUser});

    }
    catch(err){
       return res.status(500).json({message : 'server error'});
    }
}

// instituion login handling

export const Institution_login = async (req,res) => {
    const {email , password} = req.body;

    try{
       
        const findUser = await Institution_user.findOne({email});

        if(!findUser){
            return res.status(400).json({message : 'user with this mail not exists'});
        }

        //check password
        if(findUser.password !== password){
            return res.status(400).json({message : 'password is incorrect try again'});
        }

         const token = jwt.sign(
            {userId : findUser._id},
            process.env.JWT_SECRET || "fallback_secret",
            {expiresIn: '1h'},
        )

        console.log(token)

        return res.status(200).json({message : 'login successful', token});
    }
    catch(err){
        return res.status(500).json({message : "server error"});
    }
}


// register and login for organization can be implemented in similar way as institution with some changes in model and controller

export const organization_register = async (req , res) => {
    const {name , phoneNumber , email , password} = req.body;

    try{
       const existingPhone = await organization_user.findOne({phone_number: phoneNumber});

       if(existingPhone){
        return res.status(400).json({message : 'user with phone already exists'});
       }

       const existingEmail = await organization_user.findOne({email});

       if(existingEmail){
        return res.status(400).json({message : 'user with this mail already exists'});
       }

         //creating a new organization user

         const new_organization = new organization_user({
            name,
            phone_number: phoneNumber,
            email,
            password
         });

        //save user to database
        const savedUser = await new_organization.save();

        //user created send response
        return res.status(200).json({message : 'user created successfully' , user : savedUser});
    }
    catch(err){
        return res.status(500).json({message : 'server error'});
    }
}


export const organization_login = async (req,res) => {
     const {email , password} = req.body;

     try{
        const findUser = await organization_user.findOne({email});

        if(!findUser){
            return res.status(400).json({message : 'user with this mail not exists'});
        }

        //check password
        if(findUser.password !== password){
            return res.status(400).json({message : 'password is incorrect try again'});
        }

          const token = jwt.sign(
            {userId : findUser._id},
            process.env.JWT_SECRET || "fallback_secret",
            {expiresIn: '1h'},
        )

        console.log(token)

        return res.status(200).json({message : 'login successful', token});
     }
     catch(err){
        return res.status(500).json({message : "server error"});
     }
}
