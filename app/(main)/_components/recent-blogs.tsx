import BlogCard from "@/components/layout/blog-card";
import { mockBlogPosts } from "@/utils/mockdata";
import Link from "next/link";
import React from "react";

const RecentBlogs = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Featured Blogs
        </h2>
        <Link href="/blogs" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mockBlogPosts.slice(0, 2).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
