import { SignIn } from '@clerk/nextjs';

function SignInPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;
