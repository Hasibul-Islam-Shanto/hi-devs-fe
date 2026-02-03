import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  currentUser,
  mockBlogPosts,
  mockJobs,
  mockQuestions,
} from '@/utils/mockdata';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';

const ProfileActivity = () => {
  const userQuestions = mockQuestions.filter(
    q => q.author.id === currentUser.id,
  );
  const userBlogs = mockBlogPosts.filter(p => p.author.id === currentUser.id);
  const userJobs = mockJobs.filter(j => j.postedBy.id === currentUser.id);
  return (
    <Tabs defaultValue="questions">
      <TabsList className="bg-muted mb-6 w-full justify-start">
        <TabsTrigger value="questions" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Questions
        </TabsTrigger>
        <TabsTrigger value="blogs" className="gap-2">
          <FileText className="h-4 w-4" />
          Blogs
        </TabsTrigger>
        <TabsTrigger value="jobs" className="gap-2">
          <Briefcase className="h-4 w-4" />
          Jobs Posted
        </TabsTrigger>
      </TabsList>

      <TabsContent value="questions" className="space-y-4">
        {userQuestions.length > 0 &&
          userQuestions.map(question => (
            <Link
              key={question.id}
              href={`/questions/${question.id}`}
              className="border-border bg-surface hover:border-primary/50 block rounded-xl border p-4 transition-colors"
            >
              <h3 className="text-foreground hover:text-primary font-semibold">
                {question.title}
              </h3>
              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                <span>{question.upvotes} votes</span>
                <span>{question.answersCount} answers</span>
                <span>
                  {formatDistanceToNow(new Date(question.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          ))}
      </TabsContent>

      <TabsContent value="blogs" className="space-y-4">
        {userBlogs.length > 0 &&
          userBlogs.map(post => (
            <Link
              key={post.id}
              href={`/blogs/${post.id}`}
              className="border-border bg-surface hover:border-primary/50 block rounded-xl border p-4 transition-colors"
            >
              <h3 className="text-foreground hover:text-primary font-semibold">
                {post.title}
              </h3>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {post.excerpt}
              </p>
              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                <span>{post.likes} likes</span>
                <span>{post.readTime} min read</span>
                <span>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          ))}
      </TabsContent>

      <TabsContent value="jobs" className="space-y-4">
        {userJobs.length > 0 &&
          userJobs.map(job => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="border-border bg-surface hover:border-primary/50 block rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-foreground hover:text-primary font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{job.company}</p>
                </div>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                <span>{job.applicationsCount} applicants</span>
                <span>{job.isActive ? 'Active' : 'Closed'}</span>
                <span>
                  {formatDistanceToNow(new Date(job.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </Link>
          ))}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileActivity;
