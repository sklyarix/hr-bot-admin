import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./helpers/routes.data.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
