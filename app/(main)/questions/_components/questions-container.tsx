import QuestionCard from './question-card';
import { mockQuestions } from '@/utils/mockdata';

const QuestionsContainer = () => {
  return (
    <>
      {mockQuestions.length > 0 ? (
        <div className="space-y-4">
          {mockQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <div>No questions found</div>
      )}
    </>
  );
};

export default QuestionsContainer;
