import QuestionForm from './_components/question-form';

const QuestionCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:p-6">
      <header className="mb-6">
        <h1 className="text-foreground text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground mt-1">
          Get help from the developer community
        </p>
      </header>
      <QuestionForm />
    </div>
  );
};

export default QuestionCreatePage;
