import { SectionError } from '@/components/Errors';
import BlogCard from '@/components/layout/blog-card';
import { Blog, BlogsResponse } from '@/types/blog';
import { logError } from '@/utils/apiError';
import { get } from '@/utils/methods';
import Link from 'next/link';

const RecentBlogs = async () => {
  let blogs: Blog[] = [];
  let error = null;

  try {
    const response = await get<BlogsResponse>('/api/blogs', {
      retry: 2,
      timeout: 5000,
    });
    blogs = response.blogs;
  } catch (err) {
    error = err;
    logError(err, 'RecentBlogs');
  }

  if (error) {
    return (
      <SectionError
        title="Featured Blogs"
        message="Unable to load blogs right now. Please check back later."
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold">
            Featured Blogs
          </h2>
          <Link href="/blogs" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">
          No blogs available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">
          Featured Blogs
        </h2>
        <Link href="/blogs" className="text-primary text-sm hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
