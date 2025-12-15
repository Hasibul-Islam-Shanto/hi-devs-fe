import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTags } from '@/utils/mockdata';
import { Search } from 'lucide-react';
import Link from 'next/link';

const BlogsHeader = () => {
  return (
    <>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-1">
            Stories and insights from the developer community
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/blogs/write">Write a Post</Link>
        </Button>
      </header>

      <div className="relative mb-6">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input placeholder="Search posts..." className="pl-10" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {mockTags.slice(0, 8).map(tag => (
          <button
            key={tag.name}
            className={`bg-muted text-muted-foreground hover:bg-muted/80 } rounded-lg px-3 py-1.5 text-sm font-medium transition-colors`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default BlogsHeader;
