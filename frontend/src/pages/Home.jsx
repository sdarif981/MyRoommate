// Assuming Navbar is in the same directory
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { USER_API } from "@/constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "@/redux/userSlice";
import { CalculateMatchScore } from "./function";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import DialogBox from "@/components/DialogBox";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const users=useSelector((store)=>store.users.allUsers);
  let user=useSelector((store)=>store.auth.user);
   const navigate=useNavigate();
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await axios.get(`${USER_API}/all`);
        if(res.data.success){
          dispatch(setAllUsers(res.data.users));
          
        }
      }
      catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  },[]);
  useEffect(()=>{
    if(users.length>0){
      matching();
    }
  },[users,user])
  useEffect(()=>{
   const fetchUser=async()=>{
    try{
      const res=await axios.get(`${USER_API}/${user._id}`);
      if(res.data.success){
        user=res.data.user;
        dispatch(setUser(user));
 
      }
    }
    catch(error){
      console.error("Error fetching user data:", error);
      toast.error("error updating state");
    }
   }
   fetchUser();
  },[user?._id]);
  const handleMessagesClick = () => {
    if (!user) {
      setIsDialogOpen(true);
    } else {
      navigate("/messages");
      
    }
  };
  const handleChatClick = (id) => {
    if (!user) {
      setIsDialogOpen(true);
    } else { 
     
      navigate(`/chat/${id}`);
    } 
  };
  

  const matching =()=>{
  
    if(!user){
      setSuggestedMatches(users.slice(0,3));
   
      setLoading(false);
     return;
    }
     const matches= users.filter((u)=>u._id!==user._id)
   .map((u)=>{
      const matchScore=CalculateMatchScore(user,u);
      return{
        ...u,
        matchScore:matchScore,
      }
   })
   .sort((a,b)=>b.matchScore-a.matchScore)
   .slice(0,3);
   setSuggestedMatches(matches);
   setLoading(false);
   console.log(matches);
  }
  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome to MyRoommate!
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect roommate for your hostel life with ease and confidence.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors"
            >
              <a href="/find-roommate">Find a Roommate</a>
            </Button>
            <Button
              asChild
              variant="outline"
              onClick={handleMessagesClick}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-sm font-medium transition-colors"
            >
              <a>View Messages</a>
            </Button>
          </div>
        </div>

        {/* Suggested Matches Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Suggested Matches
            
          </h3>
          {loading?(
            <p className="text-center text-gray-500">Loading suggested matches...</p>
          ):suggestedMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedMatches.map((match) => (
                <Card key={match._id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={match.avatarUrl} alt={match.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {match.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {match.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">College:</span> {match.college}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Habits:</span> {match?.hobbies?.join(", ")}
                  </p>
                  <p className="text-sm text-green-600">
                    <span className="font-medium">Match Score:</span> {match.matchScore}%
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="text-blue-600 p-0 hover:underline cursor-pointer"
                    onClick={()=> handleChatClick(match._id)}
                  >
                    <a  >Message</a>
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No matches yet.</p>
          )}
          <div className="mt-8 text-center">
          {
              !user && "Login to see your match Score and suggested matches"
            }
          </div>
        </div>
      </div>
      <DialogBox open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Home;