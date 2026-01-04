'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';
import { commands, ICommand } from '@uiw/react-md-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '../ui/label';
import { Send } from 'lucide-react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const customCommands: ICommand[] = [
  commands.bold,
  commands.italic,
  commands.link,
  commands.code,
  commands.codeBlock,
  commands.checkedListCommand,
];

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment cannot be empty'),
});
type CommentFormData = z.infer<typeof commentSchema>;

const CommentBox = () => {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const onSubmit = (data: CommentFormData) => {
    reset();
    setExpanded(false);
  };

  console.log('Errors:', errors);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {!expanded ? (
        <div
          className="border-input bg-background text-muted-foreground hover:border-primary cursor-text rounded-md border px-3 py-2 transition-all duration-200"
          onClick={() => setExpanded(true)}
        >
          Write your comment...
        </div>
      ) : (
        <div className="space-y-2 transition-all duration-200">
          <Label htmlFor="comment">Write your comment</Label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                toolbarBottom={false}
                preview="edit"
                commands={customCommands}
                extraCommands={[]}
                height={150}
                style={{
                  borderRadius: '10px',
                  padding: '5px',
                  backgroundColor: 'transparent',
                }}
                className="custom-md-editor"
                autoFocus
              />
            )}
          />
          {errors.comment && (
            <p className="text-sm text-red-500">{errors.comment.message}</p>
          )}
          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setExpanded(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="gradient" type="submit">
              <Send />
              Post Your Comment
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CommentBox;
