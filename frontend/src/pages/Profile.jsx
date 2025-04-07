import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    college: "XYZ University",
    address: "Hostel Block A, Room 203",
    gender: "Male",
    hobbies: ["Reading", "Gaming"],
    studyHabits: "Night owl",
    sleepPattern: "Light sleeper",
    cleanliness: "Very tidy",
    noiseTolerance: "Medium",
    smoking: false,
    drinking: false,
    bio: "Love programming and looking for a quiet roommate!",
    avatarUrl: "https://github.com/shadcn.png", // Default profile picture
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          avatarUrl: reader.result, // Base64 string for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle select dropdown change
  const handleSelectChange = (name, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (name) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: !prevUser[name],
    }));
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    // TODO: Send updated data (including avatarUrl) to backend via API
    alert("Profile updated successfully!");
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset to original data if fetched from backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-grow max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-md border-gray-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!isEditing ? (
              <div className="space-y-6">
                {/* Profile Picture Display */}
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <p>
                    <span className="font-semibold text-gray-700">Name:</span>{" "}
                    {user.name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    {user.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">College:</span>{" "}
                    {user.college}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Address:</span>{" "}
                    {user.address}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Gender:</span>{" "}
                    {user.gender}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Hobbies:</span>{" "}
                    {user.hobbies.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Study Habits:</span>{" "}
                    {user.studyHabits}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Sleep Pattern:</span>{" "}
                    {user.sleepPattern}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Cleanliness:</span>{" "}
                    {user.cleanliness}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Noise Tolerance:</span>{" "}
                    {user.noiseTolerance}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Smoking:</span>{" "}
                    {user.smoking ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Drinking:</span>{" "}
                    {user.drinking ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Bio:</span>{" "}
                    {user.bio}
                  </p>
                </div>
                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-4">
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
                    onChange={handleImageChange}
                    className="mt-2 w-full max-w-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 font-medium">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">College</Label>
                    <Input
                      type="text"
                      name="college"
                      value={user.college}
                      onChange={handleChange}
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Gender</Label>
                    <Select
                      value={user.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Study Habits</Label>
                    <Select
                      value={user.studyHabits}
                      onValueChange={(value) => handleSelectChange("studyHabits", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Study Habits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Night owl">Night Owl</SelectItem>
                        <SelectItem value="Early bird">Early Bird</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Sleep Pattern</Label>
                    <Select
                      value={user.sleepPattern}
                      onValueChange={(value) => handleSelectChange("sleepPattern", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Sleep Pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Light sleeper">Light Sleeper</SelectItem>
                        <SelectItem value="Heavy sleeper">Heavy Sleeper</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Cleanliness</Label>
                    <Select
                      value={user.cleanliness}
                      onValueChange={(value) => handleSelectChange("cleanliness", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Cleanliness" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Very tidy">Very Tidy</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Messy">Messy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Noise Tolerance</Label>
                    <Select
                      value={user.noiseTolerance}
                      onValueChange={(value) => handleSelectChange("noiseTolerance", value)}
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
                      checked={user.smoking}
                      onCheckedChange={() => handleCheckboxChange("smoking")}
                    />
                    <Label className="text-gray-700 font-medium">Smoking</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={user.drinking}
                      onCheckedChange={() => handleCheckboxChange("drinking")}
                    />
                    <Label className="text-gray-700 font-medium">Drinking</Label>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Bio</Label>
                  <Textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
                    onClick={handleSave}
                  >
                    Save Changes
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
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;