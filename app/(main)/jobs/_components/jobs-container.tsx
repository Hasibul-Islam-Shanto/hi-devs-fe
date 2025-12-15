import JobCard from './job-card';
import { mockJobs } from '@/utils/mockdata';

const JobsContainer = () => {
  return (
    <>
      {mockJobs.length > 0 ? (
        <div className="space-y-4">
          {mockJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div>No jobs found</div>
      )}
    </>
  );
};

export default JobsContainer;
