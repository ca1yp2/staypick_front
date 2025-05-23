import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import '../css/components/ReviewWrite.css';

const ReviewWrite = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // ✅ 실제 파일
  const [previewUrl, setPreviewUrl] = useState(null);     // ✅ 미리보기용 URL

  // ✅ 예약 정보 백엔드에서 불러오기
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8081/api/reservations/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReservation(res.data);
      } catch (err) {
        console.error('예약 정보 로딩 실패:', err);
      }
    };
    fetchReservation();
  }, [reservationId]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!rating || !content.trim()) {
    alert('별점과 리뷰 내용을 모두 입력해주세요.');
    return;
  }

  const token = localStorage.getItem('token');
  let imageUrl = null;

  try {
    // 1️⃣ 선택된 파일이 있다면 먼저 업로드
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await axios.post('http://localhost:8081/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      imageUrl = uploadRes.data.imageUrl; // 예: "/uploads/review_abc123.jpg"
    }

    // 2️⃣ 리뷰 등록
    const reviewData = {
      reservationId: Number(reservationId),
      rating,
      content,
      imageUrl
    };

    await axios.post('http://localhost:8081/api/reviews', reviewData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('✅ 리뷰가 등록되었습니다.');
    navigate('/mypage/reviews');
  } catch (error) {
    console.error('❌ 리뷰 등록 실패:', error);
    alert('리뷰 등록 중 오류가 발생했습니다.');
  }
};

  // ✅ 파일 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  if (!reservation) return <div className="review-write-page">로딩 중...</div>;

  return (
    <div className="review-write-page">
      <h2>리뷰 작성</h2>
      <div className="reservation-info-box">
        <h3>{reservation.accommodationName}</h3>
        <p>객실명: {reservation.roomName}</p>
        <p>체크인: {reservation.checkIn} / 체크아웃: {reservation.checkOut}</p>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <label>
          별점:
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`star ${value <= rating ? 'active' : ''}`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </label>

        <label>
          리뷰 내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="숙소 이용 후기를 작성해주세요"
          />
        </label>

        <div className="image-upload-wrapper">
          <label htmlFor="file-upload" className="custom-file-label">
            사진 첨부
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <span className="file-count">{selectedFile ? '파일 1개' : '파일 없음'}</span>
        </div>

        {previewUrl && (
          <div className="image-preview-container">
            <div className="image-preview-box">
              <img src={previewUrl} alt="preview" className="preview-img" />
              <button type="button" className="remove-img-btn" onClick={handleRemoveImage}>
                ✕
              </button>
            </div>
          </div>
        )}

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default ReviewWrite;
