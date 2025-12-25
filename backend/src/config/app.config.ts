/**
 * Application configuration
 */
export const appConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-chat',
  },
  ollama: {
    apiUrl: process.env.OLLAMA_API_URL || 'http://localhost:11434/api/chat',
    model: process.env.OLLAMA_MODEL || 'llama3',
    timeout: parseInt(process.env.OLLAMA_TIMEOUT || '120000', 10), // 2 minutes
  },
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;

/**
 * Validate required environment variables
 */
export const validateConfig = (): void => {
  const required = ['MONGODB_URI'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0 && appConfig.nodeEnv === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

