import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Add actual registration logic (e.g., API call)
    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-md border-gray-200 rounded-lg">
          <CardHeader className="pb-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Create an Account</h2>
            <p className="text-gray-600 text-center mt-2">
              Join MyRoomMate to find your perfect room companion
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors cursor-pointer"
              >
                Register
              </Button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
};

export default Register;