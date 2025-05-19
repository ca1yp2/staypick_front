import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';

// 유저 페이지
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
import { TossCheckout } from '../components/TossCheckout';
import { TossSuccess } from '../components/TossSuccess';
import { TossFail } from '../components/TossFail';

// 관리자 페이지
import AdminLogin from '../admin/pages/AdminLogin';
import AdminDashboard from '../admin/pages/AdminDashboard';
import AdminReservation from '../admin/pages/AdminReservation';
import DiscountSettings from '../admin/pages/DiscountSettings';
import AdminInquries  from '../admin/pages/AdminInquiries';
import ReviewManagement from '../admin/pages/ReviewManagement';
import RoomPriceEdit from '../admin/pages/RoomPriceEdit';
import SeasonPeriod from '../admin/pages/SeasonPeriod';

// 관리자 레이아웃
import AdminLayout from '../admin/layout/AdminLayout';
import AdminCloseOpen from '../admin/pages/AdminCloseOpen';

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Routes>
      {/* 관리자 로그인은 Layout 없이 별도 처리 */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 관리자 Layout 적용 그룹 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="reservation" element={<AdminReservation />} />
        <Route path="reviews" element={<ReviewManagement />} />
        <Route path="close-open" element={<AdminCloseOpen />} />
        <Route path="discount" element={<DiscountSettings />} />
        <Route path="inquiries" element={<AdminInquries />} />
        <Route path="price" element={<RoomPriceEdit />} />
        <Route path="season" element={<SeasonPeriod />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Route>

      {/* 유저 페이지 */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/tosscheckout" element={<TossCheckout />} />
      <Route path="/tosssuccess" element={<TossSuccess />} />
      <Route path="/tossfail" element={<TossFail />} />

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
    </Routes>
  );
};

export default AppRoutes;
