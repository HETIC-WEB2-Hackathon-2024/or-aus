import { Button } from "@/components/ui/button";
import { CircleUser, Menu, Package2 } from "lucide-react";
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

export type TCurrentView = "dashboard" | "parametres" | "offres" | "selection";
interface HeaderProps {
    currentView: TCurrentView;
}
export default function Header({ currentView }: HeaderProps) {
    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
                <div className="flex justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center border px-6 py-2 rounded-lg gap-4 cursor-pointer">
                                <CircleUser className="h-6 w-6" />
                                Florent Fauchille
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <div className="flex-col gap-6 w-full justify-center text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            to="dashboard"
                            className={`${
                                currentView === "dashboard"
                                    ? "text-primary"
                                    : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="offres"
                            className={`${
                                currentView === "offres"
                                    ? "text-primary"
                                    : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Offres
                        </Link>
                        <Link
                            to="parametres"
                            className={`${
                                currentView === "parametres"
                                    ? "text-primary"
                                    : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Paramètres
                        </Link>
                        <Link
                            to="selection"
                            className={`${
                                currentView === "selection"
                                    ? "text-primary"
                                    : "text-secondary"
                            }  hover:text-primary `}
                        >
                            Sélection
                        </Link>
                        {/* <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        Entreprises
                        </Link> */}
                    </div>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                to="dashboard"
                                className="hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="offres"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Offres
                            </Link>
                            <Link
                                to="parametres"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Paramètres
                            </Link>
                            <Link
                                to="selection"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Ma sélection
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <Link to="/dashboard" className="absolute top-5 right-5">
                    <img className="w-64" src="/assets/logo.png" alt="" />
                </Link>
            </header>
        </div>
    );
}
