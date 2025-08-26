import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);

  // console.log("user.smoking:", user.smoking, typeof user.smoking);
  // console.log("user.drinking:", user.drinking, typeof user.drinking);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-yellow-50 p-4">
        <Card className="w-full max-w-4xl border-none rounded-xl shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-200 to-blue-100 py-6">
            <div className="flex justify-between items-center px-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-2 ring-white">
                  <AvatarImage
                    src={user.avatarUrl || "https://via.placeholder.com/150"}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                onClick={() => setOpen(true)}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.name || "Your First Name"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.email || "Your Email"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">College</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.college || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.address || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gender</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.gender || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Hobbies</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user?.hobbies?.join(", ") || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Habits</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.studyHabits || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Sleep Pattern</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.sleepPattern || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Cleanliness</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.cleanliness || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Noise Tolerance</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.noiseTolerance || "Not specified"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Smoking</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.smoking === true || user.smoking === "true" ? "Yes" : "No"}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Drinking</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.drinking === true || user.drinking === "true" ? "Yes" : "No"}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-600">Bio</p>
                  <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-gray-800">
                    {user.bio || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;