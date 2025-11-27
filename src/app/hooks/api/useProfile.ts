"use client";

// Lib
import { useQuery } from "@tanstack/react-query";

// Include in Project
import { api } from "@/app/configs/axios";
import type { TProfile } from "@/app/utils/types";

async function fetchProfile(): Promise<TProfile> {
  const res = await api.get<TProfile>("/profile");
  return res.data;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}