/* eslint-disable @next/next/no-img-element */
import { Badge } from '@/components/ui/badge';
import { mockBlogPosts } from '@/utils/mockdata';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageSquare,
  Send,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const BlogPage = () => {
  const blog = mockBlogPosts[0];

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-5">
      <Link
        href="/blogs"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blogs
      </Link>

      <article className="space-y-6">
        {blog.coverImage && (
          <div className="bg-muted aspect-video overflow-hidden rounded-2xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-foreground text-3xl font-bold">{blog.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground font-medium">
                  {blog.author.username}
                </p>
                <p className="text-muted-foreground text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()} ·{' '}
                  {blog.readTime} min read
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-foreground/90 text-lg leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>

        <div className="border-border flex items-center gap-4 border-y py-4">
          <Button variant="default">
            <Heart className="mr-2 h-4 w-4" />
            {0}
          </Button>
          <Button variant="ghost">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="ghost">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="space-y-6">
          <h2 className="text-foreground flex items-center gap-2 text-xl font-semibold">
            <MessageSquare className="h-5 w-5" />
            Comments 0
          </h2>

          <Card className="bg-surface border-border p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Write a comment..."
                  className="bg-muted border-border min-h-20"
                />
                <div className="flex justify-end">
                  <Button variant="gradient">
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default BlogPage;
