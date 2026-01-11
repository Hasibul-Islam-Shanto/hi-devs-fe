'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/types/job';
import { Send, Eye } from 'lucide-react';
import { useState } from 'react';
import ApplyModal from '@/components/apply-modal';

const JobSidebar = ({ job }: { job: Job }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <>
      <Card className="bg-surface border-border gap-3! p-4">
        <Button
          variant="gradient"
          className="w-full"
          onClick={() => setShowApplyModal(true)}
          disabled={job.status === 'Closed'}
        >
          <Send className="mr-2 h-4 w-4" />
          {job.status === 'Open' ? 'Apply Now' : 'Position Closed'}
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          {job.status === 'Open'
            ? 'Submit your application to the employer'
            : 'This position is no longer accepting applications'}
        </p>
      </Card>

      <Card className="bg-surface border-border gap-2! p-4">
        <h4 className="text-foreground font-semibold">Posted by</h4>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={job?.postedBy.profileImage}
              alt={job?.postedBy.username || 'User'}
            />
            <AvatarFallback className="font-bold">
              {job?.postedBy.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-foreground font-medium">{job.postedBy.name}</p>
            <p className="text-muted-foreground text-sm">
              @{job.postedBy.username}
            </p>
          </div>
        </div>
        {job.postedBy.bio && (
          <p className="text-muted-foreground text-sm">{job.postedBy.bio}</p>
        )}
      </Card>

      <Card className="bg-surface border-border gap-3! p-4">
        <h4 className="text-foreground font-semibold">Job Stats</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Views
            </span>
            <span className="text-foreground font-medium">245</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Posted</span>
            <span className="text-foreground font-medium">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Card>

      <ApplyModal
        open={showApplyModal}
        onOpenChange={() => setShowApplyModal(false)}
        jobTitle={job.title}
        jobId={job._id}
      />
    </>
  );
};

export default JobSidebar;
