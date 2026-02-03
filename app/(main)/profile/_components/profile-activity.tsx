import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, FileText, Briefcase, Loader2 } from 'lucide-react';
import ProfileQuestions from './profile-questions';
import { Suspense } from 'react';
import ProfileBlogs from './profile-blogs';
import ProfileJobs from './profile-jobs';

const ProfileActivity = () => {
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
          Jobs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="questions">
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading questions...
            </div>
          }
        >
          <ProfileQuestions />
        </Suspense>
      </TabsContent>

      <TabsContent value="blogs">
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading blogs...
            </div>
          }
        >
          <ProfileBlogs />
        </Suspense>
      </TabsContent>

      <TabsContent value="jobs">
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading jobs...
            </div>
          }
        >
          <ProfileJobs />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileActivity;
