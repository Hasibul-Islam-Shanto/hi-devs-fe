import Link from 'next/link';
import SignupForm from './_components/signup-form';

const SignupPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4 py-8">
      <div className="animate-fade-in w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <div className="gradient-primary shadow-glow flex h-12 w-12 items-center justify-center rounded-xl">
              <span className="text-primary-foreground text-lg font-bold">
                &lt;/&gt;
              </span>
            </div>
          </Link>
          <h1 className="text-foreground text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-muted-foreground mt-1">
            Join the hi-devs community
          </p>
        </div>

        <div className="border-border bg-surface shadow-card rounded-2xl border p-6">
          <SignupForm />
          <p className="text-muted-foreground mt-4 text-center text-xs">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <p className="text-muted-foreground mt-6 text-center">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
