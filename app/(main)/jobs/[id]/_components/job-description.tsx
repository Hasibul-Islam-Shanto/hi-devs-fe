'use client';

import { Card } from '@/components/ui/card';
import { Job } from '@/types/job';
import dynamic from 'next/dynamic';

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => <div className="text-muted-foreground">Loading...</div>,
  },
);

const JobDescription = ({ job }: { job: Job }) => {
  return (
    <Card className="bg-surface border-border p-6">
      <h2 className="text-foreground mb-4 text-xl font-semibold">
        Job Description
      </h2>
      <div className="prose prose-invert max-w-none">
        <MDEditorMarkdown
          source={job.description}
          style={{
            whiteSpace: 'pre-wrap',
            background: 'transparent',
          }}
        />
      </div>
    </Card>
  );
};

export default JobDescription;
