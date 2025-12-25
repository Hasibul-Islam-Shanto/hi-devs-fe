import JobCard from '@/components/layout/job-card';
import { JobResponse } from '@/types/job';
import { get } from '@/utils/fetcher';
import Link from 'next/link';

const RecentJobs = async () => {
  const response = await get<JobResponse>('/api/jobs');
  const jobs = response.jobs;

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
