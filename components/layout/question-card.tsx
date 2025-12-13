import React from "react";
import { ArrowUp, MessageSquare, Bookmark, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuestionCard = ({ question }: { question: any }) => {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-card hover:shadow-elevated transition-shadow animate-slide-up">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1 text-center min-w-15">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold text-foreground">
            {question.upvotes}
          </span>
          <span className="text-xs text-muted-foreground">votes</span>
        </div>

        <div className="flex-1 min-w-0">
          <Link
            href={`/questions/${question.id}`}
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
          >
            {question.title}
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {question.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {question.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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
