import { Pagination } from './common';
import { User } from './user.type';

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  askedBy: User;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionResponse {
  success: boolean;
  questions: Question[];
  pagination: Pagination;
}
