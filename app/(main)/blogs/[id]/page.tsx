import { Badge } from '@/components/ui/badge';
import { Bookmark, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Blog, BlogResponse } from '@/types/blog';
import { get } from '@/utils/methods';
import Image from 'next/image';
import MarkDownEditor from '../../questions/[id]/_components/markdown-editor';
import { formatDistanceToNow } from 'date-fns';
import LikeButton from '@/components/buttons/like-button';
import { likeBlog } from '@/actions/blog.actions';
import CommentsContainerLayout from '@/components/layout/comments-layout';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let blog: Blog | null = null;
  let error = null;
  try {
    const response = await get<BlogResponse>(`/api/blogs/${id}`, {
      retry: 2,
      timeout: 5000,
    });
    blog = response.blog;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl py-5">
        <p className="text-center text-red-500">
          Unable to load blog right now. Please check back later.
        </p>
      </div>
    );
  }

  if (!blog || Object.keys(blog).length === 0) {
    return (
      <div className="mx-auto max-w-3xl py-5">
        <p className="text-muted-foreground text-center">
          Blog not found or unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-5">
      <article className="space-y-6">
        {blog?.cover && (
          <div className="bg-muted aspect-video overflow-hidden rounded-2xl">
            <Image
              src={blog?.cover}
              alt={blog?.title || 'Blog Cover'}
              height={500}
              width={800}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {blog?.tags?.map(tag => (
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
                  src={blog?.postedBy?.profileImage}
                  alt={blog?.postedBy?.username || 'User'}
                />
                <AvatarFallback className="font-bold">
                  {blog?.postedBy?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground font-medium">
                  {blog?.postedBy?.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}{' '}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <MarkDownEditor value={blog?.description || ''} />
        </div>

        <div className="border-border flex items-center gap-4 border-y py-4">
          <LikeButton
            id={blog?._id}
            likes={blog?.likes}
            likesCount={blog?.likes?.length || 0}
            likeFunction={likeBlog}
          />
          <Button variant="ghost">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="ghost">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </article>

      <CommentsContainerLayout id={blog?._id} commentableType="BLOG" />
    </div>
  );
};

export default BlogPage;
