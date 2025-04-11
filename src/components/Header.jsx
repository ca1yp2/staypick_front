import React from 'react';
import logo from '../assets/images/logo.png';
import '../css/components/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="left">
          <a href="/">
            <img src={logo} alt="STAYPICK" className="header-logo" />
          </a>
        </div>
        <nav className="center">
          <a href="/accomodation">숙박예약</a>
          <a href="/board">게시판</a>
          <a href="/mypage">마이페이지</a>
        </nav>
        <div className="right">
          <a href="/login">로그인</a>
          <a href="/register">회원가입</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
