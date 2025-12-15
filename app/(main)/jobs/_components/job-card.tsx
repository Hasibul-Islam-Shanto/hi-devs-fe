/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

const JobCard = ({ job }: { job: any }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated hover:border-primary/50 animate-slide-up rounded-2xl border p-6 transition-all">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={job.companyLogo}
          alt={job.company}
          className="bg-muted h-14 w-14 shrink-0 rounded-xl"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                href={`/jobs/${job.id}`}
                className="text-foreground hover:text-primary text-xl font-semibold transition-colors"
              >
                {job.title}
              </Link>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
            {job.isActive && (
              <span className="shrink-0 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-500">
                Actively hiring
              </span>
            )}
          </div>

          <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
            </div>
            {job.salaryMin && job.salaryMax && (
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />$
                {job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {job.openings} opening{job.openings > 1 ? 's' : ''}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline">{job.locationType}</Badge>
            {job.tags.slice(0, 4).map((tag: string) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {job.createdAt} ago
              </div>
              <span>{job.applicationsCount} applicants</span>
            </div>
            <Button variant="gradient" size="sm" asChild>
              <Link href={`/jobs/${job.id}`}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
