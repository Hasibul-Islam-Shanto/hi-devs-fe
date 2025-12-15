import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobCard = ({ job }: { job: any }) => {
  return (
    <article className="border-border bg-surface hover:border-primary/50 animate-slide-up rounded-xl border p-4 transition-colors">
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={job.companyLogo}
          alt={job.company}
          className="bg-muted h-12 w-12 rounded-lg"
        />
        <div className="min-w-0 flex-1">
          <Link
            href={`/jobs/${job.id}`}
            className="text-foreground hover:text-primary font-semibold transition-colors"
          >
            {job.title}
          </Link>
          <p className="text-muted-foreground text-sm">{job.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{job.locationType}</Badge>
            <Badge variant="outline">{job.jobType}</Badge>
            {job.salaryMin && job.salaryMax && (
              <span className="text-muted-foreground text-sm">
                ${job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm">
          View
        </Button>
      </div>
    </article>
  );
};

export default JobCard;
