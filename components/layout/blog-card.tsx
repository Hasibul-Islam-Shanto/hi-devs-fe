import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Blog } from '@/types/blog';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated animate-slide-up overflow-hidden rounded-2xl border transition-shadow">
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {blog.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/blogs/${blog._id}`}
          className="text-foreground hover:text-primary line-clamp-2 text-lg font-semibold transition-colors"
        >
          {blog.title}
        </Link>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {blog.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-sm">
              {blog.postedBy.name}
            </span>
          </div>
          {/* <span className="text-muted-foreground text-sm">
            {blog.readTime} min read
          </span> */}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
