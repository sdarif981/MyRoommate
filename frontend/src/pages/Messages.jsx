import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { MESSAGE_API } from "@/constants/constant";
import axios from "axios";
import { toast } from "sonner";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);

  const fetchInbox = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${MESSAGE_API}/inbox`, {
        withCredentials: true,
      });
      setChats(res.data || []);
    } catch (err) {
      console.error("Failed to load inbox:", err);
      toast.error("Failed to load inbox. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInbox();
  }, [fetchInbox]);

  const filteredChats = chats.filter((chat) => chat._id !== user?._id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/find-roommate")}
          >
            New Message
          </Button>
        </div>

        {/* Chat List */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <Card
                  role="button"
                  key={chat._id}
                  tabIndex={0}
                  className="cursor-pointer w-[65vw] hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  <CardContent className="flex items-center p-4 space-x-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {chat.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900 text-base truncate">
                          {chat.name}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {chat.time ? chat.time : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {chat.lastMessage || "Start chatting..."}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No recent chats. Start a conversation from{" "}
                <button
                  onClick={() => navigate("/find-roommate")}
                  className="text-blue-600 hover:underline"
                >
                  Find Roommate
                </button>
                !
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
