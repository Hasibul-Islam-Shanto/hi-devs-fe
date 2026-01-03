import { SectionError } from '@/components/Errors';
import QuestionCard from '@/components/layout/question-card';
import { Question, QuestionsResponse } from '@/types/question';
import { get } from '@/utils/methods';
import Link from 'next/link';

const RecentQuestions = async () => {
  let questions: Question[] = [];
  let error = null;

  try {
    const response = await get<QuestionsResponse>('/api/questions', {
      retry: 2,
      timeout: 5000,
    });
    questions = response.questions;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <SectionError
        title="Recent Questions"
        message="Unable to load questions right now. Please check back later."
      />
    );
  }

  if (!questions || questions.length === 0) {
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
        <p className="text-muted-foreground text-sm">
          No questions available at the moment.
        </p>
      </section>
    );
  }

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
