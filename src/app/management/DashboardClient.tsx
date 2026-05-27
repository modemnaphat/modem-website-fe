"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

type DailyMetric = {
  date: string;
  visitors: number;
  pageViews: number;
};

type AnalyticsData = {
  totals: {
    totalVisitors: number;
    totalPageViews: number;
    todayVisitors: number;
    todayPageViews: number;
    last7Visitors: number;
    last7PageViews: number;
  };
  daily: DailyMetric[];
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

const DashboardClient = () => {
  const analyticsQuery = useQuery({
    queryKey: ["management-analytics", 7],
    queryFn: async () => {
      const response = await fetch("/api/management/analytics?range=7", {
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/management/login";
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error("Could not load analytics data.");
      }

      return response.json() as Promise<AnalyticsData>;
    },
    refetchInterval: 15000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  const { data } = analyticsQuery;
  const isLoading = analyticsQuery.isLoading;
  const maxDailyValue = useMemo(() => {
    if (!data?.daily.length) return 1;

    return Math.max(
      1,
      ...data.daily.map((metric) => Math.max(metric.visitors, metric.pageViews))
    );
  }, [data]);

  const cards = data
    ? [
        { label: "Total Visitors", value: data.totals.totalVisitors },
        { label: "Total Page Views", value: data.totals.totalPageViews },
        { label: "Today Visitors", value: data.totals.todayVisitors },
        { label: "Today Page Views", value: data.totals.todayPageViews },
        { label: "7-Day Visitors", value: data.totals.last7Visitors },
        { label: "7-Day Page Views", value: data.totals.last7PageViews },
      ]
    : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <div className="flex flex-col gap-2">
          <p className="font-hero text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Management
          </p>
          <h1 className="font-hero text-3xl font-bold text-white max-sm:text-2xl">
            Visitor Dashboard
          </h1>
          <p className="max-w-2xl text-white/60">
            First-party analytics for unique visitors and page views across the
            public website.
          </p>
          <p className="text-sm text-white/40">
            Auto refreshes every 15 seconds.
          </p>
        </div>

      </div>

      {analyticsQuery.isError && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          Could not load analytics data. The dashboard will keep trying
          automatically.
        </div>
      )}

      {isLoading && !data ? (
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-lg border border-[#282828] bg-white/[0.03]"
            />
          ))}
        </div>
      ) : null}

      {data ? (
        <>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-lg border border-[#282828] bg-white/[0.03] p-5"
              >
                <p className="text-sm text-white/50">{card.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {formatNumber(card.value)}
                </p>
              </div>
            ))}
          </div>

          <section className="rounded-lg border border-[#282828] bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
              <div>
                <h2 className="font-hero text-xl font-bold text-white">
                  Last 7 Days
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  Red = page views, gray = unique visitors.
                </p>
              </div>
            </div>

            <div className="mt-8 flex h-80 items-end gap-2 overflow-x-auto pb-2">
              {data.daily.map((metric, index) => {
                const pageViewHeight =
                  (metric.pageViews / maxDailyValue) * 100 || 2;
                const visitorHeight =
                  (metric.visitors / maxDailyValue) * 100 || 2;
                const shouldShowLabel =
                  index === 0 ||
                  index === data.daily.length - 1 ||
                  index % 6 === 0;

                return (
                  <div
                    key={metric.date}
                    className="flex min-w-8 flex-1 flex-col items-center gap-2"
                    title={`${formatDateLabel(metric.date)}: ${
                      metric.visitors
                    } visitors, ${metric.pageViews} views`}
                  >
                    <div className="flex h-60 w-full items-end justify-center gap-2 rounded-t bg-white/[0.02] px-2">
                      <span
                        className="w-6 rounded-t bg-red-500 max-sm:w-4"
                        style={{ height: `${pageViewHeight}%` }}
                      />
                      <span
                        className="w-6 rounded-t bg-white/40 max-sm:w-4"
                        style={{ height: `${visitorHeight}%` }}
                      />
                    </div>
                    <p className="h-8 text-center text-[11px] text-white/40">
                      {shouldShowLabel ? formatDateLabel(metric.date) : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default DashboardClient;
