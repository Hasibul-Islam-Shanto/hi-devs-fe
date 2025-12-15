import BlogCard from '@/components/layout/blog-card';
import { mockBlogPosts } from '@/utils/mockdata';
import Link from 'next/link';
import React from 'react';

const RecentBlogs = () => {
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
        {mockBlogPosts.slice(0, 2).map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
