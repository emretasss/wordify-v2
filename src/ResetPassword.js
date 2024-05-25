import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate kancasını ekleyin
import './ResetPassword.css'; // Yeni stil dosyasını içe aktar

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // useNavigate kancasını kullanarak navigate işlevini alın

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    // Şifre sıfırlama isteği backend'e gönderilecek
    console.log('Şifre sıfırlandı:', password);

    // Şifre sıfırlama işlemi tamamlandıktan sonra giriş ekranına yönlendirin
    navigate('/signin'); // '/signin' rotasına yönlendirme yapın
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Şifre Sıfırlama</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Yeni Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Şifreyi Onayla:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Şifreyi Sıfırla</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
