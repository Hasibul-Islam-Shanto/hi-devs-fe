import RecentBlogs from "./_components/recent-blogs";
import RecentJobs from "./_components/recent-jobs";
import RecentQuestions from "./_components/recent-questions";

const HomePage = () => {
  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Home</h1>
        <p className="text-muted-foreground">
          Discover the latest from the hi-devs community
        </p>
      </header>

      <div className="space-y-8">
        <RecentQuestions />
        <RecentBlogs />
        <RecentJobs />
      </div>
    </div>
  );
};

export default HomePage;
