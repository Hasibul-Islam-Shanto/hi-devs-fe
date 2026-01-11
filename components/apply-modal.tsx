'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  jobId: string;
}

const ApplyModal = ({
  open,
  onOpenChange,
  jobTitle,
  jobId,
}: ApplyModalProps) => {
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    coverLetter: '',
  });

  const handleApply = async () => {
    if (!applicationForm.name || !applicationForm.email) {
      toast.error('Please fill in required fields');
      return;
    }

    // TODO: Implement application submission
    toast.success('Application submitted successfully!');
    onOpenChange(false);
    setApplicationForm({ name: '', email: '', resumeUrl: '', coverLetter: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input
              value={applicationForm.name}
              onChange={e =>
                setApplicationForm({
                  ...applicationForm,
                  name: e.target.value,
                })
              }
              placeholder="John Doe"
              className="bg-muted border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={applicationForm.email}
              onChange={e =>
                setApplicationForm({
                  ...applicationForm,
                  email: e.target.value,
                })
              }
              placeholder="john@example.com"
              className="bg-muted border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Resume URL</Label>
            <Input
              value={applicationForm.resumeUrl}
              onChange={e =>
                setApplicationForm({
                  ...applicationForm,
                  resumeUrl: e.target.value,
                })
              }
              placeholder="https://..."
              className="bg-muted border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Cover Letter</Label>
            <Textarea
              value={applicationForm.coverLetter}
              onChange={e =>
                setApplicationForm({
                  ...applicationForm,
                  coverLetter: e.target.value,
                })
              }
              placeholder="Why are you interested in this position?"
              className="bg-muted border-border min-h-[100px]"
            />
          </div>
          <Button variant="gradient" className="w-full" onClick={handleApply}>
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
