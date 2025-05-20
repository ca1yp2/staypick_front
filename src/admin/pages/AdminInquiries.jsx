import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminInquiries.css';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInquiries, resHotels] = await Promise.all([
          axios.get('/data/inquiry.json'),
          axios.get('/data/hotels.json'),
        ]);
        setInquiries(resInquiries.data);
        setHotels(resHotels.data);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };
    fetchData();
  }, []);

  const getHotelName = (id) => hotels.find(h => h.id === id)?.name || '-';

  const handleReplySubmit = () => {
    const updated = inquiries.map((inq) =>
      inq.id === selected.id
        ? { ...inq, status: 'completed', comment: reply }
        : inq
    );
    setInquiries(updated);
    setSelected(null);
    setReply('');
  };

  const filteredSortedInquiries = inquiries
    .filter(inq =>
      (statusFilter === '전체' || inq.status === statusFilter) &&
      (typeFilter === '전체' || inq.type === typeFilter)
    )
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
    });

  return (
    <div className="admin-inquiry-page">
      <h2>문의 관리</h2>

      <div className="inquiry-filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="전체">전체 상태</option>
          <option value="processing">처리 중</option>
          <option value="completed">답변 완료</option>
        </select>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="전체">전체 종류</option>
          <option value="가격">가격</option>
          <option value="객실">객실</option>
          <option value="시설">시설</option>
          <option value="기타">기타</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>

      <div className="inquiry-layout">
        <div className="inquiry-table-wrapper">
          <table className="inquiry-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자</th>
                <th>숙소</th>
                <th>제목</th>
                <th>상태</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {filteredSortedInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>{inq.id}</td>
                  <td>{inq.userId}</td>
                  <td>{getHotelName(inq.hotelId)}</td>
                  <td>{inq.title}</td>
                  <td>
                    {inq.status === 'processing' ? (
                      <span className="status processing">처리 중</span>
                    ) : (
                      <span className="status completed">답변 완료</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => {
                      setSelected(inq);
                      setReply(inq.comment || '');
                    }}>
                     답변/상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="inquiry-panel">
            <h3>문의 상세</h3>
            <p><strong>유저 ID:</strong> {selected.userId}</p>
            <p><strong>숙소명:</strong> {getHotelName(selected.hotelId)}</p>
            <p><strong>문의 종류:</strong> {selected.type}</p>
            <p><strong>제목:</strong> {selected.title}</p>
            <p><strong>내용:</strong> {selected.content}</p>
            <p><strong>작성일자:</strong> {selected.date}</p>

            <textarea
              rows={12}
              placeholder="답변 내용을 입력하세요"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="reply-actions">
              <button onClick={handleReplySubmit}>답변 저장</button>
              <button onClick={() => setSelected(null)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;