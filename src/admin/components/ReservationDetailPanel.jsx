import React, { useState, useEffect } from 'react';
import '../css/ReservationDetailPanel.css';

const ReservationDetailPanel = ({ reservation, onCancel }) => {
  const [memo, setMemo] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setMemo(reservation?.memo || '');
    setStatus(reservation?.status || '');
  }, [reservation]);

  if (!reservation) {
    return (
      <div className="reservation-detail-panel empty">
        예약 건을 선택해주세요.
      </div>
    );
  }

  const handleCancel = () => {
    if (window.confirm('정말 이 예약을 취소하시겠습니까?')) {
      setStatus('취소됨');
      onCancel?.(reservation.id);
    }
  };

  return (
    <div className="reservation-detail-panel">
      <h3>예약 상세</h3>
      <p><strong>예약자:</strong> {reservation.guestName}</p>
      <p><strong>전화번호:</strong> {reservation.phone}</p>
      <p><strong>이메일:</strong> {reservation.email}</p>
      <p><strong>객실명:</strong> {reservation.roomName}</p>
      <p><strong>체크인:</strong> {reservation.checkIn}</p>
      <p><strong>체크아웃:</strong> {reservation.checkOut}</p>
      <p><strong>인원:</strong> {reservation.people}명</p>
      <hr />
      <p><strong>결제금액:</strong> {reservation.amount?.toLocaleString()}원</p>
      <p><strong>결제수단:</strong> {reservation.paymentMethod}</p>
      <p><strong>예약상태:</strong> {status}</p>
      <p><strong>예약일:</strong> {reservation.createdAt}</p>

      <div className="memo-box">
        <label>메모</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
        />
      </div>

      {status !== '취소됨' && (
        <button className="cancel-button" onClick={handleCancel}>
          예약 취소하기
        </button>
      )}
    </div>
  );
};

export default ReservationDetailPanel;
