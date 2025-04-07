import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
      name,
      email,
      password:hashedPassword,

    })
    await newUser.save();
    res.status(201).json({message:"User created successfully",success:true});
  }catch(error){
   console.log(error);
   res.status(500).json({message:"Internal server error",success:false});
  }
    
}

export const login = async (req,res)=>{
  try {
    const {email,password}=req.body;
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password",success:false});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).json({message:"Invalid password",success:false});
    }
   const tokenData={
    id:user._id,
   }
   const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1h"});
   user={
    id:user._id,
    name:user.name,
    email:user.email,
   }
   return res.status(200).cookie("token",token,{httpOnly:true,secure:true,maxAge:1*24*60*60*1000}).json({message:"Login successful",user,success:true});
   
  } catch (error) {
    console.log(error);
   return res.status(500).json({message:"Internal server error",success:false});
  }
}

export const logout = async (req,res)=>{
  try {
    return res.status(200).clearCookie("token").json({message:"Logout successful",success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}

export const getProfile = async (req,res)=>{
  try {
    const user=await User.findById(req.id);
    if(!user){
      return res.status(400).json({message:"User not found",success:false});
    }
    return res.status(200).json({user,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}

export const updateProfile = async (req,res)=>{
  try {
    
    const {name, 
      email, 
      college, 
      address, 
      gender, 
      hobbies, 
      studyHabits, 
      sleepPattern, 
      cleanliness, 
      noiseTolerance, 
      smoking, 
      drinking, 
      bio, 
      avatarUrl,}=req.body;
    let user=await User.findById(req.id);
    if(!user){
      return res.status(400).json({message:"User not found",success:false});
    }
    let hobbiesArray;
 if(hobbies){
  hobbiesArray=hobbies.split(",");
 }
 if(name){
  user.name=name;
 }
 if(email){
  user.email=email;
 }
 
 if(college){
  user.college=college;
 }  
 if(address){
  user.address=address;
 }
 if(gender){
  user.gender=gender;
 }
 if(hobbiesArray){
  user.hobbies=hobbiesArray;
 }
 if(studyHabits){
  user.studyHabits=studyHabits;
 }
 if(sleepPattern){
  user.sleepPattern=sleepPattern;
 }
 if(cleanliness){
  user.cleanliness=cleanliness;
 }
 if(noiseTolerance){
  user.noiseTolerance=noiseTolerance;
 }
 if(smoking){
  user.smoking=smoking;
 }
 if(drinking){
  user.drinking=drinking;
 }
 if(bio){
  user.bio=bio;
 }
 await user.save();
 user={
  id:user._id,
  name:user.name,
  email:user.email,
  college:user.college,
  address:user.address,
  gender:user.gender,
  hobbies:user.hobbies,
  studyHabits:user.studyHabits,
  sleepPattern:user.sleepPattern,
  cleanliness:user.cleanliness,
  noiseTolerance:user.noiseTolerance,
  smoking:user.smoking,
  drinking:user.drinking,
  bio:user.bio,
  avatarUrl:user.avatarUrl,
 }
 return res.status(200).json({message:"Profile updated successfully",user,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}

export const fetchAllUsers = async (req,res)=>{
  try {
    const users=await User.find();
     if(!user){
      return res.status(400).json({message:"User not found",success:false});
    }
    return res.status(200).json({users,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}

export const fetchUserById = async (req,res)=>{
  try {
    const user=await User.findById(req.params.id);
    if(!user){
      return res.status(400).json({message:"User not found",success:false});
    }
    return res.status(200).json({user,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}


export const findRoommate=async(req,res)=>{
  try {
    const user=await Users.find();
    if(!user){
      return res.status(400).json({message:"User not found",success:false});
    }

    const filteredArray=[];
    

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error",success:false});
  }
}
