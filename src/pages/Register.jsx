import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // location 추가
import axios from 'axios';
import '../css/register.css';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isKakaoUser = false, 
        userid = ''
    } = location.state || {};

    const [inputId, setInputId] = useState(userid);
    const [inputPw, setInputPw] = useState('');
    const [inputRepw, setInputRepw] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('1');
    const [birthDay, setBirthDay] = useState('');

    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');
    const [rePwError, setRePwError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [idAvailable, setIdAvailable] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if(isKakaoUser) {
            setInputId(userid);
            setInputName('');
        }
    }, [isKakaoUser, userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'inputId': setInputId(value); setIdError(''); break;
            case 'inputPw': setInputPw(value); setPwError(''); break;
            case 'inputRepw': setInputRepw(value); setRePwError(''); break;
            case 'inputName': setInputName(value); setNameError(''); break;
            case 'inputPhone': setInputPhone(value.replace(/[^0-9]/g, '').slice(0, 11)); setPhoneError(''); break;
            case 'inputEmail': setInputEmail(value); setEmailError(''); break;
            case 'birth-year': setBirthYear(value.replace(/[^0-9]/g, '').slice(0, 4)); break;
            case 'birth-month': setBirthMonth(value); break;
            case 'birth-day': setBirthDay(value.replace(/[^0-9]/g, '').slice(0, 2)); break;
            default: break;
        }
    };

    const handleIdCheck = async () => {
        if (!inputId.trim()) {
            setIdError('아이디를 입력해주세요.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8081/api/auth/check-id/${inputId}`, {
                withCredentials: true
            });
            if (response.data === 'OK') {
                setIdAvailable(true);
                setIdError('사용 가능한 아이디입니다.');
            } else {
                setIdAvailable(false);
                setIdError('이미 존재하는 아이디입니다.');
            }
        } catch (error) {
            console.error('아이디 중복 확인 오류:', error);
            setIdError('아이디 중복 확인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // 🔹 비밀번호 및 아이디 유효성 체크는 일반 유저만
        if (!isKakaoUser) {
            if (!inputId.trim()) { setIdError('아이디를 입력해주세요.'); isValid = false; }
            else if (inputId.length < 6 || inputId.length > 20) { setIdError('아이디를 6~20자 이하로 작성해주세요.'); isValid = false; }
            else if (!idAvailable) { setIdError('아이디 중복 확인을 해주세요.'); isValid = false; }

            if (!inputPw.trim()) { setPwError('비밀번호를 입력해주세요.'); isValid = false; }
            if (!inputRepw.trim()) { setRePwError('비밀번호 확인을 입력해주세요.'); isValid = false; }
            else if (inputPw !== inputRepw) { setRePwError('비밀번호가 일치하지 않습니다.'); isValid = false; }
        }

        if (!inputName.trim()) { setNameError('이름을 입력해주세요.'); isValid = false; }

        if (!inputPhone.trim()) { setPhoneError('전화번호를 입력해주세요.'); isValid = false; }
        else if (inputPhone.length !== 11) { setPhoneError('전화번호를 11자리로 입력해주세요.("-" 제외)'); isValid = false; }

        if (!inputEmail.trim()) { setEmailError('이메일 주소를 입력해주세요.'); isValid = false; }
        else if (!/\S+@\S+\.\S+/.test(inputEmail)) { setEmailError('올바른 이메일 주소 형식이 아닙니다.'); isValid = false; }

        if (!isValid) return;

        // 🔹 birth 포맷 변환 ("yyyy-MM-dd")
        const birth = birthYear && birthMonth && birthDay
            ? `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`
            : null;

        try {
            // 🔹 요청 보낼 URL 선택
            const endpoint = isKakaoUser
                ? 'http://localhost:8081/api/auth/kakao-register'
                : 'http://localhost:8081/api/auth/register';

            const payload = {
                userid: inputId || kakaoUserId || null, // 카카오 유저면 kakaoUserId 사용
                password: isKakaoUser ? null : inputPw,
                inputRepw: isKakaoUser ? null : inputRepw,
                username: inputName,
                tel: inputPhone,
                email: inputEmail,
                birth: birth,
                isKakaoUser: isKakaoUser
            };

            await axios.post(endpoint, payload);

            alert('회원가입 성공! 로그인 페이지로 이동합니다.');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 오류:', error);
            setError(error.response?.data || '회원가입에 실패했습니다.');
        }
    };


    return (
        <form name="join_form" onSubmit={handleSubmit} id="join_form">
            <div className="signUpPage">
                <h1>회원가입</h1>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                <div className="signUpPage-box">
                    {isKakaoUser && (
                        <>
                            <div className="signUpTitle">아이디</div>
                            <input type="text" name="inputId" value={inputId} readOnly />
                        </>
                    )}

                    {!isKakaoUser && (
                        <>
                            <div className="signUpTitle">아이디 <span className="error-message">{idError}</span></div>
                            <input type="text" name="inputId" value={inputId} onChange={handleInputChange} />
                            <button type="button" onClick={handleIdCheck}>중복확인</button>

                            <div className="signUpTitle">비밀번호 <span className="error-message">{pwError}</span></div>
                            <input type="password" name="inputPw" value={inputPw} onChange={handleInputChange} />

                            <div className="signUpTitle">비밀번호 확인 <span className="error-message">{rePwError}</span></div>
                            <input type="password" name="inputRepw" value={inputRepw} onChange={handleInputChange} />
                        </>
                    )}

                    <div className="signUpTitle">이름 <span className="error-message">{nameError}</span></div>
                    <input type="text" name="inputName" value={inputName} onChange={handleInputChange} />

                    <div className="signUpTitle">전화번호 <span className="error-message">{phoneError}</span></div>
                    <input type="text" name="inputPhone" value={inputPhone} onChange={handleInputChange} />

                    <div className="signUpTitle">이메일 <span className="error-message">{emailError}</span></div>
                    <input type="email" name="inputEmail" value={inputEmail} onChange={handleInputChange} />

                    <div className="signUpTitle">생년월일(선택)</div>
                    <div className="birth-box">
                        <input type="text" name="birth-year" placeholder="년" value={birthYear} onChange={handleInputChange} />
                        <select name="birth-month" value={birthMonth} onChange={handleInputChange}>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <input type="text" name="birth-day" placeholder="일" value={birthDay} onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="signUp-Check-btn submitButton">가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default Register;
