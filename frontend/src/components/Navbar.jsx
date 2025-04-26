import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, ChevronDown, User, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import DialogBox from "./DialogBox"; // Adjust path as needed
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API } from "@/constants/constant";
import { useDispatch } from "react-redux";
// AuthButtons Component (for reuse in both desktop and mobile menus)
const AuthButtons = ({ onClick, isMobile = false }) => (
  <div className={isMobile ? "space-y-2" : "flex space-x-3"}>
    <Button
      variant={isMobile ? "ghost" : "outline"}
      asChild
      className={
        isMobile
          ? "w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
          : "border-blue-600 text-blue-600 bg-white hover:bg-blue-100 hover:text-blue-800 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
      }
    >
      <Link to="/login" onClick={onClick}>
        Login
      </Link>
    </Button>
    <Button
      variant={isMobile ? "ghost" : "default"}
      asChild
      className={
        isMobile
          ? "w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
          : "bg-gradient-to-r from-blue-600 to-indigo-800 text-white hover:from-blue-700 hover:to-indigo-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
      }
    >
      <Link to="/register" onClick={onClick}>
        Register
      </Link>
    </Button>
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   const dispatch = useDispatch();
  const handleLogout = async() => {

    setIsMobileMenuOpen(false);
    try{
      const res= await axios.post(`${USER_API}/logout`,{},{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logout successful.");
      }
    }catch(error){
        console.error("Error during logout:", error); 
    }

  };

  const handleMessagesClick = () => {
    if (!user) {
      setIsDialogOpen(true);
    } else {
      navigate("/messages");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors"
            >
              MyRoommate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              <Link to="/">Home</Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              <Link to="/find-roommate">Find Roommate</Link>
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              onClick={handleMessagesClick}
            >
              Messages
            </Button>

            {/* Profile/Login/Register */}
            {!user ? (
              <AuthButtons onClick={() => setIsMobileMenuOpen(false)} />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-sm font-semibold truncate max-w-[150px]">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white border border-gray-200 shadow-lg rounded-md p-1"
                  align="end"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors cursor-pointer"
                    >
                      <User className="inline-block mr-2 mb-1" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                  >
                    <LogOut className="inline-block mr-2 mb-1" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-blue-700 p-2 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-blue-700">
              {user && (
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-semibold">{user.name}</span>
                </div>
              )}

              <Button
                variant="ghost"
                asChild
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
              >
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </Button>

              {user ? (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
                  >
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
                  >
                    <Link to="/find-roommate" onClick={() => setIsMobileMenuOpen(false)}>
                      Find Roommate
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleMessagesClick}
                  >
                    Messages
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <AuthButtons
                  onClick={() => setIsMobileMenuOpen(false)}
                  isMobile={true}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dialog for Messages Access */}
      <DialogBox open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </nav>
  );
};

export default Navbar;