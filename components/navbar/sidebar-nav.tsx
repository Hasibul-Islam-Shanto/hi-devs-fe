"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Briefcase,
  User,
  Settings,
  FileText,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  MessageSquare,
  FileText,
  Briefcase,
  User,
  Settings,
};

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarNavProps {
  items: NavItem[];
}
const SidebarNav = ({ items }: SidebarNavProps) => {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = iconMap[item.icon];

        return (
          <Link
            key={item.href}
            href={item.href}
            // onClick={handleClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
