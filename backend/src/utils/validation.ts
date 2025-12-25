import { BadRequestError } from '../errors/AppError';

/**
 * Validate chat message input
 */
export const validateChatMessage = (message: unknown): string => {
  if (!message) {
    throw new BadRequestError('Message is required');
  }

  if (typeof message !== 'string') {
    throw new BadRequestError('Message must be a string');
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    throw new BadRequestError('Message cannot be empty');
  }

  if (trimmedMessage.length > 10000) {
    throw new BadRequestError('Message is too long (max 10000 characters)');
  }

  return trimmedMessage;
};

/**
 * Validate conversation ID format (UUID)
 */
export const validateConversationId = (conversationId: unknown): string | undefined => {
  if (!conversationId) {
    return undefined;
  }

  if (typeof conversationId !== 'string') {
    throw new BadRequestError('Conversation ID must be a string');
  }

  // Basic UUID validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(conversationId)) {
    throw new BadRequestError('Invalid conversation ID format');
  }

  return conversationId;
};

