import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için ekledik
import './ForgotPassword.css'; // Stil dosyasını içe aktar

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Yönlendirme için ekledik

  const sendEmail = async (email, code) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log(`Reset code (${code}) has been sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      const emailSent = await sendEmail(email, '123456');
      if (emailSent) {
        setSuccessfulCreation(true);
        setError('');
        navigate('/reset-password'); // Başarılı gönderimden sonra yönlendirme yapıyoruz
      } else {
        setError('Failed to send reset code');
      }
    } catch (err) {
      setError('Failed to send reset code');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Forgot Password?</h1>
        <form onSubmit={create}>
          {!successfulCreation && (
            <>
              <label htmlFor='email'>Please provide your email address</label>
              <input
                type='email'
                placeholder='e.g john@doe.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <button type='submit'>Send password reset code</button>
              {error && <p className="error-message">{error}</p>}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
