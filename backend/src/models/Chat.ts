import mongoose, { Schema, Document } from 'mongoose';

/**
 * Message interface
 */
export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Chat document interface
 */
export interface IChat extends Document {
  conversationId: string;
  title?: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Chat schema
 */
const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema = new Schema<IChat>(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: '',
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);

