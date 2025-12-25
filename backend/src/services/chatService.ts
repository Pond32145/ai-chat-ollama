import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../models/Chat';
import type { IMessage } from '../models/Chat';
import { ollamaService } from './ollamaService';
import { NotFoundError, InternalServerError } from '../errors/AppError';
import { ChatRequestDTO, ChatResponseDTO } from '../types/chat.types';

/**
 * Chat service - handles business logic for chat operations
 */
class ChatService {
  /**
   * Process a chat message: save user message, get AI response, save assistant response
   */
  async processMessage(request: ChatRequestDTO): Promise<ChatResponseDTO> {
    const { message, conversationId } = request;

    // Generate or use existing conversationId
    const chatId = conversationId || uuidv4();

    try {
      // Find or create chat document
      let chat = await Chat.findOne({ conversationId: chatId });
      if (!chat) {
        chat = new Chat({ conversationId: chatId, messages: [] });
      }

      // Save user message
      const userMessage: IMessage = {
        role: 'user',
        content: message,
        timestamp: new Date(),
      };

      chat.messages.push(userMessage);
      await chat.save();

      // Get AI response from Ollama
      const assistantResponse = await ollamaService.getResponse(chat.messages);

      // Save assistant response
      const assistantMessage: IMessage = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      chat.messages.push(assistantMessage);
      
      // Generate title from first message if not set
      if (!chat.title && chat.messages.length > 0) {
        chat.title = this.generateTitleFromMessages(chat.messages);
      }
      
      await chat.save();

      // Return response
      return {
        conversationId: chatId,
        message: assistantResponse,
        messages: chat.messages,
      };
    } catch (error) {
      // Re-throw known errors
      if (error instanceof NotFoundError || error instanceof InternalServerError) {
        throw error;
      }

      // Wrap unknown errors
      console.error('Error processing chat message:', error);
      throw new InternalServerError('Failed to process chat message');
    }
  }

  /**
   * Get chat history by conversation ID
   */
  async getChatHistory(conversationId: string): Promise<IMessage[]> {
    const chat = await Chat.findOne({ conversationId });

    if (!chat) {
      throw new NotFoundError(`Conversation with ID ${conversationId} not found`);
    }

    return chat.messages;
  }

  /**
   * Get all conversations
   */
  async getAllConversations(): Promise<Array<{ _id: string; title: string }>> {
    const chats = await Chat.find({})
      .sort({ updatedAt: -1 })
      .select('conversationId title messages');

    return chats.map((chat) => ({
      _id: chat.conversationId,
      title: chat.title || this.generateTitleFromMessages(chat.messages),
    }));
  }

  /**
   * Generate title from first user message
   */
  private generateTitleFromMessages(messages: IMessage[]): string {
    const firstUserMessage = messages.find((msg) => msg.role === 'user');
    if (firstUserMessage) {
      const content = firstUserMessage.content.trim();
      return content.length > 50 ? content.substring(0, 50) + '...' : content;
    }
    return 'New Conversation';
  }

  /**
   * Update conversation title
   */
  async updateTitle(conversationId: string, title: string): Promise<void> {
    const chat = await Chat.findOne({ conversationId });
    if (!chat) {
      throw new NotFoundError(`Conversation with ID ${conversationId} not found`);
    }
    chat.title = title;
    await chat.save();
  }
}

export const chatService = new ChatService();

