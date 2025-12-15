import RecentBlogs from './_components/recent-blogs';
import RecentJobs from './_components/recent-jobs';
import RecentQuestions from './_components/recent-questions';

const HomePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <header className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">Home</h1>
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
