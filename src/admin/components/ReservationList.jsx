import React from 'react';
import '../css/ReservationList.css';

const ReservationList = ({ reservations, selectedDate, onSelectReservation }) => {
  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  const filteredReservations = reservations.filter(res => {
    const sel = new Date(selectedDate);
    const inDate = new Date(res.checkIn);
    const outDate = new Date(res.checkOut);
    const selStr = sel.toDateString();
    const inStr = inDate.toDateString();
    const outStr = outDate.toDateString();

    if (inStr === outStr) return selStr === inStr;
    return sel >= inDate && sel < outDate;
  });

  return (
    <div className="reservation-summary-box">
      <h3>{selectedDate.toLocaleDateString('ko-KR')} 예약 리스트</h3>
      <div className="reservation-list-scroll">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res, index) => (
            <div
              key={index}
              className="reservation-entry"
              onClick={() => onSelectReservation(res)}
            >
              <span className="room-badge">{res.roomName}</span>
              <div>
                체크인: {res.checkIn}<br />
                체크아웃: {res.checkOut}<br />
                {res.guestName}님
              </div>
            </div>
          ))
        ) : (
          <p className="no-reservations">예약 없음</p>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
