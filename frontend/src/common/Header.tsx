import { Button } from "@/components/ui/button";
import { CircleUser, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export type TCurrentView = "dashboard" | "parametres" | "offres" | "selection";
interface HeaderProps {
    currentView: TCurrentView;
}
export default function Header({ currentView }: HeaderProps) {
    const { logout } = useAuth0();

    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
                <div className="whitespace-nowrap w-90">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center border px-3 py-2 rounded-lg gap-4 cursor-pointer w-16 md:w-80">
                                <CircleUser className="h-6 w-6" />
                                <div className="hidden md:block">Florent Fauchille</div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-16 md:w-80">
                            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    logout({
                                        logoutParams: {
                                            returnTo: window.location.origin,
                                        },
                                    })
                                }
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <nav className="hidden w-full flex-col gap-6 text-lg font-medium  md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <div className="flex-col gap-6 w-full lg:justify-start pl-2 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 justify-end">
                        <Link
                            to="dashboard"
                            className={`${
                                currentView === "dashboard" ? "text-primary" : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="offres"
                            className={`${
                                currentView === "offres" ? "text-primary" : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Offres
                        </Link>
                        <Link
                            to="parametres"
                            className={`${
                                currentView === "parametres" ? "text-primary" : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Paramètres
                        </Link>
                        <Link
                            to="selection"
                            className={`${
                                currentView === "selection" ? "text-primary" : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Sélection
                        </Link>
                    </div>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                                <img className="w-64" src="/assets/logo.png" alt="" />
                            </Link>
                            <Link
                                to="dashboard"
                                className={`${currentView === "dashboard" ? "text-primary" : "text-secondary"} `}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="offres"
                                className={`${currentView === "offres" ? "text-primary" : "text-secondary"} `}
                            >
                                Offres
                            </Link>
                            <Link
                                to="parametres"
                                className={`${currentView === "parametres" ? "text-primary" : "text-secondary"} `}
                            >
                                Paramètres
                            </Link>
                            <Link
                                to="selection"
                                className={`${currentView === "selection" ? "text-primary" : "text-secondary"} `}
                            >
                                Ma sélection
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <Link to="/dashboard" className="hidden lg:block absolute top-5 right-5">
                    <img className="w-64" src="/assets/logo.png" alt="" />
                </Link>
            </header>
        </div>
    );
}
