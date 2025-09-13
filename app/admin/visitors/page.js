"use client";

import { useEffect, useMemo, useState } from "react";

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState([]);
  const [artworkId, setArtworkId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // client-side pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  async function fetchVisitors() {
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams();
      if (artworkId) qs.set("artworkId", artworkId);
      if (startDate && endDate) {
        qs.set("startDate", startDate);
        qs.set("endDate", endDate);
      }
      const res = await fetch(`/api/visitors?${qs.toString()}`);
      if (!res.ok) throw new Error(`Failed to load visitors: ${res.status}`);
      const data = await res.json();
      setVisitors(Array.isArray(data) ? data : []);
      setPage(1); // reset to first page on new search
    } catch (e) {
      console.error(e);
      setErr("Failed to load visitors. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVisitors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = visitors.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pagedVisitors = useMemo(() => {
    const start = (page - 1) * perPage;
    return visitors.slice(start, start + perPage);
  }, [visitors, page, perPage]);

  const resetFilters = () => {
    setArtworkId("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    fetchVisitors();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Artwork Visitors</h1>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Artwork ID"
              value={artworkId}
              onChange={(e) => setArtworkId(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={fetchVisitors}
                disabled={loading}
                className={`px-4 py-2 rounded text-white text-sm ${
                  loading ? "bg-slate-300" : "bg-orange-600 hover:bg-orange-700"
                } w-full sm:w-auto`}
              >
                {loading ? "Loading..." : "Apply Filters"}
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded border border-slate-300 text-slate-600 text-sm w-full sm:w-auto"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
            <div className="text-xs sm:text-sm text-slate-600">
              {total.toLocaleString()} result{total === 1 ? "" : "s"}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-slate-600">
                Per page
                <select
                  className="ml-2 border rounded px-2 py-1 text-xs sm:text-sm"
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {[10, 20, 50].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded border text-xs sm:text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Prev
                </button>
                <span className="text-xs sm:text-sm text-slate-600">
                  {page} / {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded border text-xs sm:text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {err && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg p-3 mb-4">
            {err}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 animate-pulse">
            <div className="h-4 w-1/3 bg-slate-200 rounded mb-3" />
            <div className="h-32 bg-slate-200 rounded" />
          </div>
        )}

        {/* Mobile cards (xs/sm) */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {!loading && pagedVisitors.map((v) => {
            const title = v.artworkId?.title || v.artworkId || "N/A";
            const city = v.location?.city || "-";
            const country = v.location?.country || "-";
            return (
              <div key={v._id} className="bg-white rounded-2xl p-3 shadow-sm">
                <div className="text-sm font-medium text-slate-800">{title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{new Date(v.createdAt).toLocaleString()}</div>
                <div className="mt-2 text-sm">
                  <div><span className="text-slate-500">Location:</span> {city}, {country}</div>
                  <div className="text-slate-500 text-xs mt-1">IP: {v.ip || "-"}</div>
                </div>
              </div>
            );
          })}
          {!loading && !pagedVisitors.length && (
            <div className="text-center text-slate-400 py-8 bg-white rounded-2xl shadow-sm">No visitors</div>
          )}
        </div>

        {/* Desktop table (md+) */}
        <div className="hidden sm:block bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">Artwork</th>
                  <th className="py-2 pr-4 hidden lg:table-cell">IP</th>
                  <th className="py-2 pr-4">Location</th>
                  <th className="py-2 pr-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {!loading && pagedVisitors.map((v) => {
                  const title = v.artworkId?.title || v.artworkId || "N/A";
                  const city = v.location?.city || "-";
                  const country = v.location?.country || "-";
                  return (
                    <tr key={v._id} className="border-t">
                      <td className="py-2 pr-4">{title}</td>
                      <td className="py-2 pr-4 hidden lg:table-cell">{v.ip || "-"}</td>
                      <td className="py-2 pr-4">{city}, {country}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{new Date(v.createdAt).toLocaleString()}</td>
                    </tr>
                  );
                })}
                {!loading && !pagedVisitors.length && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-400">
                      No visitors
                    </td>
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
