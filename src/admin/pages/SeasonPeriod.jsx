import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/SeasonPeriod.css';

const SeasonPeriod = () => {
  const [seasonPeriods, setSeasonPeriods] = useState([]);
  const [newPeriod, setNewPeriod] = useState({
    start: null,
    end: null,
    type: '',
    customType: '',
  });

  const [weekendRange, setWeekendRange] = useState({
    start: null,
    end: null,
  });

  const typeOptions = ['성수기', '주말', '공휴일', '연휴', '직접입력'];

  const getFinalType = () =>
    newPeriod.type === '직접입력' ? newPeriod.customType.trim() : newPeriod.type;

  const handleAddPeriod = () => {
    const finalType = getFinalType();
    if (!newPeriod.start || !newPeriod.end || !finalType) {
      alert('시작일, 종료일, 기간 유형을 모두 입력해주세요.');
      return;
    }
    setSeasonPeriods([
      ...seasonPeriods,
      { start: newPeriod.start, end: newPeriod.end, type: finalType },
    ]);
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

  const handleAutoWeekend = () => {
    if (!weekendRange.start || !weekendRange.end) {
      alert('주말 등록 범위를 지정해주세요.');
      return;
    }

    const weekends = [];
    const current = new Date(weekendRange.start);
    const end = new Date(weekendRange.end);

    while (current <= end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekends.push({
          start: new Date(current),
          end: new Date(current),
          type: '주말',
        });
      }
      current.setDate(current.getDate() + 1);
    }

    setSeasonPeriods([...seasonPeriods, ...weekends]);
  };

  return (
    <div className="season-period-page">
      <h2>성수기 / 주말 기간 관리</h2>

      <div className="period-form">
        <label>시작일</label>
        <DatePicker
          selected={newPeriod.start}
          onChange={(date) => setNewPeriod({ ...newPeriod, start: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="시작일 선택"
        />

        <label>종료일</label>
        <DatePicker
          selected={newPeriod.end}
          onChange={(date) => setNewPeriod({ ...newPeriod, end: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="종료일 선택"
          minDate={newPeriod.start}
        />

        <label>기간 유형</label>
        <select
          value={newPeriod.type}
          onChange={(e) => setNewPeriod({ ...newPeriod, type: e.target.value })}
        >
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
            placeholder="직접 입력 (예: 황금연휴)"
          />
        )}

        <button className="add-btn" onClick={handleAddPeriod}>추가</button>
      </div>

      <div className="auto-weekend-box">
        <h4>🌀 주말 자동 등록</h4>
        <DatePicker
          selected={weekendRange.start}
          onChange={(date) => setWeekendRange({ ...weekendRange, start: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="시작일"
        />
        <DatePicker
          selected={weekendRange.end}
          onChange={(date) => setWeekendRange({ ...weekendRange, end: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="종료일"
          minDate={weekendRange.start}
        />
        <button className="weekend-btn" onClick={handleAutoWeekend}>주말 자동 추가</button>
      </div>

      <div className="period-list">
        {seasonPeriods.map((period, idx) => (
          <div key={idx} className="period-item">
            <span>{period.start?.toLocaleDateString()} ~ {period.end?.toLocaleDateString()}</span>
            <span className="type">{period.type}</span>
            <button className="delete-btn" onClick={() => handleDelete(idx)}>삭제</button>
          </div>
        ))}
      </div>

      {seasonPeriods.length > 0 && (
        <div className="save-section">
          <button className="save-btn" onClick={handleSave}>저장</button>
        </div>
      )}
    </div>
  );
};

export default SeasonPeriod;
