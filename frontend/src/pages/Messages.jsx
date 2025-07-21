import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

// Sample chat data (Replace with backend data)


const Messages = () => {
  const users=useSelector((store)=>store.users.allUsers);
  const navigate = useNavigate();
   let user=useSelector((store)=>store.auth.user);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
          <Button
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={() => navigate("/find-roommate")} // Redirect to find a new chat
          >
            New Message
          </Button>
        </div>

        {/* Recent Chats */}
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer w-[65vw] hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white"
                onClick={() => navigate(`/chat/${chat._id}`)}
              >
                <CardContent className="flex items-center p-4 space-x-4">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {chat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900 text-base truncate">
                        {chat.name}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
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
                      className="border-gray-300 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from triggering
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
      </div>

      
    </div>
  );
};

export default Messages;