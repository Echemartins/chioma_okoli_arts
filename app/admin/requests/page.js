'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '../../../components/adminheader';

export default function ManageRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settling, setSettling] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/requests');
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error('Failed to load requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleSettle = async (id) => {
    setSettling(id);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'settled' }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: 'settled' } : req
          )
        );
      } else {
        console.error('Failed to settle request.');
      }
    } catch (error) {
      console.error('Error settling request:', error);
    } finally {
      setSettling(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-orange-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Purchase Requests</h1>

      {loading ? (
        <p className="text-orange-400">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-orange-500">No purchase requests yet.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-orange-50 border border-orange-200 p-5 rounded-lg shadow-sm"
            >
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              <p><strong>Message:</strong> {req.message || 'No message provided.'}</p>
              <p><strong>Artwork:</strong> {req.artworkId?.title || 'Unknown'}</p>
              <p className="text-sm">
                <strong>Status:</strong>{' '}
                <span
                  className={`font-semibold ${req.status === 'settled' ? 'text-green-600' : 'text-orange-500'
                    }`}
                >
                  {req.status}
                </span>
              </p>

              {req.status === 'pending' && (
                <button
                  onClick={() => handleSettle(req._id)}
                  disabled={settling === req._id}
                  className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-orange-300 transition px-4 py-2 rounded text-white font-medium"
                >
                  {settling === req._id ? 'Marking...' : 'Mark as Settled'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
