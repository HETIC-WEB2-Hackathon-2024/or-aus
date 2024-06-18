import { Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Header, { TCurrentView } from "./common/Header";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "offres",
                element: <div>Offres</div>,
            },
            {
                path: "parametres",
                element: <div>Paramètres</div>,
            },
            {
                path: "selection",
                element: <div>Ma sélection</div>,
            },
        ],
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
