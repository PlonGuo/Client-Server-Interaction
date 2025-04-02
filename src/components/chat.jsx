import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

function Chat() {
  socket.on('connect', () => {
    console.log('a user connected');
  });

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  // more implementation
  const [username, setUsername] = useState('Anonymous');
  const [userCount, setUserCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // Listen for the 'chat message' event from server
    socket.on('chat message', (msg) => {
      setMessages((prevMsg) => [...prevMsg, msg]);
    });

    // Count total users event
    socket.on('user count', (count) => {
      setUserCount(count);
    });

    // Count total messages event
    socket.on('message count', (count) => {
      setMessageCount(count);
    });

    // when unmounting, stop listening these events
    return () => {
      socket.off('chat message');
      socket.off('user count');
      socket.off('message count');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // emit event to server
      const messageData = {
        username,
        message: input,
      };
      socket.emit('chat message', messageData);
      setInput(''); // empty the inputbox automatically after sending the message
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full p-2">
      <div className="absolute top-0 left-0 bg-gray-900 text-white p-2 mb-2 fixed w-full z-10">
        <p>Online Users: {userCount}</p>
        <p>Total Messages: {messageCount}</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border-none px-2 py-1 mb-2 rounded-md focus:outline-none"
        />
      </div>
      <ul className="absolute left-0 list-none mt-24 p-0 w-full h-[calc(100%-4rem)] overflow-y-auto">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`block text-left p-2 w-full ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-500'}`}
          >
            <span className="text-sm text-gray-800">
              [{msg.timestamp}] {msg.username}:
            </span>{' '}
            {msg.message}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-1 fixed bottom-0 left-0 right-0 flex h-12 box-border backdrop-blur-md z-20"
        action=""
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          className="border-none px-4 flex-grow rounded-full mx-1 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 mx-1 rounded-md hover:bg-gray-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
