import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
