import { Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import Offers from "./pages/offers/Offers";

import Header, { TCurrentView } from "./common/Header";
import ErrorPage from "./pages/error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard uri={"/v1/users"} />,
            },
            {
                path: "offres",
                element: <Offers />,
            },
            {
                path: "parametres",
                element: <Settings />,
            },
            {
                path: "selection",
                element: <div>Ma sélection</div>,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function Layout() {
    const location = useLocation();
    const currentPath = location.pathname.split("/")[1];
    const currentView = currentPath as TCurrentView; // Default to 'home' if no path segment

    return (
        <>
            <Header currentView={currentView} />
            <Outlet />
        </>
    );
}

export function App() {
    return <RouterProvider router={router} />;
}
