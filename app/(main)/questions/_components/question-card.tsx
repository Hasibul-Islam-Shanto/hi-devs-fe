import { ArrowUp, MessageSquare, Bookmark, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Question } from '@/types/question';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <article className="border-border bg-surface shadow-card hover:shadow-elevated animate-slide-up rounded-2xl border p-5 transition-shadow">
      <div className="flex gap-4">
        <div className="flex min-w-15 flex-col items-center gap-1 text-center">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="text-foreground text-lg font-semibold">{0}</span>
          <span className="text-muted-foreground text-xs">votes</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <Link
              href={`/questions/${question._id}`}
              className="text-foreground hover:text-primary line-clamp-2 flex-1 text-lg font-semibold transition-colors"
            >
              {question.title}
            </Link>
            {/* {question.isAnswered && (
              <span className="shrink-0 rounded-md bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500">
                Answered
              </span>
            )} */}
          </div>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {question.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {question.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{question.askedBy.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(new Date(question.createdAt))} ago
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {0} answers
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {0} views
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="icon-sm">
            <Bookmark className={`h-4 w-4 fill-current`} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
