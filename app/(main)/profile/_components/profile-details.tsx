import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user.type';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Edit, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

const ProfileDetails = ({ user }: { user: User }) => {
  return (
    <div className="border-border bg-surface shadow-card mb-6 rounded-2xl border p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar>
          <AvatarImage
            src={user?.profileImage}
            alt={user?.username || 'User'}
            className="h-24 w-24"
          />
          <AvatarFallback className="font-bold">
            {user?.username?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-foreground text-2xl font-bold">
                {user.name}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/settings">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>

          <p className="text-foreground mt-4">{user.bio}</p>
          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Joined{' '}
              {formatDistanceToNow(new Date(user.createdAt), {
                addSuffix: true,
              })}
            </div>
            <Link
              href="#"
              className="hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="#"
              className="hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills.map(skill => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
