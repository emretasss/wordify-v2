import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './1.png';
import './Start.css';

const Start = () => {
  let navigate = useNavigate();

  function switchScreen() {
    navigate('/sets');
  }

  function SignUpButton() {
    const clerk = useClerk();
  
    return (
      <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
        Sign up
      </button>
    );
  }
  
  function SignInButton() {
    const clerk = useClerk();
  
    return (
      <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
        Sign in
      </button>
    );
  }

  return (
    <>
    

      <div className='background-start' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card">
          <SignedOut>
            <SignUpButton />
            <SignInButton />
            <Link to="/forgot-password">Forgot Password</Link>
          </SignedOut>
          <SignedIn>
          <button onClick={switchScreen} className='startButton'>Start</button>

            <UserButton afterSignOutUrl="/Start" />
          </SignedIn>
        </div>
      </div>
    </>
  );
};

export default Start;
