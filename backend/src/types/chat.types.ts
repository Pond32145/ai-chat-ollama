/**
 * Chat-related type definitions
 * 
 * Note: IMessage is defined in models/Chat.ts as it's part of the database schema
 */

// Re-export IMessage from models for convenience
export type { IMessage } from '../models/Chat';

export interface ChatRequestDTO {
  message: string;
  conversationId?: string;
}

export interface ChatResponseDTO {
  conversationId: string;
  message: string;
  messages: IMessage[];
}

export interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  stream: boolean;
}

export interface OllamaResponse {
  message: {
    role: 'assistant';
    content: string;
  };
}

