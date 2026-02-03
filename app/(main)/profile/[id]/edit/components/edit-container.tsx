'use client';

import { updateUser } from '@/actions/user.actions';
import { UserFormData, UserSchema } from '@/schemas/user.schema';
import { useAuthStore } from '@/store/auth.store';
import { User } from '@/types/user.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const EditContainer = ({ user }: { user: User }) => {
  const router = useRouter();
  const [skillsInput, setSkillsInput] = useState(user.skills.join(', '));
  const [isUpdatingUserDetails, startedUpdatingUserDetails] = useTransition();
  const { setUser } = useAuthStore();
  const { register, watch, setValue, reset, handleSubmit } =
    useForm<UserFormData>({
      resolver: zodResolver(UserSchema),
      defaultValues: {
        username: user.username,
        profileImage: user.profileImage,
        email: user.email,
        name: user.name,
        bio: user.bio,
        location: user.location,
        website: user.website,
        socialLinks: {
          twitter: user.socialLinks.twitter,
          linkedin: user.socialLinks.linkedin,
          github: user.socialLinks.github,
        },
        skills: user.skills,
      },
    });
  const fieldValues = watch();

  const removeImage = () => {
    setValue('profileImage', undefined);
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSkillsInput(input);

    const skillsArray = input
      .split(',')
      .map(skill => skill.trim())
      .filter(Boolean);

    setValue('skills', skillsArray);
  };

  const onSubmit = (data: UserFormData) => {
    startedUpdatingUserDetails(async () => {
      try {
        const response = await updateUser(user._id, data);
        if (response.success) {
          toast.success('Profile updated successfully!', {
            position: 'top-center',
            duration: 2000,
          });
          setUser(response.user!);
          router.push('/profile');
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'There was an error updating your profile. Please try again.',
          {
            position: 'top-center',
            duration: 3000,
          },
        );
      }
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen p-6 md:p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate-fade-in mx-auto max-w-4xl space-y-6"
      >
        <section className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <h2 className="text-foreground text-lg font-semibold">
            Profile Picture
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Choose an image that represents you.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="border-border bg-muted/30 relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed">
              {fieldValues.profileImage ? (
                <>
                  <Image
                    src={fieldValues.profileImage}
                    alt="Profile preview"
                    height={200}
                    width={200}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute top-1 right-1 rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <Upload className="text-muted-foreground h-6 w-6" />
                  <p className="text-muted-foreground mt-1 text-xs">No image</p>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <label className="text-muted-foreground flex flex-col gap-2 text-sm">
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={() => {}}
                  className="border-border bg-muted/30 text-muted-foreground hover:border-primary hover:bg-muted/50 cursor-pointer rounded-xl border border-dashed p-3 text-xs transition-colors"
                />
              </label>
              <p className="text-muted-foreground text-xs">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </section>

        <section className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <h2 className="text-foreground text-lg font-semibold">
            Basic Information
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-muted-foreground flex flex-col gap-2 text-sm">
              <span className="text-foreground font-medium">Full Name *</span>
              <input
                {...register('name')}
                type="text"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="Your full name"
              />
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm">
              <span className="text-foreground font-medium">Username *</span>
              <input
                {...register('username')}
                type="text"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="Your username"
              />
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm md:col-span-2">
              <span className="text-foreground font-medium">
                Email (Read-only)
              </span>
              <input
                {...register('email')}
                type="email"
                disabled
                className="border-border bg-muted/40 text-muted-foreground cursor-not-allowed rounded-xl border px-4 py-2.5 text-sm"
              />
              <p className="text-muted-foreground text-xs">
                Email cannot be changed. Contact support if you need assistance.
              </p>
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm md:col-span-2">
              <span className="text-foreground font-medium">Location</span>
              <input
                {...register('location')}
                type="text"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="City, Country"
              />
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm md:col-span-2">
              <span className="text-foreground font-medium">Website</span>
              <input
                {...register('website')}
                type="url"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="https://example.com"
              />
            </label>
          </div>
        </section>

        <section className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <h2 className="text-foreground text-lg font-semibold">Bio</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Share a brief description about yourself. This will be visible on
            your profile.
          </p>

          <label className="text-muted-foreground mt-4 flex flex-col gap-2 text-sm">
            <textarea
              {...register('bio')}
              maxLength={500}
              className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary min-h-30 resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none"
              placeholder="Tell us about yourself..."
            />
            <div className="flex justify-end">
              <p className="text-muted-foreground text-xs">
                {fieldValues.bio?.length || 0}/500 characters
              </p>
            </div>
          </label>
        </section>

        <section className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <h2 className="text-foreground text-lg font-semibold">Skills</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Add your skills separated by commas.
          </p>

          <label className="text-muted-foreground mt-4 flex flex-col gap-2 text-sm">
            <input
              type="text"
              name="skills"
              value={skillsInput}
              onChange={handleSkillInputChange}
              className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
              placeholder="React, TypeScript, Tailwind CSS, Node.js..."
            />
            <p className="text-muted-foreground text-xs">
              Example: React, Node.js, UI/UX Design
            </p>
          </label>

          {skillsInput && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skillsInput
                .split(',')
                .map(skill => skill.trim())
                .filter(Boolean)
                .map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}
        </section>

        <section className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <h2 className="text-foreground text-lg font-semibold">
            Social Links
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Add links to your social media profiles.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="text-muted-foreground flex flex-col gap-2 text-sm">
              <span className="text-foreground font-medium">Twitter</span>
              <input
                {...register('socialLinks.twitter')}
                type="url"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="twitter.com/username"
              />
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm">
              <span className="text-foreground font-medium">LinkedIn</span>
              <input
                {...register('socialLinks.linkedin')}
                type="url"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="linkedin.com/in/username"
              />
            </label>

            <label className="text-muted-foreground flex flex-col gap-2 text-sm">
              <span className="text-foreground font-medium">GitHub</span>
              <input
                {...register('socialLinks.github')}
                type="url"
                className="border-border bg-input text-foreground placeholder-muted-foreground focus:border-primary rounded-xl border px-4 py-2.5 text-sm focus:outline-none"
                placeholder="github.com/username"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="border-border text-foreground hover:bg-muted/50 hover:border-primary hover:text-primary rounded-xl border px-6 py-2.5 text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
            disabled={isUpdatingUserDetails}
          >
            {isUpdatingUserDetails ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContainer;
