import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import MainLayout from './components/MainLayout';
import Guests from './pages/Guests';
import Staff from './pages/Staff';
import Services from './pages/Services';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import ReceptionistDashboard from './pages/dashboard/ReceptionistDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProviderWrapper } from './context/ThemeContext';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }> 
              <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
              <Route path="reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
              <Route path="guests" element={<ProtectedRoute><Guests /></ProtectedRoute>} />
              <Route path="staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
              <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              {/* Profile route is now available at /profile (public) and /dashboard/profile (protected) */}
              <Route path="admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="receptionist" element={<ProtectedRoute><ReceptionistDashboard /></ProtectedRoute>} />
              <Route path="manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
              <Route path="client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
              <Route path="employee" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Router>
      </ThemeProviderWrapper>
    </I18nextProvider>
  );
};

export default App;