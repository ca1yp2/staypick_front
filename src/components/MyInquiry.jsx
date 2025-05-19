import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/components/MyInquiries.css';

const MyInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [hotels, setHotels] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [resInquiries, resHotels] = await Promise.all([
          axios.get('/data/inquiry.json'),
          axios.get('/data/hotels.json'),
        ]);

        const myInquiries = resInquiries.data.filter(inquiry => inquiry.userId === user.id);
        setInquiries(myInquiries);
        setHotels(resHotels.data);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };

    fetchData();
  }, [user]);

  const getHotelById = (id) => hotels.find(h => h.id === id);

  if (!user) {
    return <div className="inquiry-container">⚠️ 로그인이 필요합니다.</div>;
  }

  return (
    <div className="inquiry-container">
      <h2 className="inquiry-title">내가 작성한 문의</h2>
      {inquiries.map((inquiry) => {
        const hotel = getHotelById(inquiry.hotelId);
        const statusClass = inquiry.status === 'processing' ? 'text-warning' : 'text-success';
        const statusText = inquiry.status === 'processing' ? '처리 중' : '답변 완료';

        return (
          <div key={inquiry.id} className="inquiry-card">
            <div className="inquiry-section">
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel?.name}</h3>
                <p className="inquiry-box-content">문의 종류: {inquiry.type}</p>
                <p className="inquiry-box-content">문의 제목: {inquiry.title}</p>
                <p className="inquiry-box-content">문의 내용: {inquiry.content}</p>
                <p className="inquiry-box-content">문의 날짜: {inquiry.date}</p>
                <div className="inquiry-box-content status-line">
                  <span className="label">문의 상태:</span>
                  <span className={`status-badge ${statusClass}`}>{statusText}</span>
                </div>
                {inquiry.comment && (
                  <p className="inquiry-box-content comment">문의 답변: {inquiry.comment}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyInquiries;
