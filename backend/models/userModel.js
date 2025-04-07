import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String },
  address: { type: String },
  gender: { type: String ,enum:["male","female"]},
  hobbies: [String],
  studyHabits: { type: String, enum:["night owl","early bird","flexible"]},
  sleepPattern: { type: String ,enum:["light sleeper","heavy sleeper","flexible"]},
  cleanliness: { type: String ,enum:["very tidy","average","messy"]},
  noiseTolerance: { type: String ,enum:["low","medium","high"]},
  smoking: { type: Boolean, default: false },
  drinking: { type: Boolean, default: false },
  bio: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});
 
export default mongoose.model("User",userSchema)