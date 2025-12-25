import axios, { AxiosError } from 'axios';
import { appConfig } from '../config/app.config';
import { ServiceUnavailableError, InternalServerError } from '../errors/AppError';
import { OllamaMessage, OllamaRequest, OllamaResponse } from '../types/chat.types';
import { IMessage } from '../models/Chat';

/**
 * Ollama service - handles communication with Ollama API
 */
class OllamaService {
  /**
   * Convert internal message format to Ollama message format
   */
  private convertToOllamaMessages(messages: IMessage[]): OllamaMessage[] {
    return messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));
  }

  /**
   * Get AI response from Ollama
   */
  async getResponse(messages: IMessage[]): Promise<string> {
    try {
      const ollamaMessages = this.convertToOllamaMessages(messages);

      const requestPayload: OllamaRequest = {
        model: appConfig.ollama.model,
        messages: ollamaMessages,
        stream: false,
      };

      const response = await axios.post<OllamaResponse>(
        appConfig.ollama.apiUrl,
        requestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: appConfig.ollama.timeout,
        }
      );

      // Validate response format
      if (!response.data?.message?.content) {
        throw new InternalServerError('Invalid response format from Ollama');
      }

      return response.data.message.content;
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ETIMEDOUT') {
          throw new ServiceUnavailableError(
            'Cannot connect to Ollama. Make sure Ollama is running on localhost:11434'
          );
        }

        if (axiosError.response) {
          throw new ServiceUnavailableError(
            `Ollama API error: ${axiosError.response.status} ${axiosError.response.statusText}`
          );
        }

        throw new ServiceUnavailableError(`Ollama API error: ${axiosError.message}`);
      }

      // Re-throw known errors
      if (error instanceof ServiceUnavailableError || error instanceof InternalServerError) {
        throw error;
      }

      // Wrap unknown errors
      console.error('Unexpected error in Ollama service:', error);
      throw new InternalServerError('Failed to get response from Ollama');
    }
  }
}

export const ollamaService = new OllamaService();
