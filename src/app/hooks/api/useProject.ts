"use client";

// Lib
import { useQuery } from "@tanstack/react-query";

// Include in Project
import { api } from "@/app/configs/axios";
import type { TProject } from "@/app/utils/types";

async function fetchProjects(): Promise<TProject[]> {
  const res = await api.get<TProject[]>("/projects");
  return res.data;
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

