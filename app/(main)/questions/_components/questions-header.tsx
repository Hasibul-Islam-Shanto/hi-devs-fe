import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTags } from '@/utils/mockdata';
import { Search } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const QuestionsHeader = () => {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Questions</h1>
          <p className="text-muted-foreground mt-1">
            Browse the latest questions from the community
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/questions/create">Ask Question</Link>
        </Button>
      </header>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Search questions..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="bg-surface w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-border">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="votes">Most Voted</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {mockTags.slice(0, 8).map(tag => (
          <button
            key={tag.name}
            className="bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsHeader;
