import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { ModeToggle } from '@/Components/ui/mode-toggle';
import {
    LayoutDashboard,
    Activity,
    Calendar,
    BarChart3,
    Settings,
    User,
    Menu,
    X,
    LogOut,
    ChevronDown,
    Zap,
    AlertTriangle
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, current: route().current('dashboard') },
        { name: 'Sensors', href: route('sensors'), icon: Activity, current: route().current('sensors') },
        { name: 'Actuators', href: route('actuators'), icon: Zap, current: route().current('actuators') },
        { name: 'Schedule', href: route('watering-schedule'), icon: Calendar, current: route().current('watering-schedule') },
        { name: 'Statistics', href: route('statistics'), icon: BarChart3, current: route().current('statistics') },
    ];

    const Sidebar = () => (
        <div className="flex h-full w-64 flex-col bg-background border-r border-border">
            {/* Logo */}
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
                <Link href="/" className="flex items-center">
                    <ApplicationLogo className="h-8 w-auto fill-current text-foreground" />
                    <span className="ml-2 text-lg font-semibold text-foreground">AgriSense</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col px-4 py-6">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigationItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors
                                            ${item.current
                                                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                                                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                            }
                                        `}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 shrink-0 ${
                                                item.current ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                                            }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile top navigation */}
            <div className="lg:hidden">
                <nav className="border-b border-border bg-background">
                    <div className="mx-auto max-w-full px-4 sm:px-6">
                        <div className="flex h-14 items-center justify-between">
                            <Link href="/">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-foreground" />
                            </Link>
                            <div className="flex items-center gap-x-2">
                                {/* Mobile menu button */}
                                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Menu className="h-6 w-6" />
                                            <span className="sr-only">Open sidebar</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="p-0 w-64">
                                        <Sidebar />
                                    </SheetContent>
                                </Sheet>
                                {/* User dropdown for mobile */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                        <div className="px-2 py-1">
                                            <ModeToggle />
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="pt-0 lg:pl-64">
                {/* Topbar for desktop */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 hidden lg:flex">
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex-1">
                            {header}
                        </div>
                        <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    3 Alerts
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    {new Date().toLocaleTimeString()}
                                </span>
                                <Separator orientation="vertical" className="h-6" />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-x-2 px-2 py-1 text-sm font-medium text-foreground hover:bg-muted"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="hidden xl:block text-left">
                                                <p className="text-xs font-medium text-foreground leading-tight">{user.name}</p>
                                                <p className="text-[10px] text-muted-foreground leading-tight">{user.email}</p>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="w-56">
                                        <div className="px-4 py-2 border-b border-border xl:hidden">
                                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-x-2">
                                            <User className="h-4 w-4" />
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-x-2 text-red-600 hover:text-red-700">
                                            <LogOut className="h-4 w-4" />
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <ModeToggle />
                            </div>
                        </div>
                </div>
                <main className="py-4 sm:py-6">
                    <div className="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
