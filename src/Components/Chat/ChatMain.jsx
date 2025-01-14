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

  // Add this effect to update the last message
  useEffect(() => {
    if (messages.length > 0 && selectedContact) {
      const lastMessage = messages[messages.length - 1];
      selectedContact.lastMessage = lastMessage.content;
      selectedContact.lastMessageTimestamp = lastMessage.timestamp;
    }
  }, [messages]);

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

  const formatPrescriptionMessage = (content) => {
    if (content.startsWith("New Prescription Details")) {
      const sections = content.split('\n\n');
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">{sections[0]}</h3>
          {sections.slice(1).map((section, index) => {
            const [title, ...details] = section.split('\n');
            return (
              <div key={index} className="space-y-1">
                <h4 className="font-semibold">{title.replace('*', '').replace('*', '')}</h4>
                <div className="pl-4">
                  {details.join('\n')}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return content;
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-2 border-gray-200">
              <span className="text-xl font-bold text-white">
                {selectedContact.otherPartyName.split(' ').slice(0, 2).map(name => name.charAt(0).toUpperCase()).join('')}
              </span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{selectedContact.otherPartyName}</h2>
            <p className="text-sm text-green-600 font-medium">Active Now</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === role ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl px-6 py-3 rounded-2xl ${
                message.sender === role
                  ? "bg-blue-600 text-white rounded-br-none shadow-blue-200"
                  : "bg-white text-gray-800 rounded-bl-none shadow-gray-200"
              } shadow-lg`}
            >
              {typeof message.content === 'string' && message.content.startsWith("🏥 *New Prescription Details* 🏥") ? (
                formatPrescriptionMessage(message.content)
              ) : (
                <p className="text-base leading-relaxed">{message.content}</p>
              )}
              <span className="block text-xs mt-2 opacity-80">
                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-8 py-4 bg-white shadow-lg">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 py-3 px-6 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-200"
          />
          <button 
            onClick={handleSendMessage} 
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
