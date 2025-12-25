import QuestionCard from '@/components/layout/question-card';
import { QuestionResponse } from '@/types/question';
import { get } from '@/utils/fetcher';
import Link from 'next/link';

const RecentQuestions = async () => {
  const data = await get<QuestionResponse>('/api/questions');
  const questions = data.questions;

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
        {questions.map(question => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </section>
  );
};

export default RecentQuestions;
