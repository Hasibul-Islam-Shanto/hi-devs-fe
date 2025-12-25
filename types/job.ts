import { Pagination } from './common';
import { User } from './user.type';

export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  requiredSkills: string[];
  postedBy: User;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobResponse {
  success: boolean;
  jobs: Job[];
  pagination: Pagination;
}
