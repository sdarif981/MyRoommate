import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { USER_API } from "@/constants/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.auth.user);
  const [input,setInput]=useState({
    email:"",
    password:"",
  })
  const navigate = useNavigate();
  
  const ChangeHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
   }
  const handleLogin = async(e) => {
    e.preventDefault();
    const {email,password}=input;
    setLoading(true);
     try{
      const response=await axios.post(`${USER_API}/login`,
        {
          email:email.trim(),
          password:password,
        } ,{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials:true,
        }
      );
      if(response.data.success){
       dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message || "Login successful.Welcome back.");
      }
     }
     catch(error){      
      console.error(error);
     
        toast.error(
          error?.response?.data?.message || "Login failed. Please try again."
        );
      
     }
      finally{
        setLoading(false);
      }
   
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <h2 className="text-2xl font-bold text-center">Sign in</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Email address</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={input.email}
                  required
                  onChange={ChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={input.password}
                  onChange={ChangeHandler}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Register now
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
