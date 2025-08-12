import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message-item">
          <div className="message-header">
            <span className="message-user">{message.user}</span>
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
          <div className="message-content">{message.message}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;