import { Job, JobsResponse } from '@/types/job';
import JobCard from './job-card';
import { get } from '@/utils/methods';

const JobsContainer = async () => {
  let jobs: Job[] | null = null;
  let error = null;

  try {
    const response = await get<JobsResponse>('/api/jobs', {
      retry: 2,
      timeout: 5000,
    });
    if (response.success) {
      jobs = response.jobs;
    }
  } catch (err) {
    error = err;
  }

  if (error) {
    return <div>Error loading jobs</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div>No jobs available at the moment.</div>;
  }

  return (
    <div className="space-y-4">
      {jobs?.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobsContainer;
