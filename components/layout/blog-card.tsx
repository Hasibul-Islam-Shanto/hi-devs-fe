import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCard = ({ post }: { post: any }) => {
  return (
    <article className="rounded-2xl border border-border bg-surface overflow-hidden shadow-card hover:shadow-elevated transition-shadow animate-slide-up">
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/blogs/${post.id}`}
          className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
        >
          {post.title}
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {post.author.username}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {post.readTime} min read
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
