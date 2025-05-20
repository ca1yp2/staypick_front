import React, { useState } from 'react';
import roomRates from '../../../public/admin/data/room-rate.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/DiscountSetting.css';

const DiscountSetting = () => {
  const [discounts, setDiscounts] = useState([]);
  const [activeType, setActiveType] = useState('전체');
  const [newDiscount, setNewDiscount] = useState({
    roomId: '',
    method: '%',
    value: '',
    label: '',
    startDate: null,
    endDate: null
  });

  const roomTypes = ['전체', '스탠다드', '디럭스', '프리미엄', '패밀리'];

  const filteredRooms = roomRates.filter(room =>
    activeType === '전체' || room.roomName.includes(activeType)
  );

  const handleAdd = () => {
    const { roomId, method, value, label, startDate, endDate } = newDiscount;
    if (!roomId || !value || !startDate || !endDate) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const isDuplicate = discounts.some(
      d => d.roomId === roomId && d.startDate === startDate && d.endDate === endDate
    );
    if (isDuplicate) {
      alert('이미 해당 객실에 같은 기간의 할인 설정이 있습니다.');
      return;
    }

    const room = roomRates.find(r => r.roomId === Number(roomId));
    setDiscounts([...discounts, {
      ...newDiscount,
      roomName: room.roomName,
      id: Date.now()
    }]);

    setNewDiscount({
      roomId: '', method: '%', value: '', label: '', startDate: null, endDate: null
    });
  };

  const handleDelete = (id) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  const handleSaveAll = () => {
    console.log('전체 저장 내역:', discounts);
    alert('할인 내역이 저장되었습니다.');
  };

  return (
    <div className="discount-setting-page">
      <h2>할인 판매 설정</h2>

      <div className="room-type-filter">
        {roomTypes.map(type => (
          <button
            key={type}
            className={activeType === type ? 'active' : ''}
            onClick={() => setActiveType(type)}>
            {type}
          </button>
        ))}
      </div>

      <div className="discount-form">
        <select
          value={newDiscount.roomId}
          onChange={(e) => setNewDiscount({ ...newDiscount, roomId: e.target.value })}>
          <option value="">객실 선택</option>
          {filteredRooms.map(room => (
            <option key={room.roomId} value={room.roomId}>{room.roomName}</option>
          ))}
        </select>

        <select
          value={newDiscount.method}
          onChange={(e) => setNewDiscount({ ...newDiscount, method: e.target.value })}>
          <option value="%">%</option>
          <option value="₩">₩</option>
        </select>

        <input
          type="number"
          placeholder="할인 값"
          value={newDiscount.value}
          onChange={(e) => setNewDiscount({ ...newDiscount, value: e.target.value })}
        />

        <input
          type="text"
          placeholder="기간 이름"
          value={newDiscount.label}
          onChange={(e) => setNewDiscount({ ...newDiscount, label: e.target.value })}
        />

        <DatePicker
          selected={newDiscount.startDate}
          onChange={(date) => setNewDiscount({ ...newDiscount, startDate: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="시작일"
        />
        <DatePicker
          selected={newDiscount.endDate}
          onChange={(date) => setNewDiscount({ ...newDiscount, endDate: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="종료일"
          minDate={newDiscount.startDate}
        />

        <button onClick={handleAdd}>추가</button>
      </div>

      <table className="discount-table">
        <thead>
          <tr>
            <th>객실명</th>
            <th>할인 방식</th>
            <th>할인 값</th>
            <th>기간 이름</th>
            <th>기간</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((d) => (
            <tr key={d.id}>
              <td>{d.roomName}</td>
              <td>{d.method}</td>
              <td>{d.value}{d.method}</td>
              <td>{d.label}</td>
              <td>{`${d.startDate.toLocaleDateString()} ~ ${d.endDate.toLocaleDateString()}`}</td>
              <td><button onClick={() => handleDelete(d.id)}>삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {discounts.length > 0 && (
        <div className="save-all">
          <button onClick={handleSaveAll}>전체 저장</button>
        </div>
      )}
    </div>
  );
};

export default DiscountSetting;
