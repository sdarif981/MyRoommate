import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// user.controller.js or updateProfile
import cloudinary from "../utils/cloudinary.js"; // ✅ correct, default export


import getDataUri from "../utils/datauri.js";


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};



// Already assume you've set Cloudinary config in a separate file
// cloudinary.config({ cloud_name, api_key, api_secret });



export const updateProfile = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No data provided", success: false });
    }

    const {
      name,
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
    } = req.body;

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (name) user.name = name;
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      user.email = email;
    }

    if (college) user.college = college;
    if (address) user.address = address;
    if (gender) user.gender = gender;
    if (hobbies) {
      user.hobbies = hobbies
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h !== "");
    }

    if (studyHabits) user.studyHabits = studyHabits;
    if (sleepPattern) user.sleepPattern = sleepPattern;
    if (cleanliness) user.cleanliness = cleanliness;
    if (noiseTolerance) user.noiseTolerance = noiseTolerance;
    if (smoking !== undefined) user.smoking = Boolean(smoking);
    if (drinking !== undefined) user.drinking = Boolean(drinking);
    if (bio) user.bio = bio;

    // ✅ Cloudinary Upload Logic
    console.log("Using Cloudinary config:", cloudinary.config());

   if (req.file) {
  const fileUri = getDataUri(req.file);
  console.log("Uploading to Cloudinary...");

  const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
    folder: "myroommate/profiles",
  });

  // console.log("Upload success:", cloudResponse.secure_url);

  if (cloudResponse && cloudResponse.secure_url) {
    user.avatarUrl = cloudResponse.secure_url;
  }
}



    await user.save();

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      college: user.college,
      address: user.address,
      gender: user.gender,
      hobbies: user.hobbies,
      studyHabits: user.studyHabits,
      sleepPattern: user.sleepPattern,
      cleanliness: user.cleanliness,
      noiseTolerance: user.noiseTolerance,
      smoking: user.smoking,
      drinking: user.drinking,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error.message, error.stack);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};



export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
   
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const findRoommate = async (req, res) => {
  try {

  
    const { searchQuery, filters ,users,currentUserId } = req.body;
    if(!req.body){
      console.log("No data provided in request body");
      return res.status(400).json({ message: "No data provided", success: false });
    }
    if (!users) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }
   
    const regex = searchQuery ? new RegExp(searchQuery, "i") : null;

    const filteredArray = users.filter((user) => {
      if(user._id===currentUserId){
        return false;
      }
      const match =
        !regex ||
        regex.test(user.name) ||
        regex.test(user.college) ||
        regex.test(user.address) ||
        regex.test(user.bio) ||
        (Array.isArray(user.hobbies) &&
          user.hobbies.some((hobby) => regex.test(hobby)));
      const matchFilters =
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.studyHabits || user.studyHabits === filters.studyHabits) &&
        (!filters.sleepPattern || user.sleepPattern === filters.sleepPattern) &&
        (!filters.cleanliness || user.cleanliness === filters.cleanliness) &&
        (!filters.noiseTolerance ||
          user.noiseTolerance === filters.noiseTolerance) &&
        (!filters.smoking || user.smoking === filters.smoking) &&
        (!filters.drinking || user.drinking === filters.drinking);
      return match && matchFilters;
    });

    res.status(200).json({ success: true, filteredArray });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error", success: false });
  }
};


export const getOtherUsers=async(req,res)=>{
  try{
     const currentUserId=req.id;
     const otherUsers=await User.find({_id:{$ne:currentUserId}}).select("-password");
     return res.status(200).json(
      otherUsers,
     )
  }
  catch(error){
    console.error(error.message || error);
    return res.status(500).json({message:error.message || "Internal server error"});
  }
}