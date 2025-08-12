# Real-Time Chat Dashboard

A real-time AI-powered chat dashboard built with React and Node.js/Express. Features live message updates, typing indicators, and WebSocket communication.

## Features

- Real-time message display
- Live typing indicators
- WebSocket-based communication
- Scrollable message history
- Simulated chat behavior
- Modern React frontend
- Express.js backend with Socket.IO

## Tech Stack

- **Frontend**: React, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Real-time**: WebSocket communication
- **Styling**: CSS/Tailwind

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Server runs on http://localhost:3001

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   App runs on http://localhost:3000

## How to Run

1. **Start Backend**: In one terminal, run `npm start` from the `backend/` directory
2. **Start Frontend**: In another terminal, run `npm start` from the `frontend/` directory
3. **Open Browser**: Navigate to http://localhost:3000
4. **Test Real-time**: Watch for auto-generated messages and typing indicators

## API Endpoints

- `GET /api/messages` - Fetch recent messages
- WebSocket endpoint at `/ws/chat` for real-time communication

## Testing Real-time Behavior

- Messages appear automatically every 5-10 seconds
- Typing indicators show when users are "typing"
- New messages auto-scroll to bottom
- Input field allows message composition (frontend only)

## Project Structure

```
chat-dash/
├── README.md
├── plan.md
├── backend/          # Express server
└── frontend/         # React app
```
