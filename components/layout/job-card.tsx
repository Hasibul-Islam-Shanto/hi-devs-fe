import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobCard = ({ job }: { job: any }) => {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 hover:border-primary/50 transition-colors animate-slide-up">
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={job.companyLogo}
          alt={job.company}
          className="h-12 w-12 rounded-lg bg-muted"
        />
        <div className="flex-1 min-w-0">
          <Link
            href={`/jobs/${job.id}`}
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            {job.title}
          </Link>
          <p className="text-sm text-muted-foreground">{job.company}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="outline">{job.locationType}</Badge>
            <Badge variant="outline">{job.jobType}</Badge>
            {job.salaryMin && job.salaryMax && (
              <span className="text-sm text-muted-foreground">
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
