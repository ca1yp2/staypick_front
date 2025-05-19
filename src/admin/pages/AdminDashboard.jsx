import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReservationCalendar from '../components/ReservationCalendar';
import ReservationList from '../components/ReservationList';
import DashboardStats from '../components/DashboardStats';
import ReviewPreview from '../components/ReviewPreview';
import QuickMenu from '../components/QuickMenu';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('/admin/data/reservation.json')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error('예약 데이터 로딩 실패:', err));
  }, []);


  const today = moment().format('YYYY-MM-DD');
  const selectedMonth = moment(selectedDate).format('YYYY-MM');

  const todayCheckIn = reservations.filter(res =>
    moment(res.checkIn).format('YYYY-MM-DD') === today
  );

  const todayCheckOut = reservations.filter(res =>
    moment(res.checkOut).format('YYYY-MM-DD') === today
  );

  const staying = reservations.filter(res => {
    const checkIn = moment(res.checkIn);
    const checkOut = moment(res.checkOut);
    return moment(today).isBetween(checkIn, checkOut, null, '[)');
  });

  const monthReservations = reservations.filter(res =>
    moment(res.checkIn).format('YYYY-MM') === selectedMonth
  );

  return (
    <div className="admin-dashboard">
  
      <div className="admin-body">
  

        <main className="main-panel">
          <div className="dashboard-grid">
            <div className="left-column">
              <div className="box calendar-box">
                <ReservationCalendar
                  reservations={reservations}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              </div>

              <div className="box stats-box">
                <DashboardStats
                  todayCheckIn={todayCheckIn}
                  todayCheckOut={todayCheckOut}
                  staying={staying}
                  monthReservations={monthReservations}
                />
              </div>

              <div className="box quickmenu-box">
                <QuickMenu />
              </div>
            </div>

            <div className="right-column">
              <div className="box list-box">
                <ReservationList
                  reservations={reservations}
                  selectedDate={selectedDate}
                  onSelectReservation={() => {}}
                />
              </div>

              <div className="box review-box">
                <ReviewPreview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
