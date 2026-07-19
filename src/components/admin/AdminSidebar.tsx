import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Settings,
  MessageSquare,
  Shield,
  ChevronDown,
} from "lucide-react";
import { RESOURCES, RESOURCE_GROUPS, type ResourceDef } from "@/lib/admin/resources";

const GROUP_ICONS: Record<ResourceDef["group"], typeof FileText> = {
  Content: FileText,
  Commerce: ShoppingBag,
  "Site Config": Settings,
  Communications: MessageSquare,
  System: Shield,
};

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const isActive = (p: string) => pathname === p;

  // Track collapsed state per group; default all open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(RESOURCE_GROUPS.map((g) => [g, true]))
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-2 font-semibold">Admin</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin")}>
                  <NavLink to="/admin" end className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {RESOURCE_GROUPS.map((group) => {
          const items = RESOURCES.filter((r) => r.group === group);
          if (!items.length) return null;
          const Icon = GROUP_ICONS[group];
          const isOpen = openGroups[group] ?? true;
          const hasActive = items.some((i) => isActive(`/admin/${i.key}`));

          return (
            <Collapsible
              key={group}
              open={isOpen || hasActive}
              onOpenChange={(v) => setOpenGroups((s) => ({ ...s, [group]: v }))}
            >
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex items-center justify-between w-full cursor-pointer hover:bg-muted/40 rounded px-2 py-1">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{group}</span>
                      <span className="text-xs opacity-60">({items.length})</span>
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        isOpen || hasActive ? "" : "-rotate-90"
                      }`}
                    />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => {
                        const to = `/admin/${item.key}`;
                        return (
                          <SidebarMenuItem key={item.key}>
                            <SidebarMenuButton asChild isActive={isActive(to)}>
                              <NavLink to={to} className="hover:bg-muted/50 pl-6">
                                <span>{item.label}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
