import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String },
  address: { type: String },
  gender: { type: String ,enum:["Male","Female","Other","Prefer not to say"]},
  hobbies: [String],
  studyHabits: { type: String, enum:["Night Owl","Early Bird","Flexible"]},
  sleepPattern: { type: String ,enum:["Light Sleeper","Heavy Sleeper","Flexible"]},
  cleanliness: { type: String ,enum:["Very Tidy","Average","Messy"]},
  noiseTolerance: { type: String ,enum:["Low","Medium","High"]},
  smoking: { type: Boolean, default: false },
  drinking: { type: Boolean, default: false },
  bio: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});
 
export default mongoose.model("User",userSchema)