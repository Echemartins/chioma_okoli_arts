"use client";
import { useEffect, useState } from "react";
import AdminHeader from "../adminheader"

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <>
    <AdminHeader/>
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.map((m, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded">
            <p><strong>Name:</strong> {m.name}</p>
            <p><strong>Email:</strong> {m.email}</p>
            <p><strong>Message:</strong> {m.message}</p>
            <p className="text-sm text-gray-400">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
