import { Pagination } from './common';
import { User } from './user.type';

export interface Blog {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postedBy: User;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  success: boolean;
  blogs: Blog[];
  pagination: Pagination;
}
