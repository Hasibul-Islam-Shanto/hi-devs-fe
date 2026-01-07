'use server';

import { ICommentResponse, ICommnetCreateProps } from '@/types/comment';
import { del, post } from '@/utils/methods';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const addComment = async (data: ICommnetCreateProps) => {
  try {
    const cookieStore = await cookies();
    const response = await post<ICommentResponse>(
      '/api/comments',
      { comment: data.comment },
      {
        params: {
          commentableType: data.commentableType,
          commentableId: data.commentableId,
        },
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );
    revalidatePath(`/questions/${data.commentableId}`);
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error commenting the question.',
    };
  }
};

export const likesComment = async (commentId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await post<ICommentResponse>(
      `/api/comments/${commentId}/like`,
      {},
      {
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );
    revalidatePath(`/comments/${commentId}`);
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error liking the comment.',
    };
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await del<ICommentResponse>(`/api/comments/${commentId}`, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    revalidatePath(`/comments/${commentId}`);
    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error deleting the comment.',
    };
  }
};
