import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import HotelList from '../pages/HotelList'
import LocationCheck from '../pages/LocationChenk'
import Payment from '../pages/Payment'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MyPage from '../pages/MyPage'

const AppRoutes = () => (
  <Routes>
     <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path='/hotellist' element={<HotelList />} />
        <Route path='/locationcheck' element={<LocationCheck />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mypage' element={<MyPage />} />
      </Route>
  </Routes>
);

export default AppRoutes;
