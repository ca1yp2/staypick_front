import React from 'react'
import '../css/Login.css';
import naverIcon from '../assets/images/naver.png';
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

const Login = () => {
  return (
    <div className="loginPage">
      <h1>로그인</h1>
      <p>이메일과 비밀번호를 입력하세요.</p>
      <input type="email" id="email" placeholder="이메일" />
      <input type="password" id="password" placeholder="비밀번호" />
      <button className="login-btn">로 그 인</button>
      <div className="signUp-info">
        <p>계정이 없으신가요?</p>
        <a href="#" className="signUp-btn">계정생성</a>
      </div>
      <div className="social">
        <button className="google-btn"><FaGoogle className='google-icon' />구글로 로그인</button>
        <button className="kakao-btn"><RiKakaoTalkFill className='kakao-icon'/>카카오로 로그인</button>
        <button className="naver-btn"><img src={naverIcon} alt="naver-icon" />네이버로 로그인</button>
      </div>
    </div>
  )
}

export default Login