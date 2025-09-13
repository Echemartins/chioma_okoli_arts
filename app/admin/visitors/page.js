"use client";

import { useEffect, useState } from "react";

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState([]);
  const [artworkId, setArtworkId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function fetchVisitors() {
    let query = [];
    if (artworkId) query.push(`artworkId=${artworkId}`);
    if (startDate && endDate) query.push(`startDate=${startDate}&endDate=${endDate}`);

    const res = await fetch(`/api/visitors?${query.join("&")}`);
    const data = await res.json();
    setVisitors(data);
  }

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Artwork Visitors</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Artwork ID"
          value={artworkId}
          onChange={(e) => setArtworkId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchVisitors}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Visitors Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Artwork</th>
            <th className="p-2 border">IP</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v) => (
            <tr key={v._id}>
              <td className="p-2 border">{v.artworkId?.title || "N/A"}</td>
              <td className="p-2 border">{v.ip}</td>
              <td className="p-2 border">
                {v.location.city}, {v.location.country}
              </td>
              <td className="p-2 border">{new Date(v.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}