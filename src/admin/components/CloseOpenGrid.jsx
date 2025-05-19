import React from 'react';
import '../css/CloseOpenGrid.css';

const CloseOpenGrid = ({ statuses, closedDates, setClosedDates, startDate, endDate, selectedCategory }) => {


   const rooms = [...new Set((statuses || []).map(e => e.roomName))];

  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const until = new Date(end);
    while (current <= until) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };
  const dateList = getDateRange(startDate, endDate);

  const getCellStatus = (room, date) => {
    const entry = statuses.find(s => s.roomName === room && s.date === date);
    if (!entry) return '운영중';

    // 닫힘 상태가 우선
    const isClosed = closedDates.find(c => c.room === room && c.date === date);
    if (isClosed) return '운영중단';

    return entry.status; // '예약 가능' | '예약됨' | '체크인 완료'
  };

  const toggleClose = (room, date) => {
    const status = getCellStatus(room, date);
    if (status === '예약됨' || status === '체크인 완료') return;

    const exists = closedDates.find(c => c.room === room && c.date === date);
    if (exists) {
      setClosedDates(closedDates.filter(c => !(c.room === room && c.date === date)));
    } else {
      setClosedDates([...closedDates, { room, date }]);
    }
  };

  const getDisplayText = (status) => {
    switch (status) {
      case '예약 가능':
        return '운영중';
      case '운영중단':
        return '닫힘';
      case '예약됨':
        return '예약됨';
      case '체크인 완료':
        return '체크인';
      default:
        return status;
    }
  };

  return (
    <div className="grid-wrapper">
      <table className="closeopen-grid">
        <thead>
          <tr>
            <th>객실명</th>
            {dateList.map(date => (
              <th key={date}>{date.slice(5)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room}>
              <td className="room-name">{room}</td>
              {dateList.map(date => {
                const status = getCellStatus(room, date);
                return (
                  <td
                    key={date}
                    className={`cell ${status.replace(/\s/g, '-').toLowerCase()}`}
                    onClick={() => toggleClose(room, date)}
                    title={status}
                  >
                    {getDisplayText(status)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CloseOpenGrid;
