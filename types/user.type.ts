export interface User {
  name: string;
  username: string;
  email: string;
  _id: string;
  bio: string;
  profileImage: string;
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  isVerified: boolean;
}
