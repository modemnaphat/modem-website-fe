"use client";

// Lib
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from 'notistack';

// Include in Project
import { api } from "@/app/configs/axios";
import type { TContact } from "@/app/utils/types";

async function createContact(newContact: Omit<TContact, "uid">): Promise<TContact> {
  const res = await api.post<TContact>("/contacts", newContact);
  return res.data;
}

export function useContactMutation() {
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      enqueueSnackbar('Send contact successfully!', { 
        variant: 'success', 
        autoHideDuration: 3000,

      });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to send contact', { 
        variant: 'error' 
      });
    },
  });
}