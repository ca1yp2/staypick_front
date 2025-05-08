import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ReviewPreview.css';

const ReviewPreview = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/admin/data/reviews.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('리뷰 로딩 실패:', err));
  }, []);



  return (
    <div className="review-preview-box">
      {reviews.length > 0 ? (
        reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-date">{review.date} • {review.guestName} / {review.roomName}</div>
            <div className="review-content">{review.content}</div>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
      <button className="review-more-button" onClick={() => navigate('/admin/reviews')}>
        전체 리뷰 보기
      </button>
    </div>
  );
};

export default ReviewPreview;
