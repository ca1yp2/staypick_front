import React, { useState } from 'react';
import roomStatus from '../../../public/admin/data/room-status.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/AdminCloseOpen.css';
import CloseOpenGrid from '../components/CloseOpenGrid';

const getFormattedDate = (date) => date.toISOString().split('T')[0];

const getWeekRange = (base) => {
  const monday = new Date(base);
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  return {
    start: getFormattedDate(monday),
    end: getFormattedDate(sunday),
  };
};

const AdminCloseOpen = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [openRooms, setOpenRooms] = useState({});
  const [closedDates, setClosedDates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [roomSearch, setRoomSearch] = useState('');

  const { start, end } = getWeekRange(baseDate);

  const roomTypes = ['전체', ...new Set(roomStatus.map(entry => entry.roomType))];

  const filteredStatuses = roomStatus.filter((entry) => {
    const d = new Date(entry.date);
    const inRange = d >= new Date(start) && d <= new Date(end);
    const inCategory = selectedCategory === '전체' || entry.roomType === selectedCategory;
    const inSearch = roomSearch === '' || entry.roomName.includes(roomSearch);
    return inRange && inCategory && inSearch;
  });

  const groupedByRoom = {};
  filteredStatuses.forEach((entry) => {
    if (!groupedByRoom[entry.roomName]) groupedByRoom[entry.roomName] = [];
    groupedByRoom[entry.roomName].push(entry);
  });

  const toggleRoom = (room) => {
    setOpenRooms((prev) => ({
      ...prev,
      [room]: !prev[room],
    }));
  };

  return (
    <div className="closeopen-page">
      <div className="panel-box">
        <div className="panel-header">
          <div className="panel-title">객실 상태 관리</div>
          <div className="panel-meta">{start} ~ {end}</div>
        </div>

        <div className="panel-filterbar">
          <div className="panel-controls">
            <button onClick={() => setBaseDate(new Date(baseDate.setDate(baseDate.getDate() - 7)))}>← 지난주</button>
            <button onClick={() => setBaseDate(new Date())}>이번 주</button>
            <button onClick={() => setBaseDate(new Date(baseDate.setDate(baseDate.getDate() + 7)))}>다음주 →</button>
            <DatePicker
              selected={baseDate}
              onChange={setBaseDate}
              dateFormat="yyyy-MM-dd"
              className="calendar-input"
            />
          </div>

          <div className="category-tabs">
            {roomTypes.map((type) => (
              <button
                key={type}
                className={`category-btn ${selectedCategory === type ? 'active' : ''}`}
                onClick={() => setSelectedCategory(type)}
                type="button"
              >
                {type}
              </button>
            ))}
            <input
              type="text"
              placeholder="객실명 검색 (예: 101호)"
              className="room-search-input"
              value={roomSearch}
              onChange={(e) => setRoomSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="reservation-grid">
        {Object.entries(groupedByRoom).map(([room, list]) => (
          <div key={room} className="room-section">
            <div className="room-header">
              <button
                type="button"
                className="room-toggle-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleRoom(room);
                }}
              >
                <strong>{room}</strong>
                <span>{openRooms[room] ? '접기 ▲' : '펼치기 ▼'}</span>
              </button>
            </div>
            {openRooms[room] && (
              <CloseOpenGrid
                statuses={list}
                startDate={start}
                endDate={end}
                closedDates={closedDates}
                setClosedDates={setClosedDates}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCloseOpen;
