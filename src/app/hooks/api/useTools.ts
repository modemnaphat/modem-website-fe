"use client";

// Lib
import { useQuery } from "@tanstack/react-query";

// Include in Project
import { api } from "@/app/configs/axios";
import type { Tool } from "@/app/utils/types";

async function fetchTools(): Promise<Tool[]> {
  const res = await api.get<Tool[]>("/tools");
  return res.data;
}

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: fetchTools,
  });
}

