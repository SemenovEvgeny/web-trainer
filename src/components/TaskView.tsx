import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { ArrowLeft, Send, Star } from 'lucide-react';
import { QualityRating, SportType } from '../types';

const sportLabels: Record<SportType, string> = {
  football: 'Футбол',
  basketball: 'Баскетбол',
  volleyball: 'Волейбол',
  tennis: 'Теннис',
  swimming: 'Плавание',
  athletics: 'Легкая атлетика',
  boxing: 'Бокс',
  martial_arts: 'Боевые искусства',
  yoga: 'Йога',
  fitness: 'Фитнес',
  cycling: 'Велоспорт',
  skiing: 'Лыжи',
  hockey: 'Хоккей',
  gymnastics: 'Гимнастика',
  triathlon: 'Триатлон',
  other: 'Другое',
};

// Виды спорта, требующие дистанцию
const distanceSports: SportType[] = ['swimming', 'athletics', 'cycling', 'skiing', 'triathlon'];

const ratingColors: Record<QualityRating, string> = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  satisfactory: 'bg-yellow-100 text-yellow-800',
  needs_improvement: 'bg-red-100 text-red-800',
};

const ratingLabels: Record<QualityRating, string> = {
  excellent: 'Отлично',
  good: 'Хорошо',
  satisfactory: 'Удовлетворительно',
  needs_improvement: 'Требует улучшения',
};

export default function TaskView() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, currentUser, submitSolution } = useApp();
  const task = tasks.find(t => t.id === taskId && t.traineeId === currentUser?.id);
  const [solution, setSolution] = useState(task?.solution?.content || '');
  const [distance, setDistance] = useState<number | ''>(task?.solution?.distance || '');
  const [minutes, setMinutes] = useState<number | ''>(task?.solution?.minutes || '');

  const requiresDistance = task && distanceSports.includes(task.sportType);
  const requiresMinutes = task && !distanceSports.includes(task.sportType);

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Тренировка не найдена</p>
        <button
          onClick={() => navigate('/trainee')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          Вернуться к списку
        </button>
      </div>
    );
  }

  const canSubmit = task.status === 'pending' || task.status === 'in_progress';
  const hasSolution = task.solution !== undefined;
  const isReviewed = task.status === 'reviewed';

  const handleSubmit = () => {
    if (!solution.trim()) {
      alert('Пожалуйста, введите описание тренировки');
      return;
    }

    if (requiresDistance && !distance) {
      alert('Пожалуйста, укажите дистанцию');
      return;
    }

    if (requiresMinutes && !minutes) {
      alert('Пожалуйста, укажите количество минут');
      return;
    }

    submitSolution(
      task.id,
      solution,
      requiresDistance ? (typeof distance === 'number' ? distance : 0) : undefined,
      requiresMinutes ? (typeof minutes === 'number' ? minutes : 0) : undefined
    );
    alert('Отчет о тренировке успешно отправлен!');
    navigate('/trainee');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/trainee')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад к тренировкам
      </button>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
          <p className="text-sm text-gray-500">
            Создано: {new Date(task.createdAt).toLocaleString('ru-RU')}
            {task.dueDate && (
              <span className="ml-4">
                Срок: {new Date(task.dueDate).toLocaleDateString('ru-RU')}
              </span>
            )}
          </p>
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">Вид спорта: </span>
            <span className="text-sm font-semibold text-indigo-600">
              {task.sportType ? sportLabels[task.sportType] : 'Не указан'}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание тренировки</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
        </div>

        {canSubmit && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Отчет о тренировке</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание тренировки <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Опишите как прошла тренировка..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {requiresDistance && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дистанция (метры) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Введите дистанцию в метрах"
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              )}

              {requiresMinutes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество минут <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Введите количество минут"
                    min="0"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                Отправить отчет
              </button>
            </div>
          </div>
        )}

        {hasSolution && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Отправленный отчет</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{task.solution?.content}</p>
              <div className="mt-3 space-y-2">
                {task.solution?.distance !== undefined && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Дистанция:</span> {task.solution.distance} м
                    {task.solution.distance >= 1000 && (
                      <span className="text-gray-500"> ({(task.solution.distance / 1000).toFixed(2)} км)</span>
                    )}
                  </p>
                )}
                {task.solution?.minutes !== undefined && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Время:</span> {task.solution.minutes} минут
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Отправлено: {new Date(task.solution!.submittedAt).toLocaleString('ru-RU')}
                </p>
              </div>
            </div>

            {isReviewed && task.qualityRating && task.feedback && (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Оценка: </span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${ratingColors[task.qualityRating]}`}
                  >
                    {ratingLabels[task.qualityRating]}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-indigo-600" />
                    Обратная связь от тренера:
                  </span>
                  <p className="text-gray-700 bg-indigo-50 rounded-lg p-4 whitespace-pre-wrap">
                    {task.feedback}
                  </p>
                </div>
              </div>
            )}

            {task.status === 'submitted' && (
              <p className="text-orange-600 font-medium">
                Решение отправлено и ожидает проверки тренером
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

