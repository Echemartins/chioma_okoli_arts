'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '../../components/adminheader';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

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
    <div className="bg-white text-gray-900 min-h-screen">
      <AdminHeader />
      <h1 className="text-3xl font-bold m-12">Admin Dashboard</h1>

      {/* Stat Cards */}
      {loadingStats ? (
        <div className="flex justify-center my-12">
          <ClipLoader color="#f97316" size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 m-6 md:m-12">
          <StatCard label="Total Artworks" value={stats.artworksCount} />
          <StatCard label="Subscribers" value={stats.subscribersCount} />
          <StatCard label="Messages" value={stats.messagesCount} />
        </div>
      )}

      {/* Recent Requests */}
      <Section title="Recent Purchase Requests">
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests yet.</p>
        ) : (
          <div className="space-y-4 m-6 md:m-12">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border border-orange-200 bg-orange-50 rounded-md p-4"
              >
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Message:</strong> {req.message}</p>
                <p className="text-sm text-gray-500">
                  Requested on {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Latest Artworks */}
      <Section title="Latest Artworks">
        {loadingStats ? (
          <div className="flex justify-center">
            <ClipLoader color="#f97316" size={60} />
          </div>
        ) : (
          <ArtworkGrid artworks={latestArtworks} />
        )}
      </Section>

      {/* Top Viewed Artworks */}
      <Section title="Top Viewed Artworks">
        {loadingStats ? (
          <div className="flex justify-center">
            <ClipLoader color="#f97316" size={60} />
          </div>
        ) : (
          <ArtworkGrid artworks={topViewed} showViews />
        )}
      </Section>
    </div>
  );
}

// ------------------------
// Components
// ------------------------

function StatCard({ label, value }) {
  return (
    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl shadow hover:shadow-md transition-all duration-200">
      <h2 className="text-lg font-semibold text-orange-700">{label}</h2>
      <p className="text-4xl font-bold text-orange-600 mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-12 m-6 md:m-12" >
      <h2 className="text-2xl font-semibold mb-4 text-orange-700">{title}</h2>
      {children}
    </section>
  );
}

function ArtworkGrid({ artworks, showViews = false }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {artworks.map((art) => (
        <div
          key={art._id}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
        >
          <Image
            src={art.imageUrl}
            alt={art.title}
            width={500}
            height={400}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <p className="font-medium text-sm truncate">{art.title}</p>
            {showViews && (
              <p className="text-xs text-gray-500 mt-1">Views: {art.views}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
