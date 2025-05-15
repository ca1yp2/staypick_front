import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import naverIcon from '../assets/images/naver.png';
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.get('/data/users.json');
      const found = res.data.find(
        (user) => user.email === email && user.password === pw
      );
      if (found) {
        localStorage.setItem('user', JSON.stringify(found));
        alert('로그인 성공!');
        navigate('/mypage');
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('로그인 실패');
    }
  };

  return (
    <div className="loginPage">
      <h1>로그인</h1>
      <p>이메일과 비밀번호를 입력하세요.</p>
      <input
        type="email"
        id="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>로 그 인</button>

      <div className="signUp-info">
        <p>계정이 없으신가요?</p>
        <a href="#" className="signUp-btn" onClick={() => navigate('/register')}>계정생성</a>
      </div>

      <div className="social">
        <button className="google-btn"><FaGoogle className='google-icon' />구글로 로그인</button>
        <button className="kakao-btn"><RiKakaoTalkFill className='kakao-icon' />카카오로 로그인</button>
        <button className="naver-btn"><img src={naverIcon} alt="naver-icon" />네이버로 로그인</button>
        
      </div>
      <button
  style={{ marginTop: '20px', background: '#eee', padding: '10px' }}
  onClick={() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        name: '홍길동',
        email: 'hong@staypick.com',
        phone: '01012345678',
      })
    );
    alert('개발용 가짜 로그인 완료!');
    window.location.href = '/mypage'; // navigate 써도 됨
  }}
>
  개발용 자동 로그인
</button>
    </div>
  );
};

export default Login;
