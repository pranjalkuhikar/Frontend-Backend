# Task6 Backend API

A robust, production-ready Node.js/Express backend API with TypeScript, featuring user authentication, profile management, and comprehensive API documentation.

## 🚀 Features

- **TypeScript** - Type-safe code with modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Redis** - In-memory data store for caching
- **JWT Authentication** - Secure user authentication
- **Swagger/OpenAPI** - Interactive API documentation
- **Environment Configuration** - Secure environment variable management
- **Request Validation** - Input validation using Zod
- **Error Handling** - Centralized error handling
- **Logging** - Comprehensive logging system
- **Rate Limiting** - API rate limiting for security
- **Security Middleware** - Various security enhancements
- **File Upload** - Cloudinary integration for file storage

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Task6/Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=8080

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/task6

   # JWT Configuration
   JWT_SECRET=your_32_character_minimum_secret_key_here
   JWT_EXPIRATION_TIME=1d

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # Redis Configuration
   REDIS_URL=redis://localhost:6379

   # SMTP Configuration (for email)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   SMTP_FROM=noreply@example.com

   # Cloudinary Configuration (for file uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Available Endpoints

#### 1. User Endpoints (`/api/v1/user`)

- **POST** `/register` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "profilePhoto": "file (optional)"
  }
  ```

- **POST** `/login` - Login user
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **GET** `/auth` - Check authentication status
  - Requires: Bearer token

- **GET** `/verify-email` - Verify user email
  - Query: `token: string`

#### 2. Profile Endpoints (`/api/v1/profile`)

- **GET** `/` - Get user profile
  - Requires: Bearer token

- **PUT** `/` - Update user profile
  - Requires: Bearer token
  ```json
  {
    "username": "string (optional)",
    "email": "string (optional)"
  }
  ```

#### 3. Health Endpoint (`/api/v1/health`)

- **GET** `/` - Check system health
  ```json
  {
    "status": "OK",
    "uptime": "number",
    "timestamp": "number",
    "services": {
      "redis": "boolean",
      "database": "boolean"
    },
    "environment": "string",
    "memory": "object"
  }
  ```

## 🔒 Security Features

- JWT-based authentication
- Password hashing
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- XSS protection
- CSRF protection

## 🏗️ Project Structure

```
Backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── schemas/        # Validation schemas
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── .env               # Environment variables
├── package.json       # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 📦 Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🔄 API Versioning

The API is versioned using the URL path: `/api/v1/...`

## 📝 Logging

Logs are stored in:
- `combined.log` - All logs
- `error.log` - Error logs only

## 🔍 Monitoring

The health endpoint (`/api/v1/health`) provides system status information.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js
- MongoDB
- Redis
- TypeScript
- And all other open-source contributors
