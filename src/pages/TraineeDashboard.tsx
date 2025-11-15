import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../store';
import { LogOut, FileText, Users } from 'lucide-react';
import MyTasks from '../components/MyTasks';
import TaskView from '../components/TaskView';
import TrainersList from '../components/TrainersList';

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
                Мои задания
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
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{currentUser?.name}</span>
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
        </Routes>
      </main>
    </div>
  );
}

