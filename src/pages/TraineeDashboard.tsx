import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { LogOut, FileText, Users, Calendar, Trophy } from 'lucide-react';
import MyTasks from '../components/MyTasks';
import TaskView from '../components/TaskView';
import TrainersList from '../components/TrainersList';
import TrainingCalendar from '../components/TrainingCalendar';
import TraineeProfile from './TraineeProfile';
import SportsDashboard from '../components/SportsDashboard';

export default function TraineeDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/trainee"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainee') || isActive('/trainee/')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Мои тренировки
              </Link>
              <Link
                to="/trainee/trainers"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainee/trainers')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Тренеры
              </Link>
              <Link
                to="/trainee/calendar"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainee/calendar')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Календарь
              </Link>
              <Link
                to="/trainee/sports"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainee/sports')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Статистика
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/trainee/profile"
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {currentUser?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<MyTasks />} />
          <Route path="/task/:taskId" element={<TaskView />} />
          <Route path="/trainers" element={<TrainersList />} />
          <Route path="/calendar" element={<TrainingCalendar />} />
          <Route path="/sports" element={<SportsDashboard />} />
          <Route path="/profile" element={<TraineeProfile />} />
        </Routes>
      </main>
    </div>
  );
}

