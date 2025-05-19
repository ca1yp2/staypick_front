import React, { useEffect, useState } from 'react';
import ReservationDetailPanel from '../components/ReservationDetailPanel.jsx';
import '../css/AdminReservation.css';

const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('전체');
  const [searchRoom, setSearchRoom] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 12;

  useEffect(() => {
    fetch('/admin/data/reservation.json')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error('예약 데이터 로딩 실패:', err));
  }, []);

  const filteredReservations = reservations.filter(res => {
    const matchKeyword =
      searchRoom === '' ||
      res.roomName.includes(searchRoom) ||
      res.guestName.includes(searchRoom);
    const matchStatus = filterStatus === '전체' || res.status === filterStatus;
    const checkIn = new Date(res.checkIn);
    const inRange =
      (!startDate || new Date(startDate) <= checkIn) &&
      (!endDate || new Date(endDate) >= checkIn);
    return matchKeyword && matchStatus && inRange;
  });

  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );

  // ✅ 취소 상태 업데이트
  const handleCancelReservation = (id) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === id ? { ...res, status: '취소됨' } : res
      )
    );

    // 선택된 예약도 상태 업데이트
    if (selectedReservation?.id === id) {
      setSelectedReservation(prev => ({
        ...prev,
        status: '취소됨'
      }));
    }
  };

  // ✅ 페이지 범위 계산
  const getPaginationRange = () => {
    const range = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) range.push(i);
      }
    }
    return range;
  };

  return (
    <div className="admin-page">
      <div className="reservation-wrapper">
        <div className="reservation-left">
          <div className="reservation-search-bar">
            <input
              type="text"
              placeholder="예약자, 객실명 검색"
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={() => {}}>검색</button>
          </div>

          <div className="reservation-status-filter">
            {['전체', '예약확정', '취소됨', '체크인완료'].map(status => (
              <button
                key={status}
                className={filterStatus === status ? 'active' : ''}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <table className="reservation-table">
            <thead>
              <tr>
                <th>예약자</th>
                <th>객실명</th>
                <th>체크인</th>
                <th>체크아웃</th>
                <th>인원</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReservations.map((res, idx) => (
                <tr key={idx} onClick={() => setSelectedReservation(res)}>
                  <td>{res.guestName}</td>
                  <td>{res.roomName}</td>
                  <td>{res.checkIn}</td>
                  <td>{res.checkOut}</td>
                  <td>{res.people}명</td>
                  <td><span className={`status ${res.status}`}>{res.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {getPaginationRange().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="reservation-right">
          <ReservationDetailPanel
            reservation={selectedReservation}
            onCancel={handleCancelReservation}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminReservation;
