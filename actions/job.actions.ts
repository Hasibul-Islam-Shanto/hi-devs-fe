'use server';

import { JobPostPropsData } from '@/types/job';
import { post } from '@/utils/methods';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const postJob = async (data: JobPostPropsData) => {
  try {
    const cookieStore = await cookies();
    const response = await post('/api/jobs', data, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    revalidatePath('/jobs');
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error posting the job. Please try again.',
    };
  }
};
