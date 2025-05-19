import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/ReservationCalendar.css';
import CustomToolbar from './CustomToolbar';

moment.locale('ko');
const localizer = momentLocalizer(moment);

//이벤트 텍스트 표시용
const MyEvent = ({ event }) => <span>{event.title}</span>;

const ReservationCalendar = ({ reservations, selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getOnlyDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = getOnlyDate(new Date());

  // 이벤트 스타일 강제 중앙정렬
  const eventStyleGetter = () => {
    return {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4e3c1',
        color: '#5d4632',
        fontSize: '13px',
        fontWeight: '500',
        padding: '2px 6px',
        borderRadius: '6px',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
      },
    };
  };

  // 체크아웃 날짜 기준 이벤트 생성
  const createEvents = () => {
    const grouped = {};

    reservations.forEach((res) => {
      const raw = res?.checkOut;
      if (!raw || !moment(raw, 'YYYY-MM-DD', true).isValid()) return;

      const key = moment(raw, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(res);
    });

      return Object.entries(grouped).map(([dateKey, resList], index) => {
        const date = moment(dateKey, 'YYYY-MM-DD').toDate();
        const fullRoomName = String(resList[0]?.roomName || '객실');
        const roomOnly = fullRoomName.split(' ')[0]; // "504호 (프리미엄 더블)" → "504호"
        const count = resList.length;
        const title = count > 1 ? `${roomOnly} 외 ${count - 1}건` : roomOnly;

        return {
          id: index,
          title,
          start: date,
          end: date,
          allDay: true,
          resource: resList,
        };
      });

  };

  const events = createEvents();
  console.log('생성된 이벤트:', events);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-section">
        <Calendar
          localizer={localizer}
          events={events}
          views={['month']}
          defaultView="month"
          date={currentDate}
          onNavigate={(newDate) => {
            setCurrentDate(newDate);
            onSelectDate?.(newDate);
          }}
          onSelectEvent={(event) => onSelectDate?.(new Date(event.start))}
          onSelectSlot={(slotInfo) => onSelectDate?.(new Date(slotInfo.start))}
          selectable
          startAccessor="start"
          endAccessor="end"
          style={{ height: '520px' }}
          components={{
            toolbar: CustomToolbar,
            event: MyEvent,
          }}
          eventPropGetter={eventStyleGetter} // 핵심 부분
          messages={{
            showMore: () => '',
          }}
          dayPropGetter={(date) => {
            const isToday =
              today.toDateString() === new Date(date).toDateString();
            const isSelected =
              new Date(selectedDate).toDateString() === new Date(date).toDateString();
            return {
              style: {
                backgroundColor: isSelected
                  ? '#d0ebff'
                  : isToday
                  ? '#fef9e7'
                  : 'transparent',
                border: '1px solid #eee',
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default ReservationCalendar;
