    "use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

/* ---------- helpers ---------- */
function k(n) {
  if (n == null) return "0";
  if (n < 1000) return String(n);
  if (n < 1e6) return (n / 1e3).toFixed(1) + "k";
  return (n / 1e6).toFixed(1) + "M";
}

function useMedia(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function shorten(str, max = 18) {
  if (!str) return "-";
  if (str.length <= max) return str;
  // keep start & end
  const head = str.slice(0, Math.max(6, max - 10));
  const tail = str.slice(-8);
  return head + "…" + tail;
}

/* ---------- page ---------- */
export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [start, setStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 13);
    return d.toISOString().slice(0, 10);
  });
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  // media flags
  const isXS = useMedia("(max-width: 380px)");
  const isSM = useMedia("(max-width: 640px)");
  const isMD = useMedia("(max-width: 768px)");

  const chartHeight = isXS ? 180 : isSM ? 220 : 260;
  const pieRadius  = isXS ? 70  : isSM ? 85  : 100;
  const showLegend = !isXS;

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
  const topPagesRaw = data?.topPages || [];
  const topReferrersRaw = data?.topReferrers || [];
  const geo = data?.geo || [];
  const recent = data?.recentVisits || [];
  const summary = data?.summary || { pageviews: 0, uniqueSessions: 0, uniqueIPs: 0, pagesPerSession: 0 };

  // shorten labels on small screens
  const topPages = useMemo(
    () =>
      topPagesRaw.map((p) => ({
        ...p,
        label: isSM ? shorten((p.path || "").split("?")[0]) : p.path,
      })),
    [topPagesRaw, isSM]
  );
  const topReferrers = useMemo(
    () =>
      topReferrersRaw.map((r) => ({
        ...r,
        label: isSM ? shorten(r.referrer || "") : r.referrer,
      })),
    [topReferrersRaw, isSM]
  );

  const pieColors = useMemo(
    () => ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#e11d48", "#a855f7", "#06b6d4", "#84cc16"],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* header & controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Site Analytics</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <label className="text-xs sm:text-sm text-slate-600 flex items-center">
              <span className="whitespace-nowrap">Start</span>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="ml-2 border rounded px-2 py-1 text-xs sm:text-sm"
              />
            </label>
            <label className="text-xs sm:text-sm text-slate-600 flex items-center">
              <span className="whitespace-nowrap">End</span>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="ml-2 border rounded px-2 py-1 text-xs sm:text-sm"
              />
            </label>
            <button
              onClick={fetchData}
              disabled={loading}
              className={`px-3 sm:px-4 py-2 rounded text-white ${
                loading ? "bg-slate-300" : "bg-slate-800 hover:bg-slate-900"
              } text-xs sm:text-sm`}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Pageviews</div>
            <div className="text-xl sm:text-2xl font-semibold">{k(summary.pageviews)}</div>
          </div>
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Unique Sessions</div>
            <div className="text-xl sm:text-2xl font-semibold">{k(summary.uniqueSessions)}</div>
          </div>
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Unique IPs</div>
            <div className="text-xl sm:text-2xl font-semibold">{k(summary.uniqueIPs)}</div>
          </div>
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Pages / Session</div>
            <div className="text-xl sm:text-2xl font-semibold">{summary.pagesPerSession}</div>
          </div>
        </div>

        {/* Timeseries */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
          <div className="text-xs sm:text-sm text-slate-600 mb-2">Pageviews & Sessions (Daily)</div>
          <div className="w-full" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: isSM ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isSM ? 10 : 12 }} />
                <Tooltip />
                {showLegend && <Legend />}
                <Line type="monotone" dataKey="pageviews" name="Pageviews" stroke="#0ea5e9" dot={false} />
                <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#22c55e" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages & Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-600 mb-2">Top Pages</div>
            <div className="w-full" style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={isSM ? "label" : "path"}
                    tick={{ fontSize: isSM ? 10 : 12 }}
                    interval={isSM ? "preserveStartEnd" : 0}
                    angle={isSM ? 0 : -25}
                    height={isSM ? 40 : 60}
                  />
                  <YAxis tick={{ fontSize: isSM ? 10 : 12 }} />
                  <Tooltip />
                  <Bar dataKey="pageviews" name="Pageviews" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="text-xs sm:text-sm text-slate-600 mb-2">Top Referrers</div>
            <div className="w-full" style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topReferrers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={isSM ? "label" : "referrer"}
                    tick={{ fontSize: isSM ? 10 : 12 }}
                    interval={isSM ? "preserveStartEnd" : 0}
                    angle={isSM ? 0 : -25}
                    height={isSM ? 40 : 60}
                  />
                  <YAxis tick={{ fontSize: isSM ? 10 : 12 }} />
                  <Tooltip />
                  <Bar dataKey="pageviews" name="Pageviews" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Geo Pie */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
          <div className="text-xs sm:text-sm text-slate-600 mb-2">Countries</div>
          <div className="w-full" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geo}
                  dataKey="pageviews"
                  nameKey="country"
                  outerRadius={pieRadius}
                  label={!isXS}
                >
                  {geo.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                {showLegend && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="text-xs sm:text-sm text-slate-600 mb-3">Recent Visits</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Path</th>
                  <th className="py-2 pr-4 hidden sm:table-cell">Referrer</th>
                  <th className="py-2 pr-4">Country</th>
                  <th className="py-2 pr-4 hidden md:table-cell">City</th>
                  <th className="py-2 pr-4 hidden md:table-cell">Session</th>
                  <th className="py-2 pr-4 hidden lg:table-cell">IP</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-4 whitespace-nowrap">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">{isSM ? shorten(r.path || "") : (r.path || "-")}</td>
                    <td className="py-2 pr-4 hidden sm:table-cell">{isSM ? "-" : (r.referrer || "-")}</td>
                    <td className="py-2 pr-4">{r.country || "-"}</td>
                    <td className="py-2 pr-4 hidden md:table-cell">{r.city || "-"}</td>
                    <td className="py-2 pr-4 hidden md:table-cell">{r.sid ? r.sid.slice(0, 8) + "…" : "-"}</td>
                    <td className="py-2 pr-4 hidden lg:table-cell">{r.ip || "-"}</td>
                  </tr>
                ))}
                {!recent.length && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">No data for this range.</td>
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
