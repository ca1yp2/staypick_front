import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import naverIcon from '../assets/images/naver.png';
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // ✅ 컨텍스트 사용

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        userid,
        password
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);

        // ✅ 로그인 상태 업데이트
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          userid: payload.sub,
          username: payload.username,
          role: payload.role
        };
        setAuth({ user, token });

        console.log("로그인 성공");
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('로그인 실패');
    }
  };

  return (
    <div className="loginPage">
      <h1>로그인</h1>
      <p>아이디와 비밀번호를 입력하세요.</p>
      
      <input
        type="text"
        id="userid"
        placeholder="아이디"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />
      
      <input
        type="password"
        id="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button className="login-btn" onClick={handleLogin}>로그인</button>

      <div className="signUp-info">
        <p>계정이 없으신가요?</p>
        <a href="#" className="signUp-btn" onClick={() => navigate('/register')}>계정 생성</a>
      </div>

      <div className="social">
        <button className="kakao-btn"><RiKakaoTalkFill className='kakao-icon' />카카오로 로그인</button>
        <button className="naver-btn"><img src={naverIcon} alt="naver-icon" />네이버로 로그인</button>
      </div>
    </div>
  );
};

export default Login;
