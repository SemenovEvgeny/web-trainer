import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store';
import LandingPage from './pages/LandingPage';
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
          <Route path="/" element={<LandingPage />} />
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
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

