import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  // 1. HOC로 새로운 컴포넌트들 생성
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div>
        <Routes>
          {/* 2. 생성된 컴포넌트들을 JSX로 사용 */}
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
