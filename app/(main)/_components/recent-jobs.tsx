import JobCard from "@/components/layout/job-card";
import { mockJobs } from "@/utils/mockdata";
import Link from "next/link";
import React from "react";

const RecentJobs = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Latest Jobs</h2>
        <Link href="/jobs" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {mockJobs.slice(0, 3).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default RecentJobs;
