interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="border-destructive/50 bg-destructive/10 rounded-lg border p-4">
      <h3 className="text-destructive mb-1 font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-3 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-primary text-sm hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export const SectionError = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
      </div>
      <ErrorMessage message={message} />
    </section>
  );
};
