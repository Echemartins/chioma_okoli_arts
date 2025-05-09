"use client";
import { useEffect, useState } from "react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      const res = await fetch("/api/admin/subscribers");
      const data = await res.json();
      setSubscribers(data);
    };
    fetchSubs();
  }, []);

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Newsletter Subscribers</h1>
      <ul className="space-y-2">
        {subscribers.map((s, i) => (
          <li key={i} className="bg-gray-800 p-3 rounded">{s.email}</li>
        ))}
      </ul>
    </div>
  );
}
