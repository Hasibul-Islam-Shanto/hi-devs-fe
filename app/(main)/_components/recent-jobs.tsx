import JobCard from '@/components/layout/job-card';
import { mockJobs } from '@/utils/mockdata';
import Link from 'next/link';
import React from 'react';

const RecentJobs = () => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">Latest Jobs</h2>
        <Link href="/jobs" className="text-primary text-sm hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {mockJobs.slice(0, 3).map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default RecentJobs;
