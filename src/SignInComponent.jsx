// SignInComponent.jsx
import { SignIn } from '@clerk/clerk-react';
import React from 'react';

const SignInComponent = () => {
  return (
    <div className="center">
      <SignIn routing="path" path="/signin" signUpUrl="/signup" />
    </div>
  );
};

export default SignInComponent;
