"use client"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar"
import { useLocation, useNavigate } from "react-router-dom"
import { useSidebar } from "./sidebar"

export function NavMain({ items }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { isMobile, open, setOpen } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const currentLower = String(currentPath || '').toLowerCase().replace(/\/+$/, '');
          const baseLower = String(item.url || '').toLowerCase().replace(/\/+$/, '');
          const isActive = currentLower === baseLower || currentLower.startsWith(baseLower + '/');

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                className={`pt-6 pb-6 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                asChild
                tooltip={item.tooltip || item.title}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.url);
                  // Keep sidebar closed if it was closed; don't auto-open on navigation
                  if (isMobile) {
                    setOpen(false);
                  }
                }}
              >
                <a href={item.url} className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className={`size-5 ${isActive ? "" : ""}`} />
                  )}
                  <span className="font-semibold text-[17px]">
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
