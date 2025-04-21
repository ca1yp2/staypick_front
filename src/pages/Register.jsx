import React, { useState } from 'react';
import '../css/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputRepw, setInputRepw] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [rePwError, setRePwError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'inputId': setInputId(value); setIdError(''); break;
      case 'inputPw': setInputPw(value); setPwError(''); break;
      case 'inputRepw': setInputRepw(value); setRePwError(''); break;
      case 'inputName': setInputName(value); setNameError(''); break;
      case 'inputPhone': setInputPhone(value.replace(/[^0-9]/g, '').slice(0, 11)); setPhoneError(''); break;
      case 'inputEmail': setInputEmail(value); setEmailError(''); break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // 유효성 검사
    if (!inputId.trim()) { setIdError('아이디를 입력해주세요.'); isValid = false; }
    else if (inputId.length < 6 || inputId.length > 20) { setIdError('아이디를 6~20자 이하로 작성해주세요.'); isValid = false; }

    if (!inputPw.trim()) { setPwError('비밀번호를 입력해주세요.'); isValid = false; }
    if (!inputRepw.trim()) { setRePwError('비밀번호 확인을 입력해주세요.'); isValid = false; }
    else if (inputPw !== inputRepw) { setRePwError('비밀번호가 일치하지 않습니다.'); isValid = false; }

    if (!inputName.trim()) { setNameError('이름을 입력해주세요.'); isValid = false; }
    if (!inputPhone.trim()) { setPhoneError('전화번호를 입력해주세요.'); isValid = false; }
    else if (inputPhone.length !== 11) { setPhoneError('전화번호를 11자리로 입력해주세요.("-" 제외)'); isValid = false; }

    if (!inputEmail.trim()) { setEmailError('이메일 주소를 입력해주세요.'); isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(inputEmail)) { setEmailError('올바른 이메일 주소 형식이 아닙니다.'); isValid = false; }

    if (!isValid) return;

    try {
      const res = await axios.get('/data/users.json');
      const exists = res.data.find((user) => user.email === inputEmail);
      if (exists) {
        alert('이미 존재하는 이메일입니다.');
        return;
      }

      const newUser = {
        id: Date.now(),
        email: inputEmail,
        password: inputPw,
        name: inputName,
        phone: inputPhone,
        username: inputId
      };

      // 저장은 백엔드 없이 불가하므로 localStorage에 임시 저장
      localStorage.setItem('newUser', JSON.stringify(newUser));
      alert('회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err) {
      console.error('회원가입 오류:', err);
      alert('회원가입 실패');
    }
  };

  return (
    <form name="join_form" onSubmit={handleSubmit} id="join_form">
      <div className="signUpPage">
        <h1>회원가입</h1>
        <div className="signUpPage-box">
        <div className="signUpTitle">
              아이디
              <span className="error-message">{idError}</span>
            </div>
            <input
              type="text"
              name="inputId"
              id="inputId"
              placeholder="아이디 입력(6~20자이하)"
              maxLength="20"
              value={inputId}
              onChange={handleInputChange}
            />
            <button className="idCheck-btn" type="button" onClick={() => { /* 중복 확인 처리 함수 */ }}>
              중복확인
            </button>
            <div className="signUpTitle">
              비밀번호
              <span className="error-message">{pwError}</span>
            </div>
            <input
              type="password"
              name="inputPw"
              id="inputPw"
              placeholder="비밀번호 입력"
              value={inputPw}
              onChange={handleInputChange}
            />
            <div className="signUpTitle">
              비밀번호 확인
              <span className="error-message">{rePwError}</span>
            </div>
            <input
              type="password"
              name="inputRepw"
              id="inputRepw"
              placeholder="비밀번호 재입력"
              value={inputRepw}
              onChange={handleInputChange}
            />
            <div className="signUpTitle">
              이름
              <span className="error-message">{nameError}</span>
            </div>
            <input
              type="text"
              name="inputName"
              id="inputName"
              placeholder="이름을 입력해주세요"
              value={inputName}
              onChange={handleInputChange}
            />
            <div className="signUpTitle">
              전화번호
              <span className="error-message">{phoneError}</span>
            </div>
            <input
              type="text"
              name="inputPhone"
              id="inputPhone"
              placeholder="휴대폰 번호 입력('-'제외 11자리 입력)"
              maxLength="11"
              value={inputPhone}
              onChange={handleInputChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
              }}
            />
            <div className="signUpTitle">
              이메일 주소
              <span className="error-message">{emailError}</span>
            </div>
            <input
              type="email"
              name="inputEmail"
              id="inputEmail"
              placeholder="이메일"
              value={inputEmail}
              onChange={handleInputChange}
            />
            <div className="signUpTitle">
              생년월일(선택)
              <div className="birth-box">
                <input
                  type="text"
                  name="birth-year"
                  id="birth-year"
                  placeholder="년(4자)"
                  maxLength="4"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                  }}
                />
                <select name="birth-month" placeholder="월">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <input
                  type="text"
                  name="birth-day"
                  id="birth-day"
                  placeholder="일"
                  maxLength="2"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                  }}
                />
              </div>
            </div>
          <button type="submit" className="signUp-Check-btn submitButton">
            가입하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
