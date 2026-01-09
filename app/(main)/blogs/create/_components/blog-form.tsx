'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';
import { Controller, useForm } from 'react-hook-form';
import { BlogFormData, blogSchema } from '@/schemas/blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBlog } from '@/actions/blog.actions';
import { DEFAULT_COVER } from '@/utils/data';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="bg-muted flex h-44 items-center justify-center rounded-md border">
      <p className="text-muted-foreground">Loading editor...</p>
    </div>
  ),
});

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground">Loading preview...</div>
    ),
  },
);

const customCommands: ICommand[] = [
  commands.bold,
  commands.italic,
  commands.link,
  commands.code,
  commands.codeBlock,
  commands.checkedListCommand,
  commands.unorderedListCommand,
];

const BlogForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    mode: 'onBlur',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isPending, startTransition] = useTransition();

  const cover = getValues('cover');
  const description = getValues('description');

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
      setValue('tags', [...selectedTags, tag]);
      setError('tags', {});
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
    setValue(
      'tags',
      selectedTags.filter(t => t !== tag),
    );
    setError('tags', {});
  };

  const onSubmit = async (data: BlogFormData) => {
    startTransition(async () => {
      try {
        const response = await createBlog({
          ...data,
          cover: data.cover || DEFAULT_COVER,
        });
        if (response.success) {
          router.push('/blogs');
          toast.success(response.message, {
            position: 'top-center',
            duration: 2000,
          });
        } else {
          toast.error(response.message, {
            position: 'top-center',
            duration: 2000,
          });
        }
      } catch (error) {
        toast.error('Unable to Post a Blog', {
          position: 'top-center',
          duration: 2000,
          description:
            error instanceof Error
              ? error.message
              : 'There was an error creating the blog. Please try again.',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-border bg-surface shadow-card space-y-6 rounded-2xl border p-6">
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image URL (optional)</Label>
          <Input
            {...register('cover')}
            id="cover"
            placeholder="https://example.com/image.jpg"
          />
          {cover && (
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={cover}
                alt="Cover preview"
                height={225}
                width={400}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <p className="text-muted-foreground text-xs">
            Add a cover image to make your blog post more engaging
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register('title')}
            id="title"
            placeholder="An engaging title for your blog post"
            className="text-lg"
          />
          <p className="text-muted-foreground text-xs">
            Write a clear and descriptive title for your blog post
          </p>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <div className="border-border overflow-hidden rounded-lg border">
            <div className="border-border bg-muted/30 flex border-b">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'write'
                    ? 'text-foreground border-primary bg-background border-b-2'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-foreground border-primary bg-background border-b-2'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Preview
              </button>
            </div>

            <div className="bg-background p-4">
              {activeTab === 'write' ? (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      preview="edit"
                      hideToolbar={false}
                      commands={customCommands}
                      extraCommands={[]}
                      height={300}
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder:
                          'Include all the information someone would need to answer your question...',
                      }}
                      className="custom-md-editor"
                    />
                  )}
                />
              ) : (
                <div className="prose prose-invert min-h-100 max-w-none">
                  {description ? (
                    <MDEditorMarkdown
                      source={description}
                      style={{
                        whiteSpace: 'pre-wrap',
                        background: 'transparent',
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Nothing to preview. Write something first.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
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
                <X className="ml-1 h-3 w-3" />
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
            Add up to 5 tags to help readers discover your blog post
          </p>
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              reset();
              setSelectedTags([]);
              setTagInput('');
            }}
          >
            Cancel
          </Button>
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit" variant="gradient" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Blog'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
