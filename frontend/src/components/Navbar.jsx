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
import { Menu,ChevronDown,  User, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data (replace with real data from backend later)
  const user = {
    name: "John Doe",
    avatarUrl: "https://github.com/shadcn.png", // Placeholder image
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
    setIsMobileMenuOpen(false); // Close mobile menu on logout
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
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Link to="/
              ">Home</Link>
            </Button>
            
            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Link to="/find-roommate">Find Roommate</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Link to="/messages">Messages</Link>
            </Button>

            {/* Profile Dropdown with Avatar */}
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-blue-700 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline text-sm font-medium truncate max-w-[150px]">
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
            <span> <User className="inline-block mr-2 mb-1" />View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-md transition-colors cursor-pointer"
        >
          <span> <LogOut className="inline-block mr-2 mb-1" />Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
              <div className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-lg font-medium">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                asChild
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/find-roommate" onClick={() => setIsMobileMenuOpen(false)}>
                  Find Roommate
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/messages" onClick={() => setIsMobileMenuOpen(false)}>
                  Messages
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;