import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import naverIcon from '../assets/images/naver.png';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const kakaoApiKey = import.meta.env.VITE_KAKAO_KEY;

  // ✅ 일반 로그인
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        userid,
        password
      });

      let token = response.data;
      if (typeof token === 'object' && token.token) token = token.token;
      if (!token) {
        alert("로그인 토큰이 존재하지 않습니다.");
        return;
      }

      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = {
        userid: payload.sub,
        username: payload.username,
        role: payload.role
      };
      setAuth({ user, token });

      alert("✅ 로그인 성공");
      navigate('/');
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // ✅ 카카오 로그인
  const kakaoResponse = async (response) => {
    const { access_token } = response.response;

    try {
      const res = await axios.post('http://localhost:8081/api/auth/kakao-login', {
        accessToken: access_token
      });

      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          userid: payload.sub,
          username: payload.username,
          role: payload.role
        };
        setAuth({ user, token });

        navigate('/');
      } else if (res.data.needAdditionalInfo) {
        navigate('/register', {
          state: {
            userid: res.data.userid,
            username: res.data.username,
            isKakaoUser: true
          }
        });
      } else {
        alert("응답 형식이 예상과 다릅니다.");
      }
    } catch (err) {
      console.error('카카오 로그인 실패', err);
      alert('카카오 로그인 실패');
    }
  };

  // ✅ Kakao SDK 초기화
  useEffect(() => {
    try {
      if (kakaoApiKey && window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey);
        console.log("✅ Kakao SDK initialized");
      }
    } catch (e) {
      console.error("⚠️ Kakao.init() 실패 또는 생략됨:", e);
    }
  }, [kakaoApiKey]);

  return (
    <div className="loginPage">
      <h1>로그인</h1>
      <p>아이디와 비밀번호를 입력하세요.</p>

      <input
        type="text"
        placeholder="아이디"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />

      <input
        type="password"
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
        {/* ✅ 카카오 로그인 */}
        {kakaoApiKey && (
          <KakaoLogin
            token={kakaoApiKey}
            onSuccess={kakaoResponse}
            onFailure={kakaoResponse}
            scope="account_email,profile_nickname,profile_image"
          />
        )}

        {/* ✅ 네이버 로그인 버튼 (구현 예정) */}
        <button className="naver-btn">
          <img src={naverIcon} alt="naver-icon" />
          네이버로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
