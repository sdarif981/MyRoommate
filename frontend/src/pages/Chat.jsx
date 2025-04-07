import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react"; // Add lucide-react for icons

// Sample user data (Replace with backend data)
const sampleUsers = {
  1: { name: "John Doe", avatar: "https://github.com/shadcn.png" },
  2: { name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
};

// Sample chat history (Replace with backend data)
const sampleMessages = {
  1: [
    { sender: "John Doe", text: "Hey, are you free to chat?", timestamp: "10:30 AM" },
    { sender: "You", text: "Yeah, sure! How’s it going?", timestamp: "10:32 AM" },
  ],
  2: [
    { sender: "Jane Smith", text: "Hi! Looking forward to rooming together?", timestamp: "2:15 PM" },
    { sender: "You", text: "Definitely! What’s your schedule like?", timestamp: "2:17 PM" },
  ],
};

const Chat = () => {
  const { userId } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const recipient = sampleUsers[userId] || { name: "Unknown User" }; // Fallback if user not found
  const [messages, setMessages] = useState(sampleMessages[userId] || []); // Load initial messages
  const [messageInput, setMessageInput] = useState(""); // Message input

  // Handle Sending Messages
  const sendMessage = () => {
    if (messageInput.trim() === "") return;
    const newMessage = {
      sender: "You",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setMessageInput("");
    // TODO: Send to backend via Socket.IO or API
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/find-roommate")}
              className="text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold text-gray-900">
                Chat with {recipient.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <Card className=" w-[50vw] mb-6 shadow-md">
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No messages yet. Start a conversation!
                </p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === "You"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm font-medium">{msg.sender}</p>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Input */}
        <div className="flex gap-3">
          <Input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            onClick={sendMessage}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6"
          >
            Send
          </Button>
        </div>
      </div>

     
    </div>
  );
};

export default Chat;