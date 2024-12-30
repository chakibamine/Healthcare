"use client";
import { useState } from "react";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatMain from "@/Components/Chat/ChatMain";

const contacts = [
  { 
    id: 1, 
    name: "Elizabeth Polson", 
    avatar: "https://ui-avatars.com/api/?name=Elizabeth+Polson&background=random",
    lastMessage: "Hi I need to meet Dr. Joel Tomorrow Urgently", 
    messages: [
      { id: 1, text: "Hi I need to meet Dr. Joel Tomorrow Urgently", sender: "other", timestamp: "11:30 AM" },
      { id: 2, text: "Please arrange appointment.", sender: "other", timestamp: "11:30 AM" },
    ]
  },
  { 
    id: 2, 
    name: "Dr. Joel Thompson", 
    avatar: "https://ui-avatars.com/api/?name=Joel+Thompson&background=random",
    lastMessage: "I'll check the schedule", 
    messages: [
      { id: 1, text: "Good morning!", sender: "other", timestamp: "9:30 AM" },
      { id: 2, text: "I'll check the schedule", sender: "other", timestamp: "9:31 AM" },
    ]
  },
];

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white shadow-lg rounded-lg overflow-hidden">
      <ChatSidebar 
        contacts={contacts} 
        onSelectContact={setSelectedContact}
        selectedContact={selectedContact}
      />
      <ChatMain selectedContact={selectedContact} />
    </div>
  );
} 