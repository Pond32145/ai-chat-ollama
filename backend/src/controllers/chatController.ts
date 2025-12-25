import { Request, Response } from 'express';
import { chatService } from '../services/chatService';
import { validateChatMessage, validateConversationId } from '../utils/validation';
import { ChatRequestDTO } from '../types/chat.types';
import { asyncHandler } from '../middleware/errorHandler';
import { BadRequestError } from '../errors/AppError';

/**
 * POST /api/chat
 * Send a message and receive AI response
 */
export const chatHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Validate and extract request data
  const message = validateChatMessage(req.body.message);
  const conversationId = validateConversationId(req.body.conversationId);

  const request: ChatRequestDTO = {
    message,
    conversationId,
  };

  // Process message through service layer
  const response = await chatService.processMessage(request);

  // Send response
  res.status(200).json(response);
});

/**
 * GET /api/chat/:conversationId
 * Get chat history for a conversation
 */
export const getChatHistoryHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { conversationId } = req.params;

    if (!conversationId) {
      throw new BadRequestError('Conversation ID is required');
    }

    // Validate conversation ID format
    validateConversationId(conversationId);

    const messages = await chatService.getChatHistory(conversationId);

    res.status(200).json({
      conversationId,
      messages,
    });
  }
);

/**
 * GET /api/conversations
 * Get all conversations
 */
export const getAllConversationsHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const conversations = await chatService.getAllConversations();
    res.status(200).json(conversations);
  }
);

/**
 * GET /api/conversations/:id/messages
 * Get messages for a specific conversation
 */
export const getConversationMessagesHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError('Conversation ID is required');
    }

    // Validate conversation ID format
    validateConversationId(id);

    const messages = await chatService.getChatHistory(id);

    res.status(200).json({
      conversationId: id,
      messages,
    });
  }
);
