import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // 글로벌 스타일

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
