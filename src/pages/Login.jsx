import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import naverIcon from '../assets/images/naver.png';
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import KakaoLogin from 'react-kakao-login';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // ✅ 컨텍스트 사용

  const kakaoApiKey = import.meta.env.VITE_KAKAO_KEY;

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

  //카카오 로그인
  const kakaoResponse = async (response) => {
    const { access_token } = response.response;

    try{
      //백엔드로 카카오 로그인 토큰 전송
      const res = await axios.post('http://localhost:8081/api/auth/kakao-login', { accessToken: access_token});

      //로그인 성공 후 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', res.data);

      //로그인 상태 업데이트
      const payload = JSON.parse(atob(res.data.split('.')[1]));
      const user = {
        username: payload.username,
        role: payload.role
      };
      setAuth({ user, token: res.data });
      navigate('/');
    }catch(err){
      console.error('카카오 로그인 실패', err);
      alert('카카오 로그인 실패');
    }
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey);
      console.log("✅ Kakao SDK initialized");
    } else {
      console.warn("⚠️ Kakao SDK not loaded yet");
    }
  }, [kakaoApiKey]);

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
        <KakaoLogin
          token={kakaoApiKey}
          onSuccess={kakaoResponse}
          onFailure={kakaoResponse}
        />
        <button className="naver-btn"><img src={naverIcon} alt="naver-icon" />네이버로 로그인</button>
      </div>
    </div>
  );
};

export default Login;
