import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ⚠️ User not logged in.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const safe = (value, fallback = "Not specified") =>
    value !== undefined && value !== null && value !== "" ? value : fallback;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      alt={safe(user.name, "User")}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    ["Name", user.name],
                    ["Email", user.email],
                    ["College", user.college],
                    ["Address", user.address],
                    ["Gender", user.gender],
                    ["Hobbies", user.hobbies?.join(", ")],
                    ["Study Habits", user.studyHabits],
                    ["Sleep Pattern", user.sleepPattern],
                    ["Cleanliness", user.cleanliness],
                    ["Noise Tolerance", user.noiseTolerance],
                    ["Smoking", user.smoking ? "Yes" : "No"],
                    ["Drinking", user.drinking ? "Yes" : "No"],
                  ].map(([label, value]) => (
                    <div className="flex flex-col" key={label}>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {label}
                      </span>
                      <span className="mt-1 text-lg text-gray-900">
                        {safe(value)}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Bio
                    </span>
                    <span className="mt-1 text-lg text-gray-900">{safe(user.bio)}</span>
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
