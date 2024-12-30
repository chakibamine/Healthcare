"use client";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiMoreVertical } from 'react-icons/fi';

export default function ChatMain({ selectedContact }) {
  const [messages, setMessages] = useState(selectedContact.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = { 
        id: messages.length + 1, 
        text: newMessage, 
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] bg-[#f5f7fb]">
      {/* Fixed Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={selectedContact.avatar}
            alt={selectedContact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{selectedContact.name}</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiMoreVertical className="text-gray-600 w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Messages Area with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-xl px-4 py-2 rounded-lg shadow-sm ${
                message.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
              <span className="block text-xs mt-1 opacity-70">
                {message.timestamp || "12:00 PM"}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area */}
      <div className="px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiPaperclip className="text-gray-600 w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
          >
            <FiSend className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 