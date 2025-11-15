import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { ArrowLeft, Star } from 'lucide-react';
import { QualityRating } from '../types';

const ratingOptions: { value: QualityRating; label: string; color: string }[] = [
  { value: 'excellent', label: 'Отлично', color: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'good', label: 'Хорошо', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'satisfactory', label: 'Удовлетворительно', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { value: 'needs_improvement', label: 'Требует улучшения', color: 'bg-red-100 text-red-800 border-red-300' },
];

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, trainees, reviewSolution } = useApp();
  const task = tasks.find(t => t.id === taskId);
  const [rating, setRating] = useState<QualityRating | ''>('');
  const [feedback, setFeedback] = useState('');

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Задание не найдено</p>
        <button
          onClick={() => navigate('/trainer/tasks')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          Вернуться к списку
        </button>
      </div>
    );
  }

  const trainee = trainees.find(t => t.id === task.traineeId);

  const handleReview = () => {
    if (!rating) {
      alert('Пожалуйста, выберите оценку');
      return;
    }
    reviewSolution(task.id, rating as QualityRating, feedback);
    alert('Решение проверено!');
    navigate('/trainer/tasks');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/trainer/tasks')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад к заданиям
      </button>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
          <p className="text-gray-600">
            Спортсмен: <span className="font-semibold">{trainee?.name || 'Неизвестно'}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Создано: {new Date(task.createdAt).toLocaleString('ru-RU')}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Описание задания</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
        </div>

        {task.solution ? (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-600" />
              Решение спортсмена
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{task.solution.content}</p>
              <p className="text-sm text-gray-500 mt-3">
                Отправлено: {new Date(task.solution.submittedAt).toLocaleString('ru-RU')}
              </p>
            </div>

            {task.status === 'submitted' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Оценка качества <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRating(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          rating === option.value
                            ? `${option.color} border-current font-semibold`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Обратная связь
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Напишите комментарий к решению..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleReview}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Завершить проверку
                </button>
              </div>
            ) : task.qualityRating && task.feedback ? (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Оценка: </span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      ratingOptions.find(o => o.value === task.qualityRating)?.color || ''
                    }`}
                  >
                    {ratingOptions.find(o => o.value === task.qualityRating)?.label}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Обратная связь:</span>
                  <p className="text-gray-700 mt-2 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                    {task.feedback}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="border-t pt-6">
            <p className="text-gray-500 italic">Решение еще не отправлено</p>
          </div>
        )}
      </div>
    </div>
  );
}

