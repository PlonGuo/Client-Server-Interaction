# Real-Time Chat Application

## Project Overview

This project is a real-time chat application built using React and Vite on the frontend, and Node.js with Express on the backend. The application utilizes Socket.IO to enable real-time message exchange between clients and displays the current number of online users and total messages sent.

### Features

- Real-time chat functionality
- Online user count display
- Total message count display
- Username input and message timestamp
- Messages are displayed with alternating background colors for better readability

## Installation and Setup

1. Clone the repository:

```
git clone git@github.com:PlonGuo/Client-Server-Interaction.git
```

2. Navigate to the project directory:

```
cd Client-Server-Interaction
```

3. Install dependencies:

```
npm install
```

4. Run the project:

```
npm run dev
```

## Technology Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **WebSocket:** Socket.IO
- **CORS:** Enabled to allow cross-origin requests from the frontend to the backend

## Configuration Details

The project uses CORS to handle cross-origin requests between the frontend (localhost:5173) and the backend (localhost:3000). The backend server serves static files from the `dist` directory after the Vite build.

### Frontend (chat.jsx)

- Uses React hooks for state management (`useState`, `useEffect`).
- Connects to the backend server via Socket.IO.
- Captures username, message content, and sends data to the server.
- Listens for updates on online user count and total messages.
- Dynamically updates the message list with timestamps and sender info.

### Backend (index.js)

- Uses Express to serve the chat application.
- Uses Socket.IO for real-time communication.
- Tracks the number of connected users.
- Tracks the total number of messages sent.
- Emits messages to all connected clients with a timestamp and username.

## Running the Application

1. Start the backend server:

```
npm run dev
```

2. Open the frontend:

```
http://localhost:5173
```

## Usage

- Enter your username in the input field.
- Type your message and click 'Send' or press Enter.
- The message will appear in the chat window with a timestamp and username.
- Online user count and total message count update dynamically.

## Custom Feature

- Message Counter: Displays the total number of messages sent during the session.
- Online User Tracker: Shows the number of users currently connected.

## License

This project is licensed under the MIT License.
