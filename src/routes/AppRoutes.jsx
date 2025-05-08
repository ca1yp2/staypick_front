import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import HotelList from '../pages/HotelList';
import LocationCheck from '../pages/LocationCheck';
import Payment from '../pages/Payment';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyPage from '../pages/MyPage';
import Board from '../pages/Board';
import ReviewDetail from '../components/ReviewDetail';
import ReviewWrite from '../components/ReviewWrite';
import { TossCheckout } from '../components/TossCheckout'
 import { TossSuccess } from '../components/TossSuccess'
 import { TossFail } from '../components/TossFail'
import AdminLogin from '../admin/pages/AdminLogin';
import AdminDashboard from '../admin/pages/AdminDashboard';
import DiscountSettings from '../admin/pages/DiscountSettings';
import InquiryManagement from '../admin/pages/InquiryManagement';
import ReservationToggle from '../admin/pages/ReservationToggle';
import ReviewManagement from '../admin/pages/ReviewManagement';
import RoomPriceEdit from '../admin/pages/RoomPriceEdit';
import SeasonPeriod from '../admin/pages/SeasonPeriod';

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Routes>
      {isAdminPage ? (
        // 관리자 페이지 전용 경로
        <>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
     
            <Route path="/admin/reviews" element={<ReviewManagement />} />
            <Route path="/admin/close-open" element={<ReservationToggle />} />
            <Route path="/admin/discount" element={<DiscountSettings />} />
            <Route path="/admin/inquiries" element={<InquiryManagement />} />
            <Route path="/admin/price" element={<RoomPriceEdit />} />
            <Route path="/admin/season" element={<SeasonPeriod />} />
            <Route path="*" element={<Navigate to="/admin/login" />} />
        </>
      ) : (
        // 유저 페이지 전용 경로
        <>
          <Route path="/payment" element={<Payment />} />
          <Route path='/tosscheckout' element={<TossCheckout />} />
          <Route path='/tosssuccess' element={<TossSuccess />} />
          <Route path='/tossfail' element={<TossFail />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/hotellist" element={<HotelList />} />
            <Route path="/locationcheck" element={<LocationCheck />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/reviewdetail/:id" element={<ReviewDetail />} />
            <Route path="/review/write/:reservationId" element={<ReviewWrite />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
