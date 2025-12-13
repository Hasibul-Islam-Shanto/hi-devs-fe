import QuestionCard from "@/components/layout/question-card";
import { mockQuestions } from "@/utils/mockdata";
import Link from "next/link";
import React from "react";

const RecentQuestions = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Recent Questions
        </h2>
        <Link
          href="/questions"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {mockQuestions.slice(0, 3).map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default RecentQuestions;
