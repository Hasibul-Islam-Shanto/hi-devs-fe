/* eslint-disable @next/next/no-img-element */
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Heart, MessageSquare } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCard = ({ post }: { post: any }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated animate-slide-up group overflow-hidden rounded-2xl border transition-all">
      {post.coverImage && (
        <Link href={`/blogs/${post.id}`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <Link
          href={`/blogs/${post.id}`}
          className="text-foreground hover:text-primary line-clamp-2 block text-xl font-semibold transition-colors"
        >
          {post.title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
          {post.excerpt}
        </p>

        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground text-sm font-medium">
                {post.author.username}
              </p>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <span>{post.publishedAt}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min read
                </div>
              </div>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <button
              className={`hover:text-primary text-primary} flex items-center gap-1 transition-colors`}
            >
              <Heart className={`h-4 w-4 fill-current`} />
              {0}
            </button>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {post.commentsCount}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
