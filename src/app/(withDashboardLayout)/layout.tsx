

"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarRange,
  LayoutDashboard,
  Loader,
  LogOut,
  MessageSquareDiff,
  X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/Services/AuthServices";
import { useUser } from "@/components/context/UserContext";

const sidebarItemsUser = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarRange, label: "Add Project", href: "/dashboard/add-project" },
  {
    icon: MessageSquareDiff,
    label: "Manage Projects",
    href: "/dashboard/manage-projects",
  },
  { icon: CalendarRange, label: "Add Blog", href: "/dashboard/add-blog" },
  {
    icon: MessageSquareDiff,
    label: "Manage Blogs",
    href: "/dashboard/manage-blogs",
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { setIsLoading } = useUser();
  const router = useRouter();

  // console.log({ user });
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  //   console.log(process.env.NEXT_PUBLIC_USER_EMAIL1);
  // Update active path when route changes
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  // Handle responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout =async () => {
    // Implement your logout logic here
    console.log("Logging out...");
    await logout();
    setIsLoading(true);

    router.push("/");

    // Example: router.push('/login') or auth.signOut()
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 overflow-y-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform h-screen transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full "
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <span className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {"Dashboard"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
            <div className="overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {/* check if user is admin then map sidebarItemsAdmin, and if the user is normal user then map over sidebarItemsUser */}
                {sidebarItemsUser?.map((item, index) => {
                  const isActive = activePath === item.href;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => isMobile && setSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Logout button at bottom of sidebar */}
            <div className="px-2 py-4 border-t mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="w-full flex justify-between items-center py-4">
              <h1 className="text-lg font-semibold">Dashboard</h1>

              {/* Logout button in header (visible on larger screens) */}
              {/* <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button> */}
            </div>
          </header>
          <Suspense
            fallback={
              <div className="w-full h-[100vh] flex items-center justify-center">
                <Loader className="w-[80px] h-12 animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
