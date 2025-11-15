import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addTrainee, allAvailableTrainees, currentUser, setCurrentUser } = useApp();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const trainerId = searchParams.get('trainer');
  const traineeId = searchParams.get('trainee');

  useEffect(() => {
    const processJoin = async () => {
      if (!trainerId || !traineeId) {
        setStatus('error');
        setMessage('Неверная ссылка. Отсутствуют необходимые параметры.');
        return;
      }

      // Находим спортсмена в списке доступных
      const trainee = allAvailableTrainees.find(t => t.id === traineeId);
      
      if (!trainee) {
        setStatus('error');
        setMessage('Спортсмен не найден в системе.');
        return;
      }

      // Если пользователь не авторизован, создаем временного пользователя-спортсмена
      if (!currentUser || currentUser.role !== 'trainee') {
        const tempUser = {
          id: traineeId,
          name: trainee.name,
          email: trainee.email,
          role: 'trainee' as const,
        };
        setCurrentUser(tempUser);
      }

      // Добавляем спортсмена к тренеру
      try {
        addTrainee(traineeId, trainerId);
        setStatus('success');
        setMessage(`Вы успешно добавлены к тренеру! Добро пожаловать, ${trainee.name}!`);
        
        // Перенаправляем через 2 секунды
        setTimeout(() => {
          navigate('/trainee');
        }, 2000);
      } catch (error) {
        setStatus('error');
        setMessage('Произошла ошибка при добавлении. Попробуйте позже.');
      }
    };

    processJoin();
  }, [trainerId, traineeId, allAvailableTrainees, addTrainee, currentUser, setCurrentUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Обработка...</h1>
              <p className="text-gray-600">Добавление к тренеру</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Успешно!</h1>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Перенаправление...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ошибка</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Перейти на страницу входа
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

