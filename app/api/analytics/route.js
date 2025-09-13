import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/mongodb";
import dbConnect from "@/lib/mongodb";
import Visit from "@/models/Visits";

export const runtime = "nodejs";

function parseDateParam(value, fallback) {
  if (!value) return fallback;
  const d = new Date(value);
  return isNaN(d.getTime()) ? fallback : d;
}

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    // Defaults: last 14 days
    const endDefault = new Date();
    const startDefault = new Date();
    startDefault.setDate(endDefault.getDate() - 13); // inclusive range of 14 days

    const start = parseDateParam(searchParams.get("start"), startDefault);
    const endRaw = parseDateParam(searchParams.get("end"), endDefault);
    // Make end exclusive (add 1 day at midnight so we include that day fully)
    const end = new Date(endRaw);
    end.setHours(23, 59, 59, 999);

    const matchStage = { createdAt: { $gte: start, $lte: end } };

    const timeseriesAgg = Visit.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          pageviews: { $sum: 1 },
          sessions: { $addToSet: "$sid" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          pageviews: 1,
          sessions: { $size: "$sessions" },
        },
      },
      { $sort: { date: 1 } },
    ]);

    const summaryAgg = Visit.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          pageviews: { $sum: 1 },
          sessions: { $addToSet: "$sid" },
          ips: { $addToSet: "$ip" },
        },
      },
      {
        $project: {
          _id: 0,
          pageviews: 1,
          uniqueSessions: { $size: "$sessions" },
          uniqueIPs: { $size: "$ips" },
        },
      },
    ]);

    const topPagesAgg = Visit.aggregate([
      { $match: matchStage },
      { $group: { _id: "$path", pageviews: { $sum: 1 } } },
      { $sort: { pageviews: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, path: "$_id", pageviews: 1 } },
    ]);

    const topReferrersAgg = Visit.aggregate([
      { $match: { ...matchStage, referrer: { $ne: null, $ne: "" } } },
      { $group: { _id: "$referrer", pageviews: { $sum: 1 } } },
      { $sort: { pageviews: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, referrer: "$_id", pageviews: 1 } },
    ]);

    const geoAgg = Visit.aggregate([
      { $match: matchStage },
      { $group: { _id: "$country", pageviews: { $sum: 1 } } },
      { $sort: { pageviews: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, country: "$_id", pageviews: 1 } },
    ]);

    const recentVisitsPromise = Visit.find(matchStage, {
      path: 1,
      referrer: 1,
      country: 1,
      city: 1,
      sid: 1,
      ip: 1,
      createdAt: 1,
      _id: 0,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const [
      timeseries,
      summaryArr,
      topPages,
      topReferrers,
      geo,
      recentVisits,
    ] = await Promise.all([
      timeseriesAgg,
      summaryAgg,
      topPagesAgg,
      topReferrersAgg,
      geoAgg,
      recentVisitsPromise,
    ]);

    const summary = summaryArr[0] || { pageviews: 0, uniqueSessions: 0, uniqueIPs: 0 };
    const pagesPerSession =
      summary.uniqueSessions > 0 ? +(summary.pageviews / summary.uniqueSessions).toFixed(2) : 0;

    return NextResponse.json({
      range: {
        start: start.toISOString(),
        end: endRaw.toISOString(),
      },
      summary: {
        pageviews: summary.pageviews,
        uniqueSessions: summary.uniqueSessions,
        uniqueIPs: summary.uniqueIPs,
        pagesPerSession,
      },
      timeseries,    // [{ date: "YYYY-MM-DD", pageviews, sessions }]
      topPages,      // [{ path, pageviews }]
      topReferrers,  // [{ referrer, pageviews }]
      geo,           // [{ country, pageviews }]
      recentVisits,  // [{ path, referrer, country, city, sid, ip, createdAt }]
    });
  } catch (e) {
    console.error("GET /api/analytics error:", e);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
