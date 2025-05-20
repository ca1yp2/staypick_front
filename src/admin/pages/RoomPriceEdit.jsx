import React, { useState, useEffect } from 'react';
import roomRates from '../../../public/admin/data/room-rate.json';
import '../css/RoomPriceEdit.css';

const RoomPriceEdit = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingPrice, setEditingPrice] = useState({});
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [roomList, setRoomList] = useState(roomRates);


  const handleSelect = (room) => {
    setSelectedRoom(room);
    setEditingPrice({
      basePrice: room.basePrice,
      weekendPrice: room.weekendPrice,
      peakPrice: room.peakPrice,
      holidayPrice: room.holidayPrice
    });
  };

  const handleChange = (key, value) => {
    setEditingPrice(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleBaseChange = (value) => {
    const base = Number(value);
    setEditingPrice({
      basePrice: base,
      weekendPrice: Math.round(base * 1.1),
      peakPrice: Math.round(base * 1.3),
      holidayPrice: Math.round(base * 1.2)
    });
  };

  const handleSave = () => {
  const updated = roomList.map(room =>
    room.roomId === selectedRoom.roomId
      ? { ...room, ...editingPrice }
      : room
  );
  setRoomList(updated);
  alert(`${selectedRoom.roomName} 요금이 저장되었습니다.`);
  setSelectedRoom(null);
};

  const roomTypes = ['전체', '스탠다드', '디럭스', '프리미엄', '패밀리'];

  const filteredRooms = roomList.filter(room => {
    const matchKeyword = room.roomName.includes(keyword);
    const matchType =
      typeFilter === '전체' || room.roomName.includes(typeFilter);
    return matchKeyword && matchType;
  });

  return (
    <div className="room-rate-page">
      <h2>객실 기본 요금 수정</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="객실명 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {roomTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="room-rate-container">
        <div className="room-rate-table">
          <table>
            <thead>
              <tr>
                <th>객실명</th>
                <th>기본요금</th>
                <th>주말</th>
                <th>성수기</th>
                <th>연휴</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => (
                <tr key={room.roomId}>
                  <td>{room.roomName}</td>
                  <td>{room.basePrice.toLocaleString()}원</td>
                  <td>{room.weekendPrice.toLocaleString()}원</td>
                  <td>{room.peakPrice.toLocaleString()}원</td>
                  <td>{room.holidayPrice.toLocaleString()}원</td>
                  <td><button onClick={() => handleSelect(room)}>수정</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRoom && (
          <div className="edit-panel">
            <h3>{selectedRoom.roomName} 요금 수정</h3>
            <div className="edit-row">
              <label>기본 요금</label>
              <input type="number" value={editingPrice.basePrice} onChange={(e) => handleBaseChange(e.target.value)} />
            </div>
            <div className="edit-row">
              <label>주말 요금</label>
              <input type="number" value={editingPrice.weekendPrice} onChange={(e) => handleChange('weekendPrice', e.target.value)} />
            </div>
            <div className="edit-row">
              <label>성수기 요금</label>
              <input type="number" value={editingPrice.peakPrice} onChange={(e) => handleChange('peakPrice', e.target.value)} />
            </div>
            <div className="edit-row">
              <label>연휴 요금</label>
              <input type="number" value={editingPrice.holidayPrice} onChange={(e) => handleChange('holidayPrice', e.target.value)} />
            </div>
            <div className="edit-actions">
              <button onClick={handleSave}>저장</button>
              <button onClick={() => setSelectedRoom(null)}>취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPriceEdit;
