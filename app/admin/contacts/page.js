"use client";
import { useEffect, useState } from "react";

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
      <div className="min-h-screen bg-white px-6 py-10 md:px-16 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">
          Contact Messages
        </h1>

        {messages.length === 0 ? (
          <p className="text-gray-500">No contact messages yet.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className="bg-orange-50 border border-orange-200 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <p className="text-lg font-semibold text-orange-700 mb-1">
                  {m.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> {m.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Message:</strong> {m.message}
                </p>
                <p className="text-xs text-gray-500 italic">
                  Sent on {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
