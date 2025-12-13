import React from 'react';
import { ArrowUp, MessageSquare, Bookmark, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuestionCard = ({ question }: { question: any }) => {
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
          <span className="text-foreground text-lg font-semibold">
            {question.upvotes}
          </span>
          <span className="text-muted-foreground text-xs">votes</span>
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/questions/${question.id}`}
            className="text-foreground hover:text-primary line-clamp-2 text-lg font-semibold transition-colors"
          >
            {question.title}
          </Link>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {question.excerpt}
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
              <span>{question.author.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {question.createdAt}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {question.answersCount}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {question.views}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
