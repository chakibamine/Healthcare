import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { chatService } from "@/services/chatService";

export default function ChatMain({ selectedContact }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId, role } = useSelector((state) => state.auth);
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set());
  const [isSending, setIsSending] = useState(false);
  
  // Set up SignalR for real-time messaging
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5167/chatHub")
      .withAutomaticReconnect([0, 2000, 5000, 10000, 20000])
      .build();

    connection.onreconnecting(() => {
      console.log("Attempting to reconnect...");
    });

    connection.onreconnected(() => {
      console.log("Reconnected to SignalR hub");
    });

    connection.on("ReceiveMessage", (chatId, sender, content) => {
      console.log("Received message:", { chatId, sender, content });
      if (chatId === selectedContact.chatId && !isSending) {
        const messageId = `${chatId}-${sender}-${content}-${Date.now()}`;
        if (!processedMessageIds.has(messageId)) {
          const newMessage = {
            id: messageId,
            chatId: chatId,
            sender: sender,
            content: content,
            timestamp: new Date().toISOString()
          };
          setProcessedMessageIds(prev => new Set(prev).add(messageId));
          setMessages(prev => [...prev, newMessage]);
        }
      }
      setIsSending(false);
    });
    
    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected");
        await connection.invoke("JoinRoom", selectedContact.chatId.toString());
      } catch (err) {
        console.error("SignalR Connection Error:", err);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    return () => {
      if (connection.state === "Connected") {
        connection.invoke("LeaveRoom", selectedContact.chatId.toString())
          .then(() => connection.stop())
          .catch(console.error);
      }
    };
  }, [selectedContact?.chatId]);

  // Add message loading when contact changes
  useEffect(() => {
    if (selectedContact?.chatId) {
      console.log("selectedContact :", selectedContact);
      setProcessedMessageIds(new Set());
      
      chatService.getMessages(selectedContact.chatId)
        .then((fetchedMessages) => {
          const messagesWithIds = fetchedMessages.map(msg => ({
            ...msg,
            id: `${msg.chatId}-${msg.sender}-${msg.content}-${new Date(msg.timestamp).getTime()}`
          }));
          setMessages(messagesWithIds);
          setProcessedMessageIds(new Set(messagesWithIds.map(msg => msg.id)));
        })
        .catch((error) => {
          console.error("Error loading messages:", error);
        });
    }
  }, [selectedContact]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        setIsSending(true);
        const message = await chatService.sendMessage(
          selectedContact.chatId,
          role,
          newMessage
        );
        
        const messageId = `${message.chatId}-${message.sender}-${message.content}-${Date.now()}`;
        if (!processedMessageIds.has(messageId)) {
          setProcessedMessageIds(prev => new Set(prev).add(messageId));
          setMessages(prev => [...prev, message]);
        }
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error.response?.data || error);
        setIsSending(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] bg-[#f5f7fb]">
      {/* Header */}
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
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === role ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl px-4 py-2 rounded-lg shadow-sm ${
                message.sender === role
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {message.content}
              <span className="block text-xs mt-1 opacity-70">
                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-6 py-3 bg-white border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="w-full py-2 px-4 bg-gray-100 rounded-full"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
