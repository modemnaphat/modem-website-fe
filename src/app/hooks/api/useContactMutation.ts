"use client";

import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import type { TContact } from "@/app/utils/types";

async function createContact(
  newContact: Omit<TContact, "uid">
): Promise<TContact> {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact),
  });
  if (!res.ok) throw new Error("Failed to send contact");
  return res.json();
}

export function useContactMutation() {
  return useMutation({
    mutationFn: createContact,
    onError: (error) => {
      console.error(error);
      enqueueSnackbar("Failed to send contact", {
        variant: "error",
      });
    },
  });
}
