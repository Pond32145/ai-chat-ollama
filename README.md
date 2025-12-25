# AI Chat Application

<div align="center">

A full-stack AI chat application with ChatGPT-style interface, powered by local LLM (Ollama). Built with Next.js, Express, MongoDB, and TypeScript.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Setup Instructions](#-setup-instructions)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Local LLM Usage](#-local-llm-usage)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)

## 🎯 Project Overview

This AI Chat Application is a production-ready, full-stack solution that enables users to have conversations with an AI assistant powered by Ollama's local LLM. The application features a ChatGPT-inspired interface with a sidebar for conversation management and a clean, modern chat experience.

### Key Highlights

- **🔒 Privacy-First**: All conversations stay on your machine - no external API calls
- **🎨 Modern UI**: ChatGPT-style interface with dark theme and sidebar navigation
- **🏗️ Clean Architecture**: Well-structured backend following clean architecture principles
- **💾 Persistent Storage**: All chat history stored in MongoDB
- **⚡ Type-Safe**: Full TypeScript implementation across frontend and backend
- **🚀 Production-Ready**: Comprehensive error handling and best practices

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Custom styling with ChatGPT-inspired design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **Mongoose** - MongoDB object modeling

### Database
- **MongoDB** - NoSQL database (via Docker)

### AI
- **Ollama** - Local LLM runtime
- **llama3** - AI model (configurable)

### Infrastructure
- **Docker** - Containerization for MongoDB
- **Docker Compose** - Container orchestration

## 🏗 Architecture

### Backend Architecture

The backend follows **Clean Architecture** principles with clear separation of concerns:

```
Request Flow:
Request → Route → Controller → Validation → Service → Model → Database
                                                      ↓
Response ← Controller ← Service ← Model ← Database
```

#### Layer Responsibilities

1. **Routes Layer** (`routes/`)
   - Defines API endpoints
   - Maps HTTP methods to controllers
   - No business logic

2. **Controllers Layer** (`controllers/`)
   - Handles HTTP requests/responses
   - Validates input using utilities
   - Delegates to services
   - Uses async error handling

3. **Services Layer** (`services/`)
   - Contains all business logic
   - Independent of HTTP layer
   - Handles data transformation
   - Manages external API calls (Ollama)

4. **Models Layer** (`models/`)
   - Database schemas and models
   - Mongoose models and interfaces
   - Data persistence layer

5. **Config Layer** (`config/`)
   - Application configuration
   - Environment variable management
   - Database connection setup

#### Error Handling

- Custom error classes (`errors/AppError.ts`)
- Global error middleware
- Consistent error responses
- Proper HTTP status codes

For detailed architecture documentation, see [backend/ARCHITECTURE.md](./backend/ARCHITECTURE.md).

### Frontend Architecture

- **App Router**: Next.js 14 App Router for routing
- **Component-Based**: Modular components (Sidebar, ChatWindow, MessageBubble, ChatInput)
- **Client Components**: React hooks for state management
- **ChatGPT-Style Layout**: Sidebar + main chat area layout
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Immediate UI feedback
- **Route Structure**:
  - `/` - New chat page
  - `/conversations/[id]` - Existing conversation page

## ✨ Features

- ✅ **ChatGPT-Style UI**: Modern interface with sidebar navigation and chat history
- ✅ **Chat Interface**: Clean, minimal chat UI with message history
- ✅ **AI Responses**: Powered by local Ollama LLM (llama3)
- ✅ **Conversation Management**: Each chat has a unique conversationId with auto-generated titles
- ✅ **Sidebar Navigation**: Browse and switch between conversations easily
- ✅ **Persistent History**: All conversations stored in MongoDB
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Loading States**: Visual feedback during AI processing
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Clean Code**: Well-structured, maintainable codebase

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Docker** and **Docker Compose** - [Download](https://www.docker.com/)
- **Ollama** - [Download](https://ollama.ai/)
- **Git** - [Download](https://git-scm.com/)

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd shout

# 2. Start MongoDB
docker-compose up -d

# 3. Install Ollama and pull model
ollama pull llama3

# 4. Setup and start backend
cd backend
npm install
cp .env.example .env  # Edit .env with your settings
npm run dev

# 5. Setup and start frontend (in new terminal)
cd frontend
npm install
cp .env.example .env.local  # Edit .env.local with your settings
npm run dev

# 6. Open http://localhost:3000
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shout
```

### 2. Set Up Ollama

#### Install Ollama

1. Download and install Ollama from [https://ollama.ai](https://ollama.ai)
2. Verify installation:
   ```bash
   ollama --version
   ```

#### Pull the llama3 Model

```bash
ollama pull llama3
```

This will download the llama3 model (approximately 4.7GB). The download may take a few minutes depending on your internet connection.

**Note**: The first time you use the model, it may take longer to respond as it loads into memory.

#### Verify Ollama is Running

Ollama should start automatically. Verify it's running:

```bash
ollama list
```

You should see `llama3` in the list. If Ollama isn't running, start it manually (it typically runs on port 11434).

**Test Ollama API:**
```bash
curl http://localhost:11434/api/tags
```

### 3. Set Up MongoDB with Docker

Start MongoDB using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Start MongoDB container on port 27017
- Create a persistent volume for data
- Set up the `ai-chat` database

Verify MongoDB is running:

```bash
docker ps
```

You should see the `ai-chat-mongodb` container running.

**Useful Docker Commands:**
```bash
# Stop MongoDB
docker-compose down

# Stop and remove all data
docker-compose down -v

# View logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart
```

### 4. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ai-chat
OLLAMA_API_URL=http://localhost:11434/api/chat
OLLAMA_MODEL=llama3
NODE_ENV=development
```

**Optional environment variables:**
- `OLLAMA_TIMEOUT` - Timeout for Ollama requests in milliseconds (default: 120000ms)

### 5. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏃 Running the Project

### Start All Services

You'll need **three terminal windows**:

#### Terminal 1: MongoDB (Docker)

Ensure MongoDB is running:

```bash
docker-compose up -d
```

#### Terminal 2: Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:3001
📝 Environment: development
```

#### Terminal 3: Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the AI Chat interface with a sidebar on the left. Start a conversation by typing a message!

## 📡 API Documentation

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### POST `/api/chat`

Send a message and receive AI response.

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "conversationId": "optional-conversation-id"
}
```

**Response (200 OK):**
```json
{
  "conversationId": "uuid-string",
  "message": "AI response text",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "AI response text",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request` - Invalid message format
- `503 Service Unavailable` - Ollama not available
- `500 Internal Server Error` - Server error

#### GET `/api/chat/:conversationId`

Get chat history for a conversation.

**Response (200 OK):**
```json
{
  "conversationId": "uuid-string",
  "messages": [
    {
      "role": "user",
      "content": "Message content",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` - Conversation not found
- `400 Bad Request` - Invalid conversation ID format

#### GET `/api/conversations`

Get all conversations with their titles.

**Response (200 OK):**
```json
[
  {
    "_id": "uuid-string",
    "title": "Conversation title"
  },
  {
    "_id": "uuid-string-2",
    "title": "Another conversation"
  }
]
```

**Note:** Conversations are sorted by most recently updated first.

#### GET `/api/conversations/:id/messages`

Get all messages for a specific conversation.

**Response (200 OK):**
```json
{
  "conversationId": "uuid-string",
  "messages": [
    {
      "role": "user",
      "content": "Message content",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "role": "assistant",
      "content": "AI response",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` - Conversation not found
- `400 Bad Request` - Invalid conversation ID format

#### GET `/health`

Health check endpoint.

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "AI Chat Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤖 Local LLM Usage

### Why Local LLM?

This application uses **Ollama** with a local LLM (llama3) for several advantages:

1. **🔒 Privacy**: All conversations stay on your machine - no data sent to external servers
2. **💰 No API Costs**: No charges for API usage - completely free
3. **🌐 Offline Capable**: Works without internet (after model download)
4. **🔧 Customizable**: Easy to switch models or fine-tune
5. **⚡ Fast**: No network latency for API calls
6. **📊 Full Control**: You control the model and its behavior

### Supported Models

The application is configured to use `llama3` by default, but you can use any model supported by Ollama:

**Popular Models:**
- `llama3` (default) - 4.7GB, good balance of quality and speed
- `llama3:8b` - Larger, more capable version
- `llama3:70b` - Most capable, requires significant RAM (16GB+)
- `mistral` - Alternative high-quality model
- `codellama` - Code-focused model for programming tasks
- `phi` - Smaller, faster model for quick responses

**To use a different model:**

1. Pull the model:
   ```bash
   ollama pull llama3:8b
   ```

2. Update `backend/.env`:
   ```env
   OLLAMA_MODEL=llama3:8b
   ```

3. Restart the backend server

### Model Requirements

- **RAM**: 
  - Minimum 8GB for llama3
  - 16GB+ recommended for larger models
  - 32GB+ for llama3:70b
- **Storage**: ~5GB per model
- **CPU**: Works on CPU, but GPU acceleration recommended for faster responses
- **GPU**: Optional but recommended (CUDA, Metal, or ROCm support)

### Troubleshooting Ollama

**Ollama not responding:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama (varies by OS)
# Windows: Restart the Ollama service from Services
# Mac/Linux: ollama serve
```

**Model not found:**
```bash
# List available models
ollama list

# Pull the model again
ollama pull llama3

# Verify model is available
ollama show llama3
```

**Slow responses:**
- Ensure you have enough RAM available
- Consider using a smaller model
- Check system resources (CPU/GPU usage)
- Close other memory-intensive applications
- First response may be slower as the model loads

**Connection refused errors:**
- Ensure Ollama is running: `ollama list`
- Check if port 11434 is available
- Verify firewall settings
- Restart Ollama service

## 📁 Project Structure

```
.
├── backend/                 # Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── errors/         # Custom error classes
│   │   ├── middleware/    # Express middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── ARCHITECTURE.md     # Architecture documentation
├── frontend/               # Next.js frontend
│   ├── app/               # App Router
│   │   ├── components/    # React components
│   │   │   ├── Sidebar.tsx      # Sidebar with chat history
│   │   │   ├── ChatWindow.tsx   # Main chat area
│   │   │   ├── MessageBubble.tsx # Message component
│   │   │   └── ChatInput.tsx    # Input component
│   │   ├── conversations/ # Conversation routes
│   │   │   └── [id]/     # Dynamic route for conversations
│   │   │       └── page.tsx
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout with sidebar
│   │   └── page.tsx       # New chat page
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml      # MongoDB Docker setup
└── README.md              # This file
```

## 💻 Development

### Backend Scripts

```bash
cd backend

npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Scripts

```bash
cd frontend

npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting configured
- **Error Handling**: Comprehensive error handling
- **Clean Architecture**: Well-structured codebase
- **Best Practices**: Following industry standards

### Environment Variables

**Backend** (`.env`):
- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `OLLAMA_API_URL` - Ollama API URL
- `OLLAMA_MODEL` - Model name (default: llama3)
- `OLLAMA_TIMEOUT` - Request timeout in ms (default: 120000)
- `NODE_ENV` - Environment (development/production)

**Frontend** (`.env.local`):
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🔧 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running: `docker ps`
- Verify MongoDB connection string in `.env`
- Check if port 3001 is available
- Review backend logs for errors

**Frontend can't connect to backend:**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running on the correct port
- Check CORS settings (should be enabled)
- Verify network connectivity

**Ollama connection errors:**
- Ensure Ollama is running: `ollama list`
- Check if model is pulled: `ollama list`
- Verify `OLLAMA_API_URL` in backend `.env`
- Test Ollama directly: `curl http://localhost:11434/api/tags`

**MongoDB connection errors:**
- Ensure Docker is running
- Check if MongoDB container is up: `docker ps`
- Verify `MONGODB_URI` in backend `.env`
- Check Docker logs: `docker-compose logs mongodb`

**No conversations showing:**
- Check browser console for errors
- Verify backend API is responding: `curl http://localhost:3001/api/conversations`
- Check MongoDB for data: Connect to MongoDB and query `chats` collection
- Ensure conversations exist (send a message first)

## 📝 Notes

- **MongoDB**: Data persists in Docker volume `mongodb_data`
- **Conversations**: Each conversation has a unique `conversationId` (UUID)
- **Titles**: Conversation titles are auto-generated from the first user message (max 50 characters)
- **History**: Full conversation history is maintained in MongoDB
- **Sidebar**: Automatically refreshes when new conversations are created
- **Performance**: First response may be slower as the model loads into memory
- **Privacy**: All data stays local - no external API calls
- **UI**: ChatGPT-inspired dark theme interface
- **Model Loading**: The first message in a session may take longer as Ollama loads the model

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

ISC

---

<div align="center">

**Built with ❤️ using Next.js, Express, MongoDB, and Ollama**

[Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues)

</div>
