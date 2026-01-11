'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Job } from '@/types/job';
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const JobHeader = ({ job }: { job: Job }) => {
  const timeAgo = formatDistanceToNow(new Date(job.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="bg-surface border-border p-6">
      <div className="space-y-4">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-foreground text-3xl font-bold">{job.title}</h1>
            <div className="text-muted-foreground mt-2 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span className="text-lg font-medium">{job.company}</span>
            </div>
          </div>
          <Badge
            variant={job.status === 'Open' ? 'default' : 'secondary'}
            className={
              job.status === 'Open'
                ? 'bg-green-500/20 text-green-500'
                : 'bg-gray-500/20 text-gray-500'
            }
          >
            {job.status}
          </Badge>
        </div>

        {/* Job Meta Info */}
        <div className="border-border flex flex-wrap gap-4 border-y py-4 text-sm">
          <div className="text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <span className="text-border">•</span>
          <div className="text-muted-foreground flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            <span>{job.employmentType}</span>
          </div>
          {job.salaryRange && (
            <>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <DollarSign className="h-4 w-4" />
                <span className="text-foreground">{job.salaryRange}</span>
              </div>
            </>
          )}
          {job.expiresAt && (
            <>
              <span className="text-border">•</span>
              <div className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>
                  Expires: {new Date(job.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Required Skills */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div>
            <h3 className="text-foreground mb-2 text-sm font-semibold">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map(skill => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Posted Time */}
        <div className="text-muted-foreground pt-2 text-sm">
          Posted {timeAgo}
        </div>
      </div>
    </Card>
  );
};

export default JobHeader;
