import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowLeftLine, RiStarFill } from 'react-icons/ri';
import '../css/components/ReviewDetail.css';
import axios from 'axios';

const ReviewDetail = () => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('recent');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('/data/reviews.json')
      .then(res => {
        const matchedReviews = res.data.filter(item => String(item.hotelId) === String(id));
        setReviews(matchedReviews || []);
      })
      .catch(err => console.error('리뷰 로딩 실패', err));
  }, [id]);

  return (
    <div className="review-detail-container">
      <header className="review-detail-header">
        <div className="review-detail-header-inner">
          <div className="review-detail-logo">STAYPICK</div>
        </div>
      </header>

      <main className="review-detail-main">
        <div className="review-detail-top">
          <h1 className="review-detail-title">리뷰 전체보기</h1>
          <div className="review-detail-meta">총 <strong>{reviews.length}</strong>개</div>
        </div>

        <div className="review-detail-filter">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">최신순</option>
            <option value="photo">사진후기만</option>
          </select>
        </div>

        <div className="review-detail-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-detail-box">
              <div className="review-detail-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <RiStarFill key={i} className="review-detail-star-icon" />
                ))}
              </div>
              <div className="review-detail-date">{review.date}</div>
              <div className="review-detail-text">{review.content}</div>
            </div>
          ))}
        </div>

        <button className="review-detail-back-link" onClick={() => navigate(-1)}>
          <RiArrowLeftLine className="review-detail-arrow-icon" /> 돌아가기
        </button>
      </main>
    </div>
  );
};

export default ReviewDetail;
