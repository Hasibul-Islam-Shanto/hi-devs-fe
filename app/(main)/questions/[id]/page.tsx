import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockQuestions } from '@/utils/mockdata';
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Bookmark,
  Share2,
  Send,
  Badge,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const QuestionPage = () => {
  const question = mockQuestions[0];
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
            <div className="flex flex-col items-center gap-1">
              <Button variant="default" size="icon" className="h-8 w-8">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-foreground text-lg font-semibold">{0}</span>
              <Button variant="default" size="icon" className="h-8 w-8">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-foreground mb-2 text-2xl font-bold">
                  {question.title}
                </h1>
                <div className="mb-4 flex flex-wrap gap-2">
                  {question.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/90 whitespace-pre-wrap">
                  {question.content}
                </p>
              </div>

              <div className="border-border flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {question.author.username}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Asked {new Date(question.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Bookmark className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default QuestionPage;
