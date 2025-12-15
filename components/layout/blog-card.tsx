import React from 'react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCard = ({ post }: { post: any }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated animate-slide-up overflow-hidden rounded-2xl border transition-shadow">
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/blogs/${post.id}`}
          className="text-foreground hover:text-primary line-clamp-2 text-lg font-semibold transition-colors"
        >
          {post.title}
        </Link>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-sm">
              {post.author.username}
            </span>
          </div>
          <span className="text-muted-foreground text-sm">
            {post.readTime} min read
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
