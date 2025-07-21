import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getInboxChats, getMessages, sendMessage } from '../controllers/message.controller.js';

const router=express.Router();

router.get("/inbox", isAuthenticated, getInboxChats);              // 🟢 STATIC FIRST
router.post("/send/:id", isAuthenticated, sendMessage);            // ✅ safe
router.get("/:id", isAuthenticated, getMessages);                  // 🔴 DYNAMIC LAST


export default router;