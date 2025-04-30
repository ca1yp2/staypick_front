import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import HotelList from '../pages/HotelList'
import LocationCheck from '../pages/LocationCheck'
import Payment from '../pages/Payment'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MyPage from '../pages/MyPage'
import Board from '../pages/Board' 
import ReviewDetail from '../components/ReviewDetail'
import ReviewWrite from '../components/ReviewWrite';
import { TossCheckout } from '../components/TossCheckout'
import { TossSuccess } from '../components/TossSuccess'
import { TossFail } from '../components/TossFail'

const AppRoutes = () => (
  <Routes>
     <Route path='/payment' element={<Payment />} />
     <Route path='/tosscheckout' element={<TossCheckout />} />
     <Route path='/tosssuccess' element={<TossSuccess />} />
     <Route path='/tossfail' element={<TossFail />} />
     <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path='/hotellist' element={<HotelList />} />
        <Route path='/locationcheck' element={<LocationCheck />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/board' element={<Board />} /> {/*게시판 경로 추가 */}
        <Route path='/reviewdetail/:id' element={<ReviewDetail />} />
        <Route path="/review/write/:reservationId" element={<ReviewWrite />} />
      </Route>
  </Routes>
);

export default AppRoutes;
