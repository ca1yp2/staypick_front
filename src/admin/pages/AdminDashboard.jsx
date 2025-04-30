import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import '../css/AdminDashboard.css';

Modal.setAppElement('#root');

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/admin/data/reservation.json')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error('예약 데이터 로딩 실패:', err));
  }, []);

  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  const filteredReservations = reservations.filter(
    res => res.checkInDate === selectedDateStr || res.checkOutDate === selectedDateStr
  );

  const hasReservation = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.some(res => res.checkInDate === dateStr || res.checkOutDate === dateStr);
  };

  const todayCheckIn = reservations.filter(res => res.checkInDate === selectedDateStr).length;
  const todayCheckOut = reservations.filter(res => res.checkOutDate === selectedDateStr).length;

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="admin-main">
        <AdminSidebar />
        <div className="admin-content-row">

          {/* 왼쪽 - 달력 + 하단 버튼 */}
          <div className="calendar-wrapper">
            <div className="calendar-section">
              <Calendar 
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={({ date, view }) => 
                  view === 'month' && hasReservation(date) ? (
                    <div className="dot"></div>
                  ) : null
                }
              />
            </div>
            <div className="calendar-lower-box">
              <div className="calendar-summary-text">
                ✔ 체크인 예정: {todayCheckIn}명 / 체크아웃 예정: {todayCheckOut}명
              </div>
              <div className="calendar-actions">
                <button onClick={() => navigate('/admin/close-open')}>예약 닫기/열기</button>
                <button onClick={() => navigate('/admin/discount')}>할인 설정</button>
              </div>
            </div>
          </div>

          {/* 오른쪽 - 예약 리스트 */}
          <div className="reservation-summary-box">
            <h3>{selectedDate.toLocaleDateString('ko-KR')} 예약 리스트</h3>
            <div className="reservation-list-scroll">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res, index) => (
                  <div
                    key={index}
                    className="reservation-entry"
                    onClick={() => setSelectedReservation(res)}
                  >
                    <span className="room-badge">{res.roomName}</span>  
                    <div>
                      체크인: {res.checkInDate}<br />
                      체크아웃: {res.checkOutDate}<br />
                      {res.guestName}님
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-reservations">예약 없음</p>
              )}
            </div>
          </div>

          {/* 예약 상세 모달 */}
          <Modal
            isOpen={!!selectedReservation}
            onRequestClose={() => setSelectedReservation(null)}
            className="reservation-modal"
            overlayClassName="reservation-modal-overlay"
          >
            {selectedReservation && (
              <div>
                <h2>예약 상세 정보</h2>
                <p><strong>객실명:</strong> {selectedReservation.roomName}</p>
                <p><strong>예약자:</strong> {selectedReservation.guestName}님</p>
                <p><strong>체크인:</strong> {selectedReservation.checkInDate}</p>
                <p><strong>체크아웃:</strong> {selectedReservation.checkOutDate}</p>
                <button onClick={() => setSelectedReservation(null)}>닫기</button>
              </div>
            )}
          </Modal>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
