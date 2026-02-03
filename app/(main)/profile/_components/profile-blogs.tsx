import { Blog, BlogsResponse } from '@/types/blog';
import { get } from '@/utils/methods';
import { formatDistanceToNow } from 'date-fns';
import { cookies } from 'next/headers';
import Link from 'next/link';

const ProfileBlogs = async () => {
  let blogs: Blog[] | null = null;
  let error = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const response = await get<BlogsResponse>('/api/blogs/users/blogs', {
      isAuthenticated: true,
      token: accessToken,
    });
    blogs = response.blogs;
  } catch (err) {
    error = err;
  }

  if (error) {
    return <div>Error loading blogs : {String(error)}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found.</div>;
  }
  return (
    <div className="space-y-4">
      {blogs.map(blog => (
        <Link
          key={blog._id}
          href={`/blogs/${blog._id}`}
          className="border-border bg-surface hover:border-primary/50 block rounded-xl border p-4 transition-colors"
        >
          <h3 className="text-foreground hover:text-primary font-semibold">
            {blog.title}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {blog.description}
          </p>
          <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
            <span>{blog.likes.length} likes</span>
            <span>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileBlogs;
