// ============================================================
// main.jsx — THE STARTING POINT OF THE ENTIRE APP
// This is the first file React reads when the app loads.
// It wraps the whole app with "providers" so every page
// and component can access shared tools and data.
// ============================================================

// StrictMode is a React helper that warns you about potential bugs during development
import { StrictMode } from "react";

// createRoot is how React attaches itself to the HTML page (the <div id="root"> in index.html)
import { createRoot } from "react-dom/client";

// QueryClient and QueryClientProvider come from TanStack Query.
// QueryClient is the engine that manages all API data fetching and caching.
// QueryClientProvider makes that engine available to every component in the app.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// AppProvider is our custom global state provider (favorites + filters)
import { AppProvider } from "./context/AppContext";

// App is the main component that contains all our pages and routes
import App from "./App";

// Global CSS styles that apply to the whole app
import "./index.css";

// -------------------------------------------------------
// Create the TanStack Query client with default settings
// -------------------------------------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: how long cached data is considered "fresh" before refetching
      // 1000ms * 60s * 5 = 5 minutes — so the API won't be called again for 5 minutes
      staleTime: 1000 * 60 * 5,

      // retry: if an API call fails, try again only 1 more time (not infinite retries)
      retry: 1,
    },
  },
});

// -------------------------------------------------------
// Render the app into the HTML page
// -------------------------------------------------------
createRoot(document.getElementById("root")).render(
  // StrictMode wraps everything — helps catch bugs in development only
  <StrictMode>

    {/* QueryClientProvider gives every component access to TanStack Query */}
    <QueryClientProvider client={queryClient}>

      {/* AppProvider gives every component access to favorites and filters */}
      <AppProvider>

        {/* The actual app with all pages and routes */}
        <App />

      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
