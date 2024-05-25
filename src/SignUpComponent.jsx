// SignUpComponent.jsx
import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpComponent = () => {
  return (
    <div className="center">
      <SignUp routing="path" path="/signup" signInUrl="/signin" />
    </div>
  );
};

export default SignUpComponent;
