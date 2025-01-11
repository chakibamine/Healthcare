"use client";
import { FaSearch } from "react-icons/fa";

// Add a helper function for formatting time
const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatSidebar({ contacts, onSelectContact, selectedContact }) {
  return (
    <div className="w-96 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full py-2 px-4 bg-gray-100 rounded-lg"
          />
          <FaSearch className="absolute left-4 top-3 text-gray-400" />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.chatId} 
            className={`flex items-center p-3 cursor-pointer transition-colors duration-150 ${
              selectedContact?.chatId === contact.chatId
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-50 border-l-4 border-transparent"
            }`}
            onClick={() => {
              console.log("Selected contact:", contact); 
              onSelectContact(contact); 
            }}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.otherPartyName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-baseline">
                <h2 className="font-semibold text-gray-800">{contact.otherPartyName}</h2>
                <span className="text-xs text-gray-800">
                  {formatMessageTime(contact.lastMessageTimestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
