import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/SeasonPeriod.css';

const SeasonPeriod = () => {
  const [seasonPeriods, setSeasonPeriods] = useState([]);
  const [newPeriod, setNewPeriod] = useState({ start: null, end: null, type: '', customType: '' });
  const [activeType, setActiveType] = useState('전체');
  const [activeMonth, setActiveMonth] = useState(null);

  const typeOptions = ['성수기', '주말', '공휴일', '연휴', '직접입력', '주말 자동 등록'];
  const typeFilterOptions = ['전체', '주말', '공휴일', '성수기'];

  const getFinalType = () => newPeriod.type === '직접입력' ? newPeriod.customType.trim() : newPeriod.type;

  const handleAddPeriod = () => {
    const finalType = getFinalType();
    if (!newPeriod.start || !newPeriod.end || !finalType) {
      alert('시작일, 종료일, 기간 유형을 모두 입력해주세요.');
      return;
    }

    // 주말 자동 등록인 경우: 시작~종료 사이 주말 자동 계산
    if (finalType === '주말 자동 등록') {
      const weekends = [];
      const current = new Date(newPeriod.start);
      const end = new Date(newPeriod.end);

      while (current <= end) {
        const day = current.getDay();
        if (day === 0 || day === 6) {
          weekends.push({ start: new Date(current), end: new Date(current), type: '주말' });
        }
        current.setDate(current.getDate() + 1);
      }
      setSeasonPeriods(prev => [...prev, ...weekends]);
    } else {
      // 일반 등록
      setSeasonPeriods([...seasonPeriods, {
        start: newPeriod.start,
        end: newPeriod.end,
        type: finalType,
      }]);
    }

    setNewPeriod({ start: null, end: null, type: '', customType: '' });
  };

  const handleDelete = (index) => {
    const updated = [...seasonPeriods];
    updated.splice(index, 1);
    setSeasonPeriods(updated);
  };

  const handleSave = () => {
    console.log('저장할 데이터:', seasonPeriods);
    alert('기간이 저장되었습니다!');
  };

  const filteredPeriods = seasonPeriods.filter(period => {
    if (activeType !== '전체' && period.type !== activeType) return false;
    if (activeType === '주말' && activeMonth !== null) {
      const month = new Date(period.start).getMonth() + 1;
      return month === activeMonth;
    }
    return true;
  });

  return (
    <div className="season-period-page full-width">
      <h2>성수기 / 주말 기간 관리</h2>

      {/* 조건 입력 영역: 한 줄 정렬 */}
      <div className="condition-filter single-row">
        <label>기간 유형</label>
        <select
          value={newPeriod.type}
          onChange={(e) => setNewPeriod({ ...newPeriod, type: e.target.value })}>
          <option value="">-- 선택 --</option>
          {typeOptions.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        {newPeriod.type === '직접입력' && (
          <input
            type="text"
            value={newPeriod.customType}
            onChange={(e) => setNewPeriod({ ...newPeriod, customType: e.target.value })}
            placeholder="직접 입력"
          />
        )}

        <label>시작일</label>
        <DatePicker
          selected={newPeriod.start}
          onChange={(date) => setNewPeriod({ ...newPeriod, start: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="시작일"
          className="datepicker"
          filterDate={newPeriod.type === '주말 자동 등록' ? (date => [0, 6].includes(date.getDay())) : undefined}
        />

        <label>종료일</label>
        <DatePicker
          selected={newPeriod.end}
          onChange={(date) => setNewPeriod({ ...newPeriod, end: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="종료일"
          className="datepicker"
          minDate={newPeriod.start}
          filterDate={newPeriod.type === '주말 자동 등록' ? (date => [0, 6].includes(date.getDay())) : undefined}
        />

        <button className="add-btn" onClick={handleAddPeriod}>추가</button>
      </div>

      {/* 타입 필터 */}
      <div className="type-filter-bar">
        {typeFilterOptions.map(type => (
          <button
            key={type}
            className={activeType === type ? 'active' : ''}
            onClick={() => {
              setActiveType(type);
              setActiveMonth(null);
            }}>{type}</button>
        ))}
      </div>

      {/* 월 필터 */}
      {activeType === '주말' && (
        <div className="month-filter-bar">
          {[...Array(12)].map((_, i) => (
            <button
              key={i + 1}
              className={activeMonth === i + 1 ? 'active' : ''}
              onClick={() => setActiveMonth(i + 1)}>{i + 1}월</button>
          ))}
        </div>
      )}

      {/* 테이블 */}
      <table className="period-table">
        <thead>
          <tr>
            <th>시작일</th>
            <th>종료일</th>
            <th>유형</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeriods.map((period, idx) => (
            <tr key={idx}>
              <td>{period.start?.toLocaleDateString()}</td>
              <td>{period.end?.toLocaleDateString()}</td>
              <td>{period.type}</td>
              <td><button className="delete-btn" onClick={() => handleDelete(idx)}>삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {seasonPeriods.length > 0 && (
        <div className="save-section">
          <button className="save-btn" onClick={handleSave}>저장</button>
        </div>
      )}
    </div>
  );
};

export default SeasonPeriod;
