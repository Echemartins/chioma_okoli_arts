'use client';

import { useEffect, useState } from 'react';
import AdminHeader from './adminheader';
import Image from 'next/image'; 
import {ClipLoader} from 'react-spinners'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    artworksCount: 0,
    subscribersCount: 0,
    messagesCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const [requests, setRequests] = useState([]);
  const [latestArtworks, setLatestArtworks] = useState([]);
  const [topViewed, setTopViewed] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const [statsRes, reqRes, latestRes, topRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/requests'),
        fetch('/api/admin/artworks/latest'),
        fetch('/api/admin/artworks/top-viewed'),
      ]);

      const statsData = await statsRes.json();
      const reqData = await reqRes.json();
      const latestData = await latestRes.json();
      const topData = await topRes.json();

      if (statsRes.ok) setStats(statsData);
      setRequests(reqData);
      setLatestArtworks(latestData);
      setTopViewed(topData);
      setLoadingStats(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <AdminHeader />
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loadingStats ? (
        <div className='flex justify-center'>
        <p className="text-gray-400">Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Artworks" value={stats.artworksCount} />
          <StatCard label="Subscribers" value={stats.subscribersCount} />
          <StatCard label="Messages" value={stats.messagesCount} />
        </div>
      )}
    
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Purchase Requests</h2>
        {requests.length === 0 ? (
          <p>No requests yet.</p>
            // <Spinner/>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-gray-800 p-4 rounded-md">
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Message:</strong> {req.message}</p>
                <p className="text-sm text-gray-400">
                  Requested on {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>


      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Artworks</h2>
        { loadingStats? 
        (<ClipLoader color="#2563eb" size={60}/>):
        (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {latestArtworks.map((art) => (
            <div key={art._id} className="bg-gray-800 p-2 rounded-md">
              <Image
                src={art.imageUrl}
                width={500}
                height={400}
                alt={art.title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm">{art.title}</p>
            </div>
          ))}
        </div>) }
        
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Top Viewed Artworks</h2>
        {loadingStats? <ClipLoader color="#2563eb" size={60}/>:(<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topViewed.map((art) => (
            <div key={art._id} className="bg-gray-800 p-2 rounded-md">
              <Image
                src={art.imageUrl}
                alt={art.title}
                width={500}
                height={400}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm">{art.title}</p>
              <p className="text-gray-400 text-xs">Views: {art.views}</p>
            </div>
          ))}
        </div>) }
        
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
      <h2 className="text-xl font-semibold">{label}</h2>
      <p className="text-4xl font-bold mt-2 text-purple-400">{value}</p>
    </div>
  );
}
