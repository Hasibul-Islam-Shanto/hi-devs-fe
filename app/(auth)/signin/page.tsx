import SigninForm from './_components/signin-form';
import Link from 'next/link';

const SigninPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="animate-fade-in w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <div className="gradient-primary shadow-glow flex h-12 w-12 items-center justify-center rounded-xl">
              <span className="text-primary-foreground text-lg font-bold">
                &lt;/&gt;
              </span>
            </div>
          </Link>
          <h1 className="text-foreground text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Sign in to your hi-devs account
          </p>
        </div>

        <div className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <SigninForm />
        </div>

        {/* Sign up link */}
        <p className="text-muted-foreground mt-6 text-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
