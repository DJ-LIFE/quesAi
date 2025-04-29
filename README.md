# Podcast Management Platform


## Overview

QuesAi is a modern podcast management platform that helps creators turn their passion into professional podcasts. It provides tools for managing podcast episodes, transcripts, and content distribution channels.

## Features

- **User Authentication**: Secure signup and login functionality
- **Podcast Management**: Create and manage multiple podcast projects
- **Episode Creation**: Upload and manage podcast episodes with transcripts
- **Content Repurposing**: Tools to help repurpose podcast content for various distribution channels
- **Multi-Source Support**: Import content from various sources like RSS feeds and YouTube

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- React Router for navigation
- Zustand for state management
- CSS for styling

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Docker & Docker Compose (optional)

### Installation

#### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skailama.git
   cd skailama
   ```

2. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

#### Manual Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skailama.git
   cd skailama
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   # Create a .env file with the following variables:
   # MONGODB_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # PORT=5000
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Access the application at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
skailama/
├── backend/               # Backend server
│   ├── src/
│   │   ├── controller/    # Request handlers
│   │   ├── middleware/    # Custom middleware
│   │   ├── model/         # Database models
│   │   └── routes/        # API routes
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
│
├── frontend/              # Frontend client
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # SVG and other assets
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── stores/        # Zustand state stores
│   │   └── styles/        # CSS styles
│   ├── index.html         # HTML entry point
│   └── package.json       # Frontend dependencies
│
└── docker-compose.yml     # Docker Compose configuration
```

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register a new user
- `POST /api/v1/signin` - Login a user
- `GET /api/v1/profile` - Get user profile
- `POST /api/v1/logout` - Logout a user

### Podcasts
- `POST /api/v1/podcast` - Create a new podcast
- `GET /api/v1/podcast` - Get all podcasts for user

### Episodes
- `POST /api/v1/podcast/:podcastId/episode` - Create a new episode
- `PUT /api/v1/podcast/:podcastId/episode/:episodeId` - Update an episode
- `GET /api/v1/podcast/:podcastId/episode` - Get episodes for a podcast
- `GET /api/v1/podcast/episodes` - Get all episodes for user