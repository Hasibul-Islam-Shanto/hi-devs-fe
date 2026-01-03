'use client';

import { createQuestion } from '@/actions/question.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuestionFormData, QuestionSchema } from '@/schemas/question';
import { logError } from '@/utils/apiError';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
      <p className="text-muted-foreground">Loading editor...</p>
    </div>
  ),
});

const QuestionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    reset,
    getValues,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionSchema),
    mode: 'onBlur',
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const selectedTags = getValues('tags') || [];

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setTagInput('');
      setValue('tags', [...selectedTags, tag]);
      setError('tags', {});
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      'tags',
      selectedTags.filter(t => t !== tag),
    );
  };

  const onSubmit = async (data: QuestionFormData) => {
    startTransition(async () => {
      try {
        const response = await createQuestion(data);
        if (response.success) {
          toast.success('Question created successfully!', {
            description:
              'You have created a new question. This will be visible on the questions list.',
            position: 'top-center',
            duration: 2000,
          });
          router.push(`/questions`);
        }
      } catch (error) {
        logError(error, 'QuestionForm');
        console.error(
          error instanceof Error
            ? error.message
            : 'There was an error creating the question. Please try again.',
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-border bg-surface shadow-card space-y-6 rounded-2xl border p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register('title')}
            id="title"
            placeholder="What's your programming question? Be specific."
            className="text-lg"
          />
          <p className="text-muted-foreground text-xs">
            Be specific and imagine you&apos;re asking a question to another
            person
          </p>
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Details</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
                <X />
              </Badge>
            ))}
          </div>
          <div className="relative">
            <Input
              placeholder="Add up to 5 tags..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(tagInput.trim());
                }
              }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Add up to 5 tags to describe what your question is about
          </p>
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="gradient" disabled={isPending}>
            {isPending ? 'Posting...' : 'Post Question'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
