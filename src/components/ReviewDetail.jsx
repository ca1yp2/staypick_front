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
        const match = res.data.find(item => String(item.hotelId) === String(id));
        setReviews(match?.reviews || []);
      })
      .catch(err => console.error('리뷰 로딩 실패', err));
  }, [id]);

  return (
    <div className="review-detail-container">
      <header className="review-header">
        <div className="review-header-inner">
          <div className="review-logo">STAYPICK</div>
        </div>
      </header>

      <main className="review-main">
        <div className="review-top">
          <h1 className="review-title">리뷰 전체보기</h1>
          <div className="review-meta">총 <strong>{reviews.length}</strong>개</div>
        </div>

        <div className="review-filter">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">최신순</option>
            <option value="photo">사진후기만</option>
          </select>
        </div>

        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-box">
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <RiStarFill key={i} className="star-icon" />
                ))}
              </div>
              <div className="review-date">{review.date}</div>
              <div className="review-text">{review.text}</div>
            </div>
          ))}
        </div>

        <button className="back-link" onClick={() => navigate(-1)}>
          <RiArrowLeftLine className="arrow-icon" /> 돌아가기
        </button>
      </main>
    </div>
  );
};

export default ReviewDetail;
