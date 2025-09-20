import React from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../../../../public/logo1.jpg";
import {
  Grip,
  Home,
  User,
  Users,
  Wallet,
  ChartColumnIncreasing,
  CircleHelp,
  Settings,
  Clipboard,
  ListFilterPlus,
  FileBadge,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  SidebarRail,
} from "../../../components/ui/sidebar";

import { Radio } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Share2 } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { Layers } from "lucide-react";
import { ShieldQuestion } from "lucide-react";
import { Youtube } from "lucide-react";
import { NavMain } from "@/components/ui/Nav-main";

const AppSidebar = ({ ...props }) => {
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebar();

  const data = [
    { title: "Dashboard", url: "/admin/dashboard", icon: Home },
    { title: "Blogs", url: "/admin/Blogs", icon: Users },
    { title: "Tags", url: "/admin/tags", icon: BookOpenCheck },
    { title: "Categories", url: "/admin/categories", icon: BookOpenText },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="  bg-white dark:bg-gray-900">
        {/* Sidebar Logo & Close Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 "
              src={Blog}
              alt="Blog Logo"
            />
            {!isOpen && <h5 className="text-xl font-semibold">Blog</h5>}
          </div>
          <button
            onClick={() => toggleSidebar(false)}
            className="block sm:hidden p-2 z-50 h-10 w-10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>© 2025 Blog</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
