import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API } from "@/constants/constant";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch(`${USER_API.replace("/user", "")}/message/inbox`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch inbox");

        const data = await res.json();
        if (Array.isArray(data)) {
          setChats(data);
        } else {
          toast.error("Unexpected inbox response format");
        }
      } catch (err) {
        console.error("Failed to load inbox:", err);
        toast.error("Could not load your messages. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, []);

  const filteredChats = chats.filter(
    (chat) => chat._id && user?._id && chat._id !== user._id
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => navigate("/find-roommate")}
          >
            New Message
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading conversations...</p>
        ) : (
          <div className="space-y-4">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <Card
                  key={chat._id}
                  className="cursor-pointer w-full sm:w-[65vw] hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  <CardContent className="flex items-center p-4 space-x-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={chat.avatar || ""} alt={chat.name || "User"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {chat?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900 text-base truncate">
                          {chat.name || "Unnamed User"}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {chat.time || "Just now"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {chat.lastMessage || "Start chatting..."}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/chat/${chat._id}`);
                        }}
                      >
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No recent chats. Start a conversation from{" "}
                <a href="/find-roommate" className="text-blue-600 hover:underline">
                  Find Roommate
                </a>
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
