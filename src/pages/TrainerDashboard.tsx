import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { LogOut, Users, FileText, Plus, User } from 'lucide-react';
import TraineesList from '../components/TraineesList';
import TasksList from '../components/TasksList';
import CreateTask from '../components/CreateTask';
import TaskDetails from '../components/TaskDetails';
import TrainerProfile from './TrainerProfile';

export default function TrainerDashboard() {
  const { currentUser, setCurrentUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

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
            <div className="flex">
              <Link
                to="/trainer"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainer') || isActive('/trainer/')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Подопечные
              </Link>
              <Link
                to="/trainer/tasks"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainer/tasks')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Задания
              </Link>
              <Link
                to="/trainer/create-task"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainer/create-task')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Plus className="w-5 h-5 mr-2" />
                Создать задание
              </Link>
              <Link
                to="/trainer/profile"
                className={`flex items-center px-4 border-b-2 ${
                  isActive('/trainer/profile')
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Профиль
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
          <Route path="/" element={<TraineesList />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
          <Route path="/profile" element={<TrainerProfile />} />
        </Routes>
      </main>
    </div>
  );
}

