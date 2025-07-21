import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { MESSAGE_API } from "@/constants/constant";
import axios from "axios";
const socket = io("https://myroommate.onrender.com", {
  withCredentials: true,
});

const Chat = ({ user }) => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  if (!user || !user._id) {
    return (
      <div className="p-4 text-red-500">⚠️ You must be logged in to chat.</div>
    );
  }

  useEffect(() => {
    socket.emit("register", user._id);

    const fetchMessages = async () => {
      try {
  const response = await axios.get(`${MESSAGE_API}/${userId}`, {
    withCredentials: true,
  });

  const data = response.data;

  const formatted = data.map((msg) => ({
    _id: msg._id,
    sender: msg.senderId === user._id ? "you" : "them",
    text: msg.text,
    timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  setMessages(formatted);
} catch (err) {
  console.error("Error loading messages:", err);
  setError("Failed to load messages. Please try again.");
}

    };

    fetchMessages();

    const handleMessage = (data) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg._id === data._id)) return prev;
        return [
          ...prev,
          {
            _id: data._id,
            sender: data.senderId === user._id ? "you" : "them",
            text: data.message,
            timestamp: new Date(data.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
      });
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [userId, user._id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
  const response = await axios.post(
    `${MESSAGE_API}/send/${userId}`,
    { message: messageInput },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  // ✅ axios auto-parses the response
  const responseData = response.data;

  // Step 1: Show message immediately
  setMessages((prev) => [
    ...prev,
    {
      _id: Math.random().toString(36).substr(2, 9),
      sender: "you",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  // Step 2: Clear input
  setMessageInput("");
  setError(null);
} catch (error) {
  const errorMsg =
    error.response?.data?.message || "Failed to send message.";
  setError(errorMsg);
}

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {error && <div className="p-2 mb-4 text-red-500">{error}</div>}
      <div
        ref={chatContainerRef}
        className="h-[400px] overflow-y-auto bg-gray-100 p-3 rounded mb-4"
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 ${
              msg.sender === "you" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-1 rounded ${
                msg.sender === "you"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </p>
            <div className="text-xs text-gray-400">{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Type message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
