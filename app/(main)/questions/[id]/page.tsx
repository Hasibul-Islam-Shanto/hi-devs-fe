import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Question, QuestionResponse } from '@/types/question';
import { get } from '@/utils/methods';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import MarkDownEditor from './_components/markdown-editor';
import CommentBox from '@/components/comment/CommentBox';
import LikeButton from '@/components/buttons/like-button';

const QuestionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let question: Question | null = null;
  let error = null;
  try {
    const response = await get<QuestionResponse>(`/api/questions/${id}`);
    question = response.question;
  } catch (err) {
    error = err;
  }
  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-6">
        <p className="text-center text-red-500">
          Unable to load question right now. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6 py-6">
        <Link
          href="/questions"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </Link>

        <Card className="bg-surface border-border p-6">
          <div className="flex gap-4">
            {/* <div className="flex flex-col items-center gap-1">
              <Button variant="default" size="icon" className="h-8 w-8">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-foreground text-lg font-semibold">{0}</span>
              <Button variant="default" size="icon" className="h-8 w-8">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div> */}

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-foreground mb-2 text-2xl font-bold">
                  {question?.title}
                </h1>
                <div className="mb-4 flex flex-wrap gap-2">
                  {question?.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <MarkDownEditor value={question?.description || ''} />
              </div>

              <div className="border-border flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={question?.askedBy?.profileImage}
                      alt={question?.askedBy?.username || 'User avatar'}
                    />
                    <AvatarFallback className="font-bold">
                      {question?.askedBy?.username
                        ?.substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {question?.askedBy.username}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Asked{' '}
                      {formatDistanceToNow(new Date(question!.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LikeButton
                    id={question?._id || ''}
                    likesCount={question?.likes?.length || 0}
                    likes={question?.likes || []}
                  />
                  <Button variant="ghost" size="sm">
                    <Bookmark className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div>
          <CommentBox />
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
