import { Search } from 'lucide-react';
import Link from 'next/link';
import MobileNavigationButton from '../buttons/mobile-navigation-button';
import NavbarUserButton from '../buttons/navbar-user-button';

const Navbar = () => {
  return (
    <header className="border-border bg-surface/95 supports-backdrop-filter:bg-surface/80 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <MobileNavigationButton />

          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-sm font-bold">
                &lt;/&gt;
              </span>
            </div>
            <span className="gradient-text hidden text-xl font-bold sm:inline">
              hi-devs
            </span>
          </Link>
        </div>

        <div className="mx-8 hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search questions, blogs, jobs..."
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-10 w-full rounded-lg border pr-4 pl-10 text-sm transition-colors focus:ring-1 focus:outline-none"
            />
          </div>
        </div>
        <NavbarUserButton />
      </nav>
    </header>
  );
};

export default Navbar;
