import { ClerkProvider } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Final from './Final.jsx';
import ForgotPasswordPage from './ForgotPasswordPage.js';
import MainComponent from './MainComponent.jsx';
import QuestionSets from './QuestionSets.jsx';
import ResetPassword from './ResetPassword.js';
import SignInComponent from './SignInComponent.jsx';
import SignUpComponent from './SignUpComponent.jsx';
import Start from './Start.jsx';
import StatisticsPage from './StatisticsPage';
import Test from './Test.jsx';
import Testresult from './Testresult.jsx';

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const [inputData, setInputData] = useState([]);

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <div className="container">
        <HashRouter>
          <Routes>
            <Route path="/signin" element={<SignInComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/" element={<Start />} />
            <Route path="/main" element={<MainComponent inputData={inputData} setInputData={setInputData} />} />
            <Route path="/final" element={<Final />} />
            <Route path="/sets" element={<QuestionSets />} />
            <Route path='/test' element={<Test />} />
            <Route path='/testresult' element={<Testresult />} />
            <Route path="*" element={<Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* ResetPassword bileşeni için rota ekleyin */}


        <Route path="/sets" element={<QuestionSets />} />
          </Routes>
        </HashRouter>
      </div>
    </ClerkProvider>
  );
}

export default App;