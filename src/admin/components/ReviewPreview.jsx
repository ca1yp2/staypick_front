import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ReviewPreview.css';

const ReviewPreview = () => {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/admin/data/reviewSummary.json')
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error('리뷰 요약 로딩 실패:', err));
  }, []);

  return (
    <div className="review-summary-card">
      <div className="review-summary-header">
        <h3>최근 리뷰 요약</h3>
        <button onClick={() => navigate('/admin/reviews')}>전체 리뷰 보기</button>
      </div>
      {summary ? (
        <div className="review-summary-body">
          <div className="summary-row">
            <span className="label">오늘 등록된 리뷰</span>
            <span className="value">{summary.todayReviewCount}건</span>
          </div>
          <div className="summary-row">
            <span className="label">최근 7일 리뷰 수</span>
            <span className="value">{summary.weekReviewCount}건</span>
          </div>
          <div className="summary-row">
            <span className="label">평균 평점</span>
            <span className={`value ${summary.averageRating < 4 ? 'low' : ''}`}>
              {summary.averageRating}점
            </span>
          </div>
          <div className="summary-row">
            <span className="label">4점 이하 리뷰</span>
            <span className="value alert">{summary.lowRatingCount}건</span>
          </div>
        </div>
      ) : (
        <p className="loading">리뷰 데이터를 불러오는 중입니다.</p>
      )}
    </div>
  );
};

export default ReviewPreview;
