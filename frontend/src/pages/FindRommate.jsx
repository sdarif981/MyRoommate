import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Axios from "axios";
import { USER_API } from "@/constants/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import DialogBox from "@/components/DialogBox";

const FindRoommate = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const allUsers = useSelector((store) => store.users.allUsers);
  const user = useSelector((store) => store.auth.user);

  const [filters, setFilters] = useState({
    gender: "",
    studyHabits: "",
    sleepPattern: "",
    cleanliness: "",
    noiseTolerance: "",
    smoking: false,
    drinking: false,
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle dropdown filter change
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // Handle checkbox filter change
  const handleCheckboxChange = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: !prevFilters[key],
    }));
  };

  const handleChatClick = (id) => {
    if (!user) {
      setIsDialogOpen(true);
    } else {
      navigate(`/chat/${id}`);
    }
  };

  // Fetch users (memoized)
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        searchQuery,
        filters,
        users: allUsers,
        currentUserId: user?._id,
      };

      const response = await Axios.post(
        `${USER_API}/find/roommate`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUsers(response.data.filteredArray);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error fetching users.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, allUsers, user]);

  // Debounce fetch when searchQuery/filters change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [fetchUsers]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 mt-5">
          Find Your Perfect Roommate
        </h2>

        {/* Search and Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <div className="mb-6">
            <Label className="text-gray-700 font-medium">Search</Label>
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, college, address, habits or bio..."
              className="mt-1 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Gender */}
            <div>
              <Label className="text-gray-700 font-medium">Gender</Label>
              <Select
                value={filters.gender}
                onValueChange={(value) => handleFilterChange("gender", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Study Habits */}
            <div>
              <Label className="text-gray-700 font-medium">Study Habits</Label>
              <Select
                value={filters.studyHabits}
                onValueChange={(value) =>
                  handleFilterChange("studyHabits", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Study Habit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Night Owl">Night Owl</SelectItem>
                  <SelectItem value="Early Bird">Early Bird</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sleep Pattern */}
            <div>
              <Label className="text-gray-700 font-medium">Sleep Pattern</Label>
              <Select
                value={filters.sleepPattern}
                onValueChange={(value) =>
                  handleFilterChange("sleepPattern", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Sleep Pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Light Sleeper">Light Sleeper</SelectItem>
                  <SelectItem value="Heavy Sleeper">Heavy Sleeper</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cleanliness */}
            <div>
              <Label className="text-gray-700 font-medium">Cleanliness</Label>
              <Select
                value={filters.cleanliness}
                onValueChange={(value) =>
                  handleFilterChange("cleanliness", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Cleanliness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Very Tidy">Very Tidy</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Messy">Messy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Noise Tolerance */}
            <div>
              <Label className="text-gray-700 font-medium">Noise Tolerance</Label>
              <Select
                value={filters.noiseTolerance}
                onValueChange={(value) =>
                  handleFilterChange("noiseTolerance", value)
                }
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

            {/* Smoking */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={filters.smoking}
                onCheckedChange={() => handleCheckboxChange("smoking")}
              />
              <Label className="text-gray-700 font-medium">Smoking</Label>
            </div>

            {/* Drinking */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={filters.drinking}
                onCheckedChange={() => handleCheckboxChange("drinking")}
              />
              <Label className="text-gray-700 font-medium">Drinking</Label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {users.length} Roommate{users.length !== 1 ? "s" : ""} Found
            </h3>
            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((u) => (
                  <Card
                    key={u._id}
                    className="hover:shadow-lg transition-shadow duration-300 border-gray-200"
                  >
                    <CardHeader className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={u.avatarUrl} alt={u.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {u.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {u.name || "Unknown"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">College:</span>{" "}
                        {u.college || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Address:</span>{" "}
                        {u.address || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Habits:</span>{" "}
                        {u.studyHabits || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sleep:</span>{" "}
                        {u.sleepPattern || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Cleanliness:</span>{" "}
                        {u.cleanliness || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Noise:</span>{" "}
                        {u.noiseTolerance || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Bio:</span>{" "}
                        {u.bio || "No bio provided"}
                      </p>
                      <Button
                        onClick={() => handleChatClick(u._id)}
                        className="mt-4 w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white transition-colors"
                      >
                        Message
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No roommates match your criteria. Try adjusting filters.
              </p>
            )}
          </div>
        )}
      </div>

      <DialogBox open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default FindRoommate;
