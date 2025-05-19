import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ReviewManagement.css';

const ReviewMangement = () => {
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/admin/data/reviews.json');
        const reviewArray = Array.isArray(res.data) ? res.data : res.data.reviews || [];
        setReviews(reviewArray);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="review-page">
      <h2>리뷰 관리</h2>

      <div className="review-layout">
        <div className="review-table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>작성자</th>
                <th>객실</th>
                <th>평점</th>
                <th>내용</th>
                <th>작성일</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>{r.guestName}</td>
                  <td>{r.roomName}</td>
                  <td>{'★'.repeat(r.rating)}</td>
                  <td className="preview">{r.content.slice(0, 20)}...</td>
                  <td>{r.date}</td>
                  <td>
                    <button onClick={() => setSelected(r)}>상세보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="review-panel">
            <h3>리뷰 상세</h3>
            <p><strong>작성자:</strong> {selected.guestName}</p>
            <p><strong>객실:</strong> {selected.roomName}</p>
            <p><strong>평점:</strong> {'★'.repeat(selected.rating)}</p>
            <p><strong>내용:</strong> {selected.content}</p>
            <p><strong>작성일:</strong> {selected.date}</p>
            {selected.image && (
              <img src={selected.image} alt="리뷰 이미지" className="review-image" />
            )}
            <div className="panel-actions">
              <button onClick={() => setSelected(null)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewMangement;
