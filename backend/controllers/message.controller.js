import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";

import mongoose from "mongoose";

//Send message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message cannot be empty." });
    }

    // Ensure receiver exists
    const receiverExists = await mongoose.model("User").findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create message
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    // Save to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Emit via Socket.IO only to the receiver
    const io = req.app.get("io");

    if (io) {
      const messageData = {
        _id: newMessage._id,
        senderId,
        receiverId,
        message,
        createdAt: newMessage.createdAt,
      };

      // Emit only to receiver's room
      io.to(receiverId).emit("receive_message", messageData);
    }

    // Respond to sender
    return res.status(200).json({
      message: "Message sent successfully",
      data: {
        _id: newMessage._id,
        sender: newMessage.sender,
        receiver: newMessage.receiver,
        text: newMessage.message,
        timestamp: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error("SendMessage Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "_id",
      },
      options: { sort: { createdAt: 1 } },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    const formattedMessages = conversation.messages.map((msg) => ({
      _id: msg._id.toString(), // Include message ID
      senderId: msg.sender._id.toString(),
      text: msg.message,
      createdAt: msg.createdAt,
    }));

    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("GetMessages Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getInboxChats = async (req, res) => {
  try {
    const userId = req.id;

    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "name avatarUrl email") // populate other user
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .sort({ updatedAt: -1 });

    const chats = conversations.map((conv) => {
      const otherUser = conv.participants.find(
        (p) => p._id.toString() !== userId
      );
      const lastMessage = conv.messages[0];

      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatarUrl,
        lastMessage: lastMessage?.message || "No messages yet",
        time: lastMessage
          ? new Date(lastMessage.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })
          : "",
        unread: 0, // optional: add real unread count later
      };
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error("Inbox fetch failed:", error);
    res.status(500).json({ message: "Failed to fetch inbox." });
  }
};
