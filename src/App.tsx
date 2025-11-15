import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import LoginPage from './pages/LoginPage';
import TrainerDashboard from './pages/TrainerDashboard';
import TraineeDashboard from './pages/TraineeDashboard';
import JoinPage from './pages/JoinPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route
            path="/trainer/*"
            element={
              <ProtectedRoute requiredRole="trainer">
                <TrainerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainee/*"
            element={
              <ProtectedRoute requiredRole="trainee">
                <TraineeDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

