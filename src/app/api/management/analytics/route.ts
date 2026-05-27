import { NextRequest, NextResponse } from "next/server";

import {
  isManagementAuthConfigured,
  MANAGEMENT_SESSION_COOKIE,
  verifyManagementSessionToken,
} from "@/lib/managementAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function addUtcDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function countUniqueVisitorsSince(since: Date) {
  const visitors = await prisma.websitePageView.findMany({
    where: { createdAt: { gte: since } },
    distinct: ["visitorId"],
    select: { visitorId: true },
  });

  return visitors.length;
}

export async function GET(request: NextRequest) {
  if (!isManagementAuthConfigured()) {
    return NextResponse.json(
      { error: "Management dashboard auth is not configured" },
      { status: 503 }
    );
  }

  const token = request.cookies.get(MANAGEMENT_SESSION_COOKIE)?.value;
  if (!verifyManagementSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rangeParam = Number(request.nextUrl.searchParams.get("range") ?? "7");
  const range = Number.isFinite(rangeParam)
    ? Math.min(Math.max(Math.trunc(rangeParam), 1), 90)
    : 30;

  const todayStart = startOfUtcDay(new Date());
  const dailyStart = addUtcDays(todayStart, -(range - 1));
  const last7Start = addUtcDays(todayStart, -6);

  const [
    totalVisitors,
    totalPageViews,
    todayPageViews,
    last7Visitors,
    last7PageViews,
    pageViewsInRange,
  ] = await Promise.all([
    prisma.websiteVisitor.count(),
    prisma.websitePageView.count(),
    prisma.websitePageView.count({ where: { createdAt: { gte: todayStart } } }),
    countUniqueVisitorsSince(last7Start),
    prisma.websitePageView.count({ where: { createdAt: { gte: last7Start } } }),
    prisma.websitePageView.findMany({
      where: { createdAt: { gte: dailyStart } },
      select: { createdAt: true, visitorId: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const dailyMap = new Map<
    string,
    { pageViews: number; visitorIds: Set<string> }
  >();

  for (let index = 0; index < range; index += 1) {
    const date = addUtcDays(dailyStart, index);
    dailyMap.set(toDateKey(date), { pageViews: 0, visitorIds: new Set() });
  }

  for (const pageView of pageViewsInRange) {
    const key = toDateKey(pageView.createdAt);
    const daily = dailyMap.get(key);
    if (!daily) continue;

    daily.pageViews += 1;
    daily.visitorIds.add(pageView.visitorId);
  }

  const todayKey = toDateKey(todayStart);
  const daily = Array.from(dailyMap.entries()).map(([date, value]) => ({
    date,
    pageViews: value.pageViews,
    visitors: value.visitorIds.size,
  }));

  return NextResponse.json({
    totals: {
      totalVisitors,
      totalPageViews,
      todayVisitors: dailyMap.get(todayKey)?.visitorIds.size ?? 0,
      todayPageViews,
      last7Visitors,
      last7PageViews,
    },
    daily,
  });
}
