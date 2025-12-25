import BlogCard from '@/components/layout/blog-card';
import { BlogResponse } from '@/types/blog';
import { get } from '@/utils/fetcher';
import Link from 'next/link';

const RecentBlogs = async () => {
  const response = await get<BlogResponse>('/api/blogs');
  const blogs = response.blogs;

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
