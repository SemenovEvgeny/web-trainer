import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { UserCheck, UserPlus } from 'lucide-react';

type TabType = 'login' | 'register';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('login');
  
  // Состояния для входа
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
  });
  
  // Состояния для регистрации
  const [registerForm, setRegisterForm] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: 'trainer' as 'trainer' | 'trainee',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    setError('');
    setSuccess('');
    
    if (!loginForm.login.trim() || !loginForm.password.trim()) {
      setError('Заполните все поля');
      return;
    }

    const result = login(loginForm.login, loginForm.password);
    
    if (result.success && result.user) {
      setSuccess('Вход выполнен успешно!');
      setTimeout(() => {
        navigate(result.user!.role === 'trainer' ? '/trainer' : '/trainee');
      }, 500);
    } else {
      setError(result.message);
    }
  };

  const handleRegister = () => {
    setError('');
    setSuccess('');
    
    // Валидация
    if (!registerForm.login.trim() || !registerForm.password.trim() || 
        !registerForm.name.trim() || !registerForm.email.trim()) {
      setError('Заполните все поля');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (registerForm.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      setError('Введите корректный email');
      return;
    }

    const result = register(
      registerForm.login,
      registerForm.password,
      registerForm.name,
      registerForm.email,
      registerForm.role
    );
    
    if (result.success) {
      setSuccess('Регистрация успешна! Теперь вы можете войти.');
      // Очищаем форму регистрации
      setRegisterForm({
        login: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        role: 'trainer',
      });
      // Переключаемся на вкладку входа
      setTimeout(() => {
        setActiveTab('login');
        setLoginForm({ login: registerForm.login, password: '' });
        setSuccess('');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            {activeTab === 'login' ? (
              <UserCheck className="w-8 h-8 text-indigo-600" />
            ) : (
              <UserPlus className="w-8 h-8 text-indigo-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Система управления тренировками
          </h1>
          <p className="text-gray-600">
            {activeTab === 'login' ? 'Войдите в систему' : 'Создайте аккаунт'}
          </p>
        </div>

        {/* Табы */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'login'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'register'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Сообщения об ошибках и успехе */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Форма входа */}
        {activeTab === 'login' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              <input
                type="text"
                value={loginForm.login}
                onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })}
                placeholder="Введите логин"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Введите пароль"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Войти
            </button>
            
            <div className="text-center text-sm text-gray-600 pt-4 border-t">
              <p className="mb-2">Демо-аккаунты для тестирования:</p>
              <p className="text-xs">Тренер: <span className="font-mono">trainer / 123456</span></p>
              <p className="text-xs">Спортсмен: <span className="font-mono">athlete / 123456</span></p>
            </div>
          </div>
        )}

        {/* Форма регистрации */}
        {activeTab === 'register' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              <input
                type="text"
                value={registerForm.login}
                onChange={(e) => setRegisterForm({ ...registerForm, login: e.target.value })}
                placeholder="Придумайте логин"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                placeholder="Введите ваше имя"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                placeholder="Введите email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                placeholder="Придумайте пароль (мин. 6 символов)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подтвердите пароль
              </label>
              <input
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                placeholder="Повторите пароль"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Выберите роль
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRegisterForm({ ...registerForm, role: 'trainer' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    registerForm.role === 'trainer'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  Тренер
                </button>
                <button
                  onClick={() => setRegisterForm({ ...registerForm, role: 'trainee' })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    registerForm.role === 'trainee'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  Супергерой
                </button>
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Зарегистрироваться
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
