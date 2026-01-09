import { Blog, BlogsResponse } from '@/types/blog';
import BlogCard from './blog-card';
import { mockBlogPosts } from '@/utils/mockdata';
import { get } from '@/utils/methods';
import { SectionError } from '@/components/Errors';

const BlogsContainer = async () => {
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
  }

  if (error) {
    return (
      <SectionError
        title=" Blogs"
        message="Unable to load blogs right now. Please check back later."
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold"> Blogs</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          No blogs available at the moment.
        </p>
      </section>
    );
  }

  return (
    <>
      {mockBlogPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>No blogs found</div>
      )}
    </>
  );
};

export default BlogsContainer;
