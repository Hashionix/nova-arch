import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "../lib/queryClient";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HelmetProvider>
  );
}
