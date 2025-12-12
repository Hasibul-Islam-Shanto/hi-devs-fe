import { Search } from "lucide-react";
import Link from "next/link";
import MobileNavigationButton from "../buttons/mobile-navigation-button";
import NavbarUserButton from "../buttons/navbar-user-button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/80">
      <nav className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <MobileNavigationButton />

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">
                &lt;/&gt;
              </span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              hi-devs
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 max-w-xl mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search questions, blogs, jobs..."
              className="w-full h-10 rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>
        <NavbarUserButton />
      </nav>
    </header>
  );
};

export default Navbar;
