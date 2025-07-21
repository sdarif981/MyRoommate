import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const router=express.Router();

router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('/:id').get(isAuthenticated,getMessages);

export default router;