import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Authenticated } from "./auth/Authenticated.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Auth0Provider
            domain="or-aus.eu.auth0.com"
            clientId="yq89EpaAOUiwyXNJKq7VgTeIg7iGJBw0"
            authorizationParams={{
                audience: "api.or.aus.floless.fr",
                redirect_uri: window.location.origin,
            }}
        >
            <Authenticated>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </Authenticated>
        </Auth0Provider>
    </React.StrictMode>
);
