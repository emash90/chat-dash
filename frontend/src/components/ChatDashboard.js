import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';
import './ChatDashboard.css';

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    // __define-ocg__ - WebSocket client connection setup
    const varOcg = io('http://localhost:3001');
    socketRef.current = varOcg;

    varOcg.on('connect', () => {
      setConnected(true);
      console.log('Connected to server');
    });

    varOcg.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from server');
    });

    // Load initial messages
    fetch('http://localhost:3001/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));

    // Listen for initial messages from socket
    varOcg.on('initialMessages', (initialMessages) => {
      setMessages(initialMessages);
    });

    // Listen for new messages
    varOcg.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for typing indicators
    varOcg.on('userTyping', (data) => {
      const { user, isTyping } = data;
      setTypingUsers(prev => {
        if (isTyping) {
          return prev.includes(user) ? prev : [...prev, user];
        } else {
          return prev.filter(u => u !== user);
        }
      });
    });

    return () => {
      varOcg.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (messageText) => {
    if (socketRef.current && connected) {
      socketRef.current.emit('newMessage', {
        user: 'You',
        message: messageText
      });
    }
  };

  return (
    <div className="chat-dashboard">
      <div className="chat-header">
        <h1>Real-Time Chat Dashboard</h1>
        <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>
      
      <div className="chat-container">
        <div className="message-list-container" ref={messageListRef}>
          <MessageList messages={messages} />
        </div>
        
        <TypingIndicator typingUsers={typingUsers} />
        
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatDashboard;