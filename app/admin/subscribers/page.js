"use client";
import { useEffect, useState } from "react";
import AdminHeader from "../adminheader";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch("/api/admin/subscribers");
        if (!res.ok) throw new Error("Failed to fetch subscribers");
        const data = await res.json();
        setSubscribers(data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-orange-800">
      <AdminHeader />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-10 text-center text-orange-600">
          Newsletter Subscribers
        </h1>

        {subscribers.length === 0 ? (
          <p className="text-gray-500 text-center">No subscribers found.</p>
        ) : (
          <ul className="space-y-3">
            {subscribers.map((s, i) => (
              <li
                key={i}
                className="bg-orange-100 border border-orange-300 text-orange-900 px-4 py-3 rounded shadow-sm hover:bg-orange-200 transition"
              >
                {s.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
