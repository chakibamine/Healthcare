"use client";
import { useEffect, useState } from "react";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatMain from "@/Components/Chat/ChatMain";
import { useSelector } from "react-redux";
import axios from "axios";

export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const { role, userId } = useSelector((state) => state.auth);

  console.log("auth :", userId, role);
  let role1 = role === "Doctor" ? "doctor" : "patient";

  useEffect(() => {
    if (userId && role) {
      axios
        .get(`http://localhost:5167/api/chat/contacts/${userId}?role=${role1}`)
        .then((response) => {
          const fetchedContacts = response.data;
          setContacts(fetchedContacts);
          console.log("contacts:", fetchedContacts);

          if (fetchedContacts.length > 0) {
            setSelectedContact(fetchedContacts[0]); // Select the first contact by default
          }
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    }
  }, [userId]); // Include userId as a dependency

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white shadow-lg rounded-lg overflow-hidden">
      <ChatSidebar 
        contacts={contacts} 
        onSelectContact={(contact) => setSelectedContact(contact)} // Pass function to update the selected contact
        selectedContact={selectedContact}
      />
      {selectedContact ? (
        <ChatMain selectedContact={selectedContact} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
}
