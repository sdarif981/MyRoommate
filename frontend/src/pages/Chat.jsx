import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { MESSAGE_API } from "@/constants/constant";

const socket = io("https://myroommate.onrender.com", {
  withCredentials: true,
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

const Chat = ({ user }) => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  if (!user?.["_id"]) {
    return <div className="p-4 text-red-500">⚠️ You must be logged in to chat.</div>;
  }

  // Fetch & socket setup
  useEffect(() => {
    socket.emit("register", user._id);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${MESSAGE_API}/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();

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
        console.error("Fetch error:", err.message);
        setError("Failed to load messages. Please try again.");
      }
    };

    fetchMessages();

    const handleMessage = (data) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === data._id);
        if (exists) return prev;

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

  // Auto-scroll on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = messageInput.trim();
    if (!trimmed) return;

    try {
      const response = await fetch(`${MESSAGE_API}/send/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setMessages((prev) => [
        ...prev,
        {
          _id: `temp-${Date.now()}`,
          sender: "you",
          text: trimmed,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setMessageInput("");
      setError(null);
    } catch (err) {
      console.error("Send error:", err.message);
      setError(err.message || "Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
            className={`mb-2 ${msg.sender === "you" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block px-3 py-1 rounded max-w-[70%] break-words ${
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
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
