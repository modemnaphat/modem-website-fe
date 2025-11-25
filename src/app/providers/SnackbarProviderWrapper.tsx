"use client";

import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

export function SnackbarProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}