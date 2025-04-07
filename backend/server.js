import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/user",userRouter);

app.listen(PORT,()=>{
  connectDB();
  console.log(`Server is running on port ${PORT}`);
})

app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status(500).send("Something went wrong");
})

