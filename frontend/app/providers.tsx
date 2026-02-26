'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useMemo } from "react";

export const TanstackProvider = ({children}: any) => {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}