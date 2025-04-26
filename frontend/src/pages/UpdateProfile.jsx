import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/authSlice";

import { USER_API } from "@/constants/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({open,setOpen}) => {
  const navigate=useNavigate();
  const user=useSelector((store)=>store.auth.user);
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState({
    name: user.name ||"",
    email: user.email ||"",
    college: user.college ||"",
    address: user.address ||"",
    gender: user.gender ||"",
    hobbies: user.hobbies?.join(",") || "", //convert to string
    studyHabits: user.studyHabits ||"",
    sleepPattern: user.sleepPattern ||"",
    cleanliness: user.cleanliness ||"",
    noiseTolerance: user.noiseTolerance ||"",
    smoking: user.smoking ||false,
    drinking: user.drinking ||false,
    bio: user.bio ||"",
    // avatarUrl: user.avatarUrl ||"",
  })
  const dispatch=useDispatch();
  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const fileChangeHandler=(e)=>{
    const file=e.target.files[0];
    setInput({...input,avatarUrl:input.avatarUrl})
  }
  const handleSelectChange=(name,value)=>{
    setInput({...input,[name]:value})
  }
  const handleCheckboxChange=(name)=>{
    setInput({...input,[name]:!input[name]})
  }
  const handleSave=async(e)=>{
    e.preventDefault();
   
    
    const formData=new FormData();
   // Prepare JSON payload
   const payload = {
    name: input.name,
    email: input.email,
    college: input.college,
    address: input.address,
    gender: input.gender,
    hobbies: input.hobbies, // Send as comma-separated string
    studyHabits: input.studyHabits,
    sleepPattern: input.sleepPattern,
    cleanliness: input.cleanliness,
    noiseTolerance: input.noiseTolerance,
    smoking: input.smoking,
    drinking: input.drinking,
    bio: input.bio,
  };
  console.log("Sending payload:", payload);
    // if(input.avatarUrl)
    // formData.append("avatarUrl",input.avatarUrl);
    try{
      setLoading(true);
      const res=await axios.put(`${USER_API}/profile/${user.id}`,payload,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      });
      if(res.data.success){
        dispatch(setUser(res.data.updatedUser));
        toast.success(res.data.message ||"Profile updated successfully");
        navigate("/profile");
        setOpen(false);
      }

    }
    catch(error){
      console.error("Error updating profile:",error);
      toast.error(error.response.data.message, "Error updating profile");
    }
    finally{
      setLoading(false);
    }
  }
  const handleCancel=()=>{
    setOpen(false);
  }
  return (
      
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto" onInteractOutside={()=>setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSave}>
      {/* <div className="flex flex-col items-center mb-4">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <Label htmlFor="avatar" className="text-gray-700 font-medium">
          Profile Picture
        </Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          // onChange={fileChangeHandler}
          className="mt-2 w-full max-w-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 font-medium">Name</Label>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="text-gray-700 font-medium">College</Label>
          <Input
            type="text"
            name="college"
            value={input.college}
            onChange={changeEventHandler}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Address</Label>
          <Input
            type="text"
            name="address"
            value={input.address}
            onChange={changeEventHandler}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Gender</Label>
          <Select
            value={input.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Prefer not to say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Study Habits</Label>
          <Select
            value={input.studyHabits}
            onValueChange={(value) => handleSelectChange("studyHabits", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Study Habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Night Owl">Night Owl</SelectItem>
              <SelectItem value="Early Bird">Early Bird</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Sleep Pattern</Label>
          <Select
            value={input.sleepPattern}
            onValueChange={(value) => handleSelectChange("sleepPattern", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Sleep Pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light Sleeper">Light Sleeper</SelectItem>
              <SelectItem value="Heavy Sleeper">Heavy Sleeper</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Cleanliness</Label>
          <Select
            value={input.cleanliness}
            onValueChange={(value) => handleSelectChange("cleanliness", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Cleanliness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Very Tidy">Very Tidy</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
              <SelectItem value="Messy">Messy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Noise Tolerance</Label>
          <Select
            value={input.noiseTolerance}
            onValueChange={(value) =>
              handleSelectChange("noiseTolerance", value)
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Noise Tolerance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={input.smoking}
            onCheckedChange={() => handleCheckboxChange("smoking")}
          />
          <Label className="text-gray-700 font-medium">Smoking</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={input.drinking}
            onCheckedChange={() => handleCheckboxChange("drinking")}
          />
          <Label className="text-gray-700 font-medium">Drinking</Label>
        </div>
      </div>
      <div>
              <Label className="text-gray-700 font-medium">Hobbies</Label>
              <Input
                type="text"
                name="hobbies"
                value={input.hobbies}
                onChange={changeEventHandler}
                placeholder="e.g., Reading, Gaming, Hiking"
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
      <div>
        <Label className="text-gray-700 font-medium">Bio</Label>
        <Textarea
          name="bio"
          value={input.bio}
          onChange={changeEventHandler}
          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>
     
    </form>
    <DialogFooter>
     
        <div className="grid grid-cols-2 gap-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
          disabled={loading}
          onClick={handleSave}
        >
           {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    
    </DialogFooter>
      </DialogContent>
     </Dialog>

   
  );
};

export default UpdateProfile;




