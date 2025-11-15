import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { User } from '../types';
import { UserCheck } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [selectedRole, setSelectedRole] = useState<'trainer' | 'trainee'>('trainer');
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!name.trim()) {
      alert('Пожалуйста, введите имя');
      return;
    }

    const user: User = {
      id: selectedRole === 'trainer' ? 'trainer-1' : 'trainee-1',
      name,
      email: `${name.toLowerCase()}@example.com`,
      role: selectedRole,
    };

    setCurrentUser(user);
    navigate(selectedRole === 'trainer' ? '/trainer' : '/trainee');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <UserCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Система управления тренировками
          </h1>
          <p className="text-gray-600">Войдите в систему</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Выберите роль
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedRole('trainer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'trainer'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Тренер
              </button>
              <button
                onClick={() => setSelectedRole('trainee')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'trainee'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Супергерой
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}

