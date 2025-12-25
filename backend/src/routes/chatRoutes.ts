import { Router } from 'express';
import {
  chatHandler,
  getChatHistoryHandler,
  getAllConversationsHandler,
  getConversationMessagesHandler,
} from '../controllers/chatController';

const router = Router();

/**
 * POST /api/chat
 * Send a message and receive AI response
 */
router.post('/chat', chatHandler);

/**
 * GET /api/chat/:conversationId
 * Get chat history for a conversation
 */
router.get('/chat/:conversationId', getChatHistoryHandler);

/**
 * GET /api/conversations
 * Get all conversations
 */
router.get('/conversations', getAllConversationsHandler);

/**
 * GET /api/conversations/:id/messages
 * Get messages for a specific conversation
 */
router.get('/conversations/:id/messages', getConversationMessagesHandler);

export default router;
