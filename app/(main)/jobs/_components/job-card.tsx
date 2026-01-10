import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { MapPin, Briefcase, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const JobCard = ({ job }: { job: Job }) => {
  const timeAgo = formatDistanceToNow(new Date(job.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated hover:border-primary/50 animate-slide-up rounded-2xl border p-6 transition-all">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Link
              href={`/jobs/${job._id}`}
              className="text-foreground hover:text-primary line-clamp-2 text-xl font-semibold transition-colors"
            >
              {job.title}
            </Link>
            <div className="text-muted-foreground mt-1 flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>

          {job.status === 'Open' && (
            <Badge
              variant="default"
              className="shrink-0 bg-green-500/20 text-green-500 hover:bg-green-500/30"
            >
              Open
            </Badge>
          )}
          {job.status === 'Closed' && (
            <Badge variant="secondary" className="shrink-0">
              Closed
            </Badge>
          )}
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            {job.employmentType}
          </div>
          {job.salaryRange && (
            <>
              <span className="text-border">•</span>
              <div className="text-foreground font-medium">
                {job.salaryRange}
              </div>
            </>
          )}
        </div>

        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.slice(0, 5).map((skill: string) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {job.requiredSkills.length > 5 && (
              <Badge variant="outline">
                +{job.requiredSkills.length - 5} more
              </Badge>
            )}
          </div>
        )}

        <div className="border-border mt-2 flex items-center justify-between border-t pt-4">
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4" />
            {timeAgo}
          </div>
          <Button
            variant={job.status === 'Open' ? 'gradient' : 'outline'}
            size="sm"
            asChild
            disabled={job.status === 'Closed'}
          >
            <Link href={`/jobs/${job._id}`}>
              {job.status === 'Open' ? 'View Details' : 'View Job'}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
