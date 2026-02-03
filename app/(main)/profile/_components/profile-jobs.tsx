import { Job, JobsResponse } from '@/types/job';
import { get } from '@/utils/methods';
import { formatDistanceToNow } from 'date-fns';
import { cookies } from 'next/headers';
import Link from 'next/link';

const ProfileJobs = async () => {
  let jobs: Job[] | null = null;
  let error = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const response = await get<JobsResponse>('/api/jobs/users/jobs', {
      isAuthenticated: true,
      token: accessToken,
    });
    jobs = response.jobs;
  } catch (err) {
    error = err;
  }

  if (error) {
    return <div>Error loading jobs: {String(error)}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div>No jobs found.</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <Link
          key={job._id}
          href={`/jobs/${job._id}`}
          className="border-border bg-surface hover:border-primary/50 block rounded-xl border p-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-foreground hover:text-primary font-semibold">
                {job.title}
              </h3>
              <p className="text-muted-foreground text-sm">{job.company}</p>
            </div>
          </div>
          <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
            <span>{0} applicants</span>
            <span>{job.status}</span>
            <span>
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileJobs;
