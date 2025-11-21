"use client";

// Lib
import { useQuery } from "@tanstack/react-query";

// Include in Project
import { api } from "@/app/configs/axios";
import type { Skill } from "@/app/utils/types";

async function fetchSkills(): Promise<Skill[]> {
  const res = await api.get<Skill[]>("/skills");
  return res.data;
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
}

