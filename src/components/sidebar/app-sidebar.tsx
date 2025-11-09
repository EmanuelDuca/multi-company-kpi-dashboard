"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ChartNoAxesColumn,
  ChartArea,
  Building2,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Emanuel",
    email: "m@example.com",
    avatar:
      "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
  },
  company: {
    name: "Keyhole Group",
    logo: ChartArea,
    plan: "Dashboard",
  },

  navMain: [
    {
      title: "Finance",
      url: "/finance",
      icon: Wallet,
      items: [
        {
          title: "Overview",
          url: "/finance",
        },
        {
          title: "Keyhole",
          url: "/finance/keyhole",
        },
        {
          title: "Payproff",
          url: "/finance/payproff",
        },
        {
          title: "Intercode",
          url: "/finance/intercode",
        },
      ],
    },
    {
      title: "Marketing",
      url: "/marketing",
      icon: ChartNoAxesColumn,
      isActive: false,
      items: [
        {
          title: "Overview",
          url: "/marketing",
        },
        {
          title: "Keyhole",
          url: "/marketing/keyhole",
        },
        {
          title: "Payproff",
          url: "/marketing/payproff",
        },
        {
          title: "Intercode",
          url: "/marketing/intercode",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: PieChart,
      isActive: false,
      items: [
        {
          title: "View All",
          url: "/reports",
        },
        {
          title: "Monthly Report",
          url: "/reports/monthly-2024",
        },
        {
          title: "Quarterly Report",
          url: "/reports/q4-2024",
        },
      ],
    },
  ],
  companies: [
    {
      name: "Keyhole",
      url: "/finance/keyhole",
      icon: Building2,
    },
    {
      name: "Payproff",
      url: "/finance/payproff",
      icon: Building2,
    },
    {
      name: "Intercode",
      url: "/finance/intercode",
      icon: Building2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <ChartNoAxesColumn className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{data.company.name}</span>
            <span className="truncate text-xs">{data.company.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.companies} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
