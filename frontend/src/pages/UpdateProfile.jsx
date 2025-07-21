import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const UpdateProfile = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: user.name || "",
    email: user.email || "",
    college: user.college || "",
    address: user.address || "",
    gender: user.gender || "",
    hobbies: user.hobbies?.join(",") || "",
    studyHabits: user.studyHabits || "",
    sleepPattern: user.sleepPattern || "",
    cleanliness: user.cleanliness || "",
    noiseTolerance: user.noiseTolerance || "",
    smoking: user.smoking || false,
    drinking: user.drinking || false,
    bio: user.bio || "",
    avatar: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, avatar: file });
    }
  };

  const handleSelectChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const handleCheckboxChange = (name) => {
    setInput({ ...input, [name]: !input[name] });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    console.log("input.smoking:", input.smoking, typeof input.smoking);
    console.log("input.drinking:", input.drinking, typeof input.drinking);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("college", input.college);
    formData.append("address", input.address);
    formData.append("gender", input.gender);
    formData.append("hobbies", input.hobbies);
    formData.append("studyHabits", input.studyHabits);
    formData.append("sleepPattern", input.sleepPattern);
    formData.append("cleanliness", input.cleanliness);
    formData.append("noiseTolerance", input.noiseTolerance);
    formData.append("smoking", input.smoking === true); // Ensure boolean
    formData.append("drinking", input.drinking === true); // Ensure boolean
    formData.append("bio", input.bio);

    if (input.avatar) {
      formData.append("avatarUrl", input.avatar);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API}/profile/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        const normalizedUser = {
          ...res.data.updatedUser,
          smoking: !!res.data.updatedUser.smoking, // Convert to boolean
          drinking: !!res.data.updatedUser.drinking, // Convert to boolean
        };
        dispatch(setUser(normalizedUser));
        toast.success(res.data.message || "Profile updated successfully");
        navigate("/profile");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={
                  input.avatar
                    ? URL.createObjectURL(input.avatar)
                    : user.avatarUrl || ""
                }
                alt={user.name}
              />
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
              onChange={fileChangeHandler}
              className="mt-2 w-full max-w-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>College</Label>
              <Input
                type="text"
                name="college"
                value={input.college}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={input.address}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={input.gender}
                onValueChange={(val) => handleSelectChange("gender", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Study Habits</Label>
              <Select
                value={input.studyHabits}
                onValueChange={(val) => handleSelectChange("studyHabits", val)}
              >
                <SelectTrigger>
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
              <Label>Sleep Pattern</Label>
              <Select
                value={input.sleepPattern}
                onValueChange={(val) => handleSelectChange("sleepPattern", val)}
              >
                <SelectTrigger>
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
              <Label>Cleanliness</Label>
              <Select
                value={input.cleanliness}
                onValueChange={(val) => handleSelectChange("cleanliness", val)}
              >
                <SelectTrigger>
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
              <Label>Noise Tolerance</Label>
              <Select
                value={input.noiseTolerance}
                onValueChange={(val) =>
                  handleSelectChange("noiseTolerance", val)
                }
              >
                <SelectTrigger>
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
              <Label>Smoking</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={input.drinking}
                onCheckedChange={() => handleCheckboxChange("drinking")}
              />
              <Label>Drinking</Label>
            </div>
          </div>

          <div>
            <Label>Hobbies</Label>
            <Input
              type="text"
              name="hobbies"
              value={input.hobbies}
              onChange={changeEventHandler}
              placeholder="e.g., Reading, Gaming"
            />
          </div>

          <div>
            <Label>Bio</Label>
            <Textarea
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              rows={3}
            />
          </div>
        </form>

        <DialogFooter>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;