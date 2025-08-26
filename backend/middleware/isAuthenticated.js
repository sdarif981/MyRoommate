import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next)=>{
  try {
    const token=req.cookies.token;
    // console.log(token);
    if(!token){
        return res.status(401).json({message:"Unauthorized",success:false});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.id=decoded.id;
    //  console.log(req.id);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({message:"Unauthorized",success:false});
  }
}

