"use client";

import { useQuery } from "@tanstack/react-query";
import type { TPortfolio } from "@/app/utils/types";

async function fetchPortfolio(): Promise<TPortfolio> {
  const res = await fetch("/api/portfolio");
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
  });
}
