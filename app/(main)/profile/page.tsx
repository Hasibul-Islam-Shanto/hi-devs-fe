import { SectionError } from '@/components/Errors';
import { IUserResponse, User } from '@/types/user.type';
import { get } from '@/utils/methods';
import { cookies } from 'next/headers';
import ProfileDetails from './_components/profile-details';
import ProfileActivity from './_components/profile-activity';

const ProfilePage = async () => {
  let user: User | null = null;
  let error = null;
  const cookieStore = await cookies();

  try {
    const response = await get<IUserResponse>('/api/users/profile', {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    user = response.user;
  } catch (err) {
    error = err;
  }

  if (!user) {
    return <div>Error loading profile: {String(error)}</div>;
  }

  if (error) {
    return <SectionError title="Profile Error" message={String(error)} />;
  }
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <ProfileDetails user={user} />
      <ProfileActivity />
    </div>
  );
};

export default ProfilePage;
