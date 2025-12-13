import QuestionCard from '@/components/layout/question-card';
import { mockQuestions } from '@/utils/mockdata';
import Link from 'next/link';
import React from 'react';

const RecentQuestions = () => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">
          Recent Questions
        </h2>
        <Link
          href="/questions"
          className="text-primary text-sm hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {mockQuestions.slice(0, 3).map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default RecentQuestions;
