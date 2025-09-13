"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

function k(n) {
  if (n == null) return "0";
  if (n < 1000) return String(n);
  if (n < 1e6) return (n / 1e3).toFixed(1) + "k";
  return (n / 1e6).toFixed(1) + "M";
}

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [start, setStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 13);
    return d.toISOString().slice(0, 10);
  });
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ start, end }).toString();
      const res = await fetch(`/api/analytics?${qs}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
      alert("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeseries = data?.timeseries || [];
  const topPages = data?.topPages || [];
  const topReferrers = data?.topReferrers || [];
  const geo = data?.geo || [];
  const recent = data?.recentVisits || [];
  const summary = data?.summary || { pageviews: 0, uniqueSessions: 0, uniqueIPs: 0, pagesPerSession: 0 };

  const pieColors = useMemo(
    () => ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#e11d48", "#a855f7", "#06b6d4", "#84cc16"],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Site Analytics</h1>
          <div className="flex gap-3 items-center">
            <label className="text-sm text-slate-600">
              Start
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="ml-2 border rounded px-2 py-1"
              />
            </label>
            <label className="text-sm text-slate-600">
              End
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="ml-2 border rounded px-2 py-1"
              />
            </label>
            <button
              onClick={fetchData}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? "bg-slate-300" : "bg-slate-800 hover:bg-slate-900"}`}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">Pageviews</div>
            <div className="text-2xl font-semibold">{k(summary.pageviews)}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">Unique Sessions</div>
            <div className="text-2xl font-semibold">{k(summary.uniqueSessions)}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">Unique IPs</div>
            <div className="text-2xl font-semibold">{k(summary.uniqueIPs)}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-500">Pages / Session</div>
            <div className="text-2xl font-semibold">{summary.pagesPerSession}</div>
          </div>
        </div>

        {/* Timeseries */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="text-sm text-slate-600 mb-2">Pageviews & Sessions (Daily)</div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pageviews" name="Pageviews" stroke="#0ea5e9" />
                <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages & Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-600 mb-2">Top Pages</div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="path" tick={{ fontSize: 12 }} interval={0} angle={-25} height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pageviews" name="Pageviews" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-sm text-slate-600 mb-2">Top Referrers</div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topReferrers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="referrer" tick={{ fontSize: 12 }} interval={0} angle={-25} height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pageviews" name="Pageviews" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Geo Pie */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="text-sm text-slate-600 mb-2">Countries</div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={geo} dataKey="pageviews" nameKey="country" outerRadius={100} label>
                  {geo.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-slate-600 mb-3">Recent Visits</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Path</th>
                  <th className="py-2 pr-4">Referrer</th>
                  <th className="py-2 pr-4">Country</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Session</th>
                  <th className="py-2 pr-4">IP</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-4">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">{r.path || "-"}</td>
                    <td className="py-2 pr-4">{r.referrer || "-"}</td>
                    <td className="py-2 pr-4">{r.country || "-"}</td>
                    <td className="py-2 pr-4">{r.city || "-"}</td>
                    <td className="py-2 pr-4">{r.sid ? r.sid.slice(0, 8) + "…" : "-"}</td>
                    <td className="py-2 pr-4">{r.ip || "-"}</td>
                  </tr>
                ))}
                {!recent.length && (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-slate-400">No data for this range.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
