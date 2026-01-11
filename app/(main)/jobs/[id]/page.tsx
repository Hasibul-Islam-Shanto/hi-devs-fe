import { Job } from '@/types/job';
import { get } from '@/utils/methods';
import JobHeader from './_components/job-header';
import JobDescription from './_components/job-description';
import JobSidebar from './_components/job-sidebar';

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let job: Job | null = null;
  let error = null;

  try {
    const { id } = await params;
    const response = await get<{ job: Job }>(`/api/jobs/${id}`, {
      retry: 2,
      timeout: 5000,
    });
    job = response.job;
  } catch (err) {
    error = err;
  }

  if (error || !job) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="text-foreground mb-4 text-2xl font-bold">
          Job Not Found
        </h1>
        <p className="text-muted-foreground">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <JobHeader job={job} />
          <JobDescription job={job} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <JobSidebar job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
