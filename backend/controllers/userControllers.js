const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


const generateOTP = () => {
    const random = Math.random() * 999999;
    const round = Math.round(random);
    return round;
};

const sendMail = (email, f_name, l_name, otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    const options = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "OTP for account verification",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <!-- Header with Background Color Matching the Theme -->
        <div style="background-color: #4A90E2; padding: 10px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThoygDOSph18M0UCM6Ki3w7UNMFAtxfmS6nA&s" alt="App Logo" style="display: block; margin: 0 auto; width: 100px; height: auto;">
        </div>

        <!-- Main Content -->
        <div style="padding: 20px; text-align: center; background-color: #f9f9f9;">
          <h1 style="color: #333; font-size: 24px;">Welcome, ${f_name.toUpperCase()}!</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Thank you for joining our app! We’re thrilled to have you on board. To complete your registration, please verify your email address by entering the OTP below:
          </p>
          
          <!-- OTP Code -->
          <div style="font-size: 24px; color: #4A90E2; font-weight: bold; margin: 20px 0;">${otp}</div>

          <p style="color: #777; font-size: 14px; line-height: 1.5;">
            If you did not request this email, please ignore it.
          </p>
        </div>

        <!-- Footer with Matching Background Color -->
        <div style="background-color: #4A90E2; padding: 10px; text-align: center; color: #ffffff; font-size: 14px;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Our App. All rights reserved.</p>
          <p style="margin: 0;">Contact us at <a href="mailto:support@ourapp.com" style="color: #ffffff; text-decoration: underline;">support@ourapp.com</a></p>
        </div>
      </div>
    `,
    };

    transporter.sendMail(options, (err,info)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("Email Sent Successfully!");
        }
    });

};


const registerUser = asyncHandler(async (req,res) =>{
    
    const {f_name, l_name, dob, gender, m_mail, password} = req.body;

    // Check if user enters all fields or not

    if(!f_name || !l_name || !dob || !gender || !m_mail || !password){
        res.status(400);
        throw new Error("Please Enter All Fields");
    };


    const hashedPassword = await bcrypt.hash(password, 10);

    const checkMail = await userModel.findOne({
        m_mail,
    });

    if(checkMail){
        res.status(401);
        throw new Error("Email already Exists!")
    }

    const otp = generateOTP();

    const createdUser = await userModel.create({
        f_name,
        l_name,
        dob,
        gender,
        m_mail,
        password : hashedPassword,
        otp,
    });


    // send mail
    
    sendMail(m_mail, f_name, l_name, otp);


    res.send(createdUser);
    

});

// Login the user

const loginUser = asyncHandler(async(req,res) => {
    const {m_mail, password} = req.body;
    // Check if user is entering the data or not
    if(!m_mail || !password){
      res.status(400);
      throw new Error("Please Enter Credentials!");
    }
    // check if email is already existed or not
    const checkEmail = await userModel.findOne({m_mail})
    // throw error if user Existed
    if(!checkEmail){
      res.status(404)
      throw new Error("Invalid Email / Phone");
    }

    if(checkEmail && (await bcrypt.compare(password, checkEmail.password))){
      res.send(checkEmail)
    }else{
      res.status(401);
      throw new Error("Invalid Password");
    }
});


const verifyOTP = asyncHandler(async(req,res)=>{
  const user_id = req.params.user_id;
  const {otp} = req.body;

  const finduser = await userModel.findById(user_id);

  if(!finduser){
    res.status(404);
    throw new Error("User Not Found")
  }

  if(!otp){
    res.status(404);
    throw new Error("Please Enter the OTP");

  }

  if(finduser.otp == otp){
    finduser.otp = null;
    await finduser.save();  
    res.send(finduser);
  }else{
    res.status(401);
    throw new Error("Invalid OTP");
  }


});

module.exports = {
    registerUser,
    loginUser,
    verifyOTP,
};