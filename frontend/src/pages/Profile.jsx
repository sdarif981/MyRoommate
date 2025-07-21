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

  console.log("user.smoking:", user.smoking, typeof user.smoking);
  console.log("user.drinking:", user.drinking, typeof user.drinking);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
        <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:min-w-xl sm:min-w-0">
          <Card className="shadow-xl border-none rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
              <CardTitle className="text-3xl font-bold text-center tracking-tight">
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="flex justify-center">
                  <Avatar className="h-32 w-32 ring-4 ring-white shadow-md">
                    <AvatarImage
                      src={user.avatarUrl || "https://via.placeholder.com/150"}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Name
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Email
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      College
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.college || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Address
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.address || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Gender
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.gender || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Hobbies
                    </span>
                    <span className="mt-1 text-lg text-gray-900">
                      {user?.hobbies?.join(", ") || "Not specified"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Study Habits
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.studyHabits || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Sleep Pattern
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.sleepPattern || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Cleanliness
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.cleanliness || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Noise Tolerance
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.noiseTolerance || "Not specified"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Smoking
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.smoking === true || user.smoking === "true" ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Drinking
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.drinking === true || user.drinking === "true" ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex flex-col sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Bio
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{user.bio || "Not specified"}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;