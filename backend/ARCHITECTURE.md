# Backend Architecture

This document describes the clean architecture structure of the backend application.

## Directory Structure

```
backend/src/
├── config/          # Configuration files
│   ├── app.config.ts    # Application configuration
│   └── database.ts      # Database connection
├── controllers/     # Request handlers (thin layer)
│   └── chatController.ts
├── errors/          # Custom error classes
│   └── AppError.ts
├── middleware/      # Express middleware
│   └── errorHandler.ts
├── models/          # Database models (Mongoose)
│   └── Chat.ts
├── routes/          # Route definitions
│   └── chatRoutes.ts
├── services/        # Business logic layer
│   ├── chatService.ts
│   └── ollamaService.ts
├── types/           # TypeScript type definitions
│   └── chat.types.ts
├── utils/           # Utility functions
│   └── validation.ts
└── server.ts        # Application entry point
```

## Architecture Layers

### 1. **Routes Layer** (`routes/`)
- Defines API endpoints
- Maps HTTP methods to controller handlers
- No business logic

### 2. **Controllers Layer** (`controllers/`)
- Thin layer that handles HTTP requests/responses
- Validates input using utility functions
- Delegates business logic to services
- Uses `asyncHandler` wrapper for error handling

### 3. **Services Layer** (`services/`)
- Contains all business logic
- Independent of HTTP layer
- Handles data transformation
- Throws custom errors

### 4. **Models Layer** (`models/`)
- Database schemas and models
- Mongoose models and interfaces
- Data persistence layer

### 5. **Config Layer** (`config/`)
- Application configuration
- Environment variable management
- Database connection setup

## Error Handling

### Custom Error Classes (`errors/AppError.ts`)
- `AppError`: Base error class
- `BadRequestError`: 400 errors
- `NotFoundError`: 404 errors
- `ServiceUnavailableError`: 503 errors
- `InternalServerError`: 500 errors

### Error Middleware (`middleware/errorHandler.ts`)
- Global error handler
- Converts errors to HTTP responses
- Logs errors appropriately
- `asyncHandler` wrapper for async route handlers

## Data Flow

```
Request → Route → Controller → Validation → Service → Model → Database
                                                      ↓
Response ← Controller ← Service ← Model ← Database
```

## Key Principles

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Inversion**: Controllers depend on services, not implementations
3. **Error Handling**: Centralized error handling with custom error classes
4. **Type Safety**: Strong TypeScript typing throughout
5. **Validation**: Input validation at controller level
6. **Configuration**: Centralized configuration management

## Service Layer Pattern

Services are implemented as classes with singleton instances:

```typescript
class ChatService {
  async processMessage(request: ChatRequestDTO): Promise<ChatResponseDTO> {
    // Business logic here
  }
}

export const chatService = new ChatService();
```

This allows for:
- Easy testing (can mock services)
- Clear separation of concerns
- Reusable business logic

## Type Definitions

All types are defined in `types/` directory:
- DTOs (Data Transfer Objects) for API requests/responses
- Shared interfaces
- Type exports from models

## Validation

Validation utilities in `utils/validation.ts`:
- Input validation functions
- Throws `BadRequestError` for invalid input
- Reusable across controllers

## Configuration

Configuration in `config/app.config.ts`:
- Centralized config object
- Environment variable defaults
- Type-safe configuration
- Validation on startup

