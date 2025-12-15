import BlogCard from './blog-card';
import { mockBlogPosts } from '@/utils/mockdata';

const BlogsContainer = () => {
  return (
    <>
      {mockBlogPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {mockBlogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div>No blogs found</div>
      )}
    </>
  );
};

export default BlogsContainer;
