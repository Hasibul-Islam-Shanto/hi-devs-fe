import { SectionError } from '@/components/Errors';
import JobCard from '@/components/layout/job-card';
import { Job, JobResponse } from '@/types/job';
import { get } from '@/utils/methods';
import Link from 'next/link';

const RecentJobs = async () => {
  let jobs: Job[] = [];
  let error = null;

  try {
    const response = await get<JobResponse>('/api/jobs', {
      retry: 2,
      timeout: 5000,
    });
    jobs = response.jobs;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <SectionError
        title="Latest Jobs"
        message="Unable to load jobs right now. Please check back later."
      />
    );
  }
  if (!jobs || jobs.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold">Latest Jobs</h2>
          <Link href="/jobs" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">
          No jobs available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Latest Jobs</h2>
        <Link href="/jobs" className="text-primary text-sm hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default RecentJobs;
