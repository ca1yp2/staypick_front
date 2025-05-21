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
        let token = response.data;

        // response.data가 객체면 token 키에서 꺼냄
        if (typeof token === 'object' && token.token) {
          token = token.token;
        }

        // 토큰이 없으면 에러 처리
        if (!token) {
          alert("로그인 토큰이 존재하지 않습니다.");
          return;
        }

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

    try {
      // 백엔드에 카카오 access token 보내기
      const res = await axios.post('http://localhost:8081/api/auth/kakao-login', {
        accessToken: access_token
      });

      if (res.data.token) {
        const token = res.data.token; // ✅ 문자열 토큰 추출

        // 토큰 저장
        localStorage.setItem('token', token);

        // 로그인 상태 업데이트
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          userid: payload.sub,
          username: payload.username,
          role: payload.role
        };
        setAuth({ user, token });

        navigate('/'); // 기존 사용자면 바로 메인 페이지로 이동
      } else if (res.data.needAdditionalInfo) {
        // 신규 사용자일 경우 추가 정보 등록으로 이동
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
          scope="account_email,profile_nickname,profile_image"
        />
        <button className="naver-btn"><img src={naverIcon} alt="naver-icon" />네이버로 로그인</button>
      </div>
    </div>
  );
};

export default Login;
