import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import '../css/components/ReviewWrite.css';

const ReviewWrite = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReservations = await axios.get('/data/reservation.json');
        const resHotels = await axios.get('/data/hotels.json');
        const resRooms = await axios.get('/data/rooms.json');

        const targetReservation = resReservations.data.find(r => r.id === parseInt(reservationId));
        const targetHotel = resHotels.data.find(h => h.id === targetReservation.hotelId);
        const targetRoom = resRooms.data.find(r => r.id === targetReservation.roomId);

        setReservation(targetReservation);
        setHotel(targetHotel);
        setRoom(targetRoom);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
      }
    };
    fetchData();
  }, [reservationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !content.trim()) {
      alert('별점과 리뷰 내용을 모두 입력해주세요.');
      return;
    }
    console.log('리뷰 작성됨:', { reservationId, rating, content });
    alert('리뷰가 등록되었습니다.');
    navigate('/mypage');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews);
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  if (!reservation || !hotel || !room) return <div className="review-write-page">로딩 중...</div>;

  return (
    <div className="review-write-page">
      <h2>리뷰 작성</h2>
      <div className="reservation-info-box">
        <h3>{hotel.name}</h3>
        <p>{hotel.location} | {room.name}</p>
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
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <span className="file-count">파일 {images.length}개</span>
        </div>

        {images.length > 0 && (
          <div className="image-preview-container">
            {images.map((img, idx) => (
              <div key={idx} className="image-preview-box">
                <img
                  src={img.url}
                  alt={`preview-${idx}`}
                  className="preview-img"
                />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => handleRemoveImage(idx)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default ReviewWrite;
