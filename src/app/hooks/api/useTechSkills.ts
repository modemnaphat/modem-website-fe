"use client";

// Lib
import { useQuery } from "@tanstack/react-query";

// Include in Project
import { api } from "@/app/configs/axios";
import type { techSkill } from "@/app/utils/types";

async function fetchTechSkills(): Promise<techSkill[]> {
  const res = await api.get<techSkill[]>("/tech-skills");
  return res.data;
}

export function useTechSkills() {
  return useQuery({
    queryKey: ["tech-skills"],
    queryFn: fetchTechSkills,
  });
}

