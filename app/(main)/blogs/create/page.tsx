import BlogForm from './_components/blog-form';

const BlogCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <header className="mb-6">
        <h1 className="text-foreground text-3xl font-bold">
          Write a Blog Post
        </h1>
        <p className="text-muted-foreground mt-1">
          Share your knowledge with the developer community
        </p>
      </header>
      <BlogForm />
    </div>
  );
};

export default BlogCreatePage;
