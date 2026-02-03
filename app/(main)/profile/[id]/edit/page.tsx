import { IUserResponse, User } from '@/types/user.type';
import EditContainer from './components/edit-container';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';

const EditProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let user: User | null = null;
  let error = null;

  try {
    const { id } = await params;
    const cookieStore = await cookies();

    const response = await get<IUserResponse>(`/api/users/${id}`, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    user = response.user;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="text-foreground mb-4 text-2xl font-bold">
          User Not Found
        </h1>
        <p className="text-muted-foreground">{String(error)}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
        <h1 className="text-foreground mb-4 text-2xl font-bold">
          User Not Found
        </h1>
      </div>
    );
  }
  return (
    <>
      <EditContainer user={user!} />
    </>
  );
};

export default EditProfilePage;
