'use server';
import { QuestionResponse } from '@/types/question';
import { post } from '@/utils/methods';
import { cookies } from 'next/headers';

export const createQuestion = async (data: {
  title: string;
  description: string;
  tags: string[];
}) => {
  try {
    const cookieStore = await cookies();
    const response = await post<QuestionResponse>('/api/questions', data, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    console.log('🚀 ~ createQuestion ~ response:', response);
    return response;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error creating the question. Please try again.',
    };
  }
};
