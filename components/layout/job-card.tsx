import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Job } from '@/types/job';

const JobCard = ({ job }: { job: Job }) => {
  return (
    <article className="border-border bg-surface hover:border-primary/50 animate-slide-up rounded-xl border p-4 transition-colors">
      <div className="flex items-start gap-4">
        <div>
          <p>{job?.company?.slice(0, 2)}</p>
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/jobs/${job._id}`}
            className="text-foreground hover:text-primary font-semibold transition-colors"
          >
            {job.title}
          </Link>
          <p className="text-muted-foreground text-sm">{job.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{job.location}</Badge>
            <Badge variant="outline">{job.employmentType}</Badge>
            <span className="text-muted-foreground text-sm">
              {job.salaryRange}
            </span>
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
