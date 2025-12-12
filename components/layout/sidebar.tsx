import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockTags } from "@/utils/mockdata";
import SidebarContainer from "../navbar/sidebar-container";
import SidebarNav from "../navbar/sidebar-nav";
import { FileText, Hash, PlusCircle, TrendingUp } from "lucide-react";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "@/constants/navItems";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="flex h-full flex-col p-4">
        <div className="space-y-2 mb-6">
          <Button
            variant="gradient"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/questions/ask">
              <PlusCircle className="h-4 w-4" />
              Ask Question
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/blogs/write">
              <FileText className="h-4 w-4" />
              Write Blog
            </Link>
          </Button>
        </div>

        <SidebarNav items={MAIN_NAV_ITEMS} />
        <div className="my-4 border-t border-sidebar-border" />
        <SidebarNav items={USER_NAV_ITEMS} />
        <div className="my-4 border-t border-sidebar-border" />

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Trending Tags
          </div>
          <div className="space-y-1">
            {mockTags.slice(0, 6).map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name.toLowerCase()}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  {tag.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarContainer>
  );
};
export default Sidebar;
