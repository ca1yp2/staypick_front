import React, { useState } from 'react';
import '../css/AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPw === '1234') {
      // 로그인 성공
      alert('로그인 성공!');
      navigate('/admin/dashboard'); // 로그인 성공 시 관리자 대시보드 이동
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>사장님 로그인</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="text"
          placeholder="아이디"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={adminPw}
          onChange={(e) => setAdminPw(e.target.value)}
        />
        {error && <div className="admin-login-error">{error}</div>}
        <button type="submit" className="admin-login-btn">
          로그인
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
