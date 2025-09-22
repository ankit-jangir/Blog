import React, { useEffect, useMemo, useState } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { DUMMY_POSTS } from "@/component/Blog";
import { showSuccessToast } from "@/components/ui/global-toast";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const blogContext = useMemo(() => {
    const path = location.pathname || "";
    if (!path.startsWith("/admin/blogs/")) return null;
    const slug = path.split("/admin/blogs/")[1] || "";
    const stateItem = location.state && location.state.item ? location.state.item : null;
    if (stateItem && (stateItem.slug === slug || !slug)) return stateItem;
    try {
      const stored = JSON.parse(localStorage.getItem("admin_new_blogs") || "[]");
      const found = stored.find((b) => (b.slug === slug));
      if (found) return found;
    } catch {}
    const fallback = (DUMMY_POSTS || []).find((b) => b.slug === slug);
    return fallback || null;
  }, [location.pathname, location.state]);

  const getActiveTabName = () => {
    const path = location.pathname;
    if (path.startsWith("/admin/blogs/") && blogContext) return blogContext.title || "Blog";
    if (path.startsWith("/admin/dashboard")) return "Dashboard";
    if (path.startsWith("/admin/posts")) return "Posts";
    if (path.startsWith("/admin/tags")) return "Tags";
    if (path.startsWith("/admin/categories")) return "Categories";
    if (path.startsWith("/admin/Blogs")) return "Blogs";
    if (path.startsWith("/admin/settings")) return "Settings";
    return "";
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adminTheme");
      const isDark = saved === "dark";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    try {
      localStorage.setItem("adminTheme", next ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("dark", next);
  };

  const handleLogout = () => {
    try { localStorage.removeItem("token"); } catch {}
    showSuccessToast("Logged out successfully", { actionLabel: "Cancel" });
    navigate("/admin/signin");
  };

  return (
    <>
      <header className="flex sticky top-0 shrink-0 gap-2 border-b z-[50] h-16 bg-white dark:bg-gray-900 shadow-md items-center px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex w-full items-center justify-between">
          <div className="ps-9">
            <h1 className="text-2xl font-semibold text-blue-700 dark:text-white">
              {getActiveTabName()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
              <button
              onClick={toggleTheme}
                className="focus:outline-none cursor-pointer"
              aria-label="Toggle theme"
              >
                {darkMode ? (
                <Sun size={22} className="text-yellow-400" />
                ) : (
                <Moon size={22} className="text-gray-700 dark:text-white" />
                )}
              </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2" align="end">
                <DropdownMenuItem
                  onClick={() => navigate("/admin/settings")}
                  className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white"
                >
                  <User size={16} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
