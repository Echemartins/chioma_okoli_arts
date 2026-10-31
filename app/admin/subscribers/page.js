"use client";
import {adminFetch} from "@/lib/admin-fetch";

import { useEffect, useState } from "react";
export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await adminFetch("/api/admin/subscribers");
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
    <div className="min-h-screen bg-white text-stone-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-10 text-center text-stone-600">
          Newsletter Subscribers
        </h1>

        {subscribers.length === 0 ? (
          <p className="text-gray-500 text-center">No subscribers found.</p>
        ) : (
          <ul className="space-y-3">
            {subscribers.map((s, i) => (
              <li
                key={i}
                className="bg-stone-100 border border-stone-300 text-stone-900 px-4 py-3 rounded shadow-sm hover:bg-stone-200 transition"
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


