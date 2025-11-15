import { useApp } from '../hooks/useApp';
import { User, Mail, Users, FileText, CheckCircle, Clock, Award } from 'lucide-react';
import { QualityRating } from '../types';

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

export default function TraineeProfile() {
  const { currentUser, tasks, trainers } = useApp();

  if (!currentUser || currentUser.role !== 'trainee') {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Доступ запрещен</h2>
        <p className="text-gray-600">Эта страница доступна только для спортсменов.</p>
      </div>
    );
  }

  // Статистика по тренировкам
  const myTasks = tasks.filter(t => t.traineeId === currentUser.id);
  const totalTasks = myTasks.length;
  const pendingTasks = myTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const submittedTasks = myTasks.filter(t => t.status === 'submitted').length;
  const reviewedTasks = myTasks.filter(t => t.status === 'reviewed').length;

  // Статистика по оценкам
  const reviewedTasksWithRating = myTasks.filter(t => t.qualityRating);
  const ratingDistribution = reviewedTasksWithRating.reduce((acc, task) => {
    const rating = task.qualityRating!;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<QualityRating, number>);

  const averageRating = reviewedTasksWithRating.length > 0
    ? (() => {
        const excellentCount = ratingDistribution.excellent || 0;
        const goodCount = ratingDistribution.good || 0;
        const satisfactoryCount = ratingDistribution.satisfactory || 0;
        const total = reviewedTasksWithRating.length;

        if (excellentCount / total > 0.5) return 'excellent';
        if (goodCount / total > 0.3) return 'good';
        if (satisfactoryCount / total > 0.3) return 'satisfactory';
        return 'needs_improvement';
      })()
    : undefined;

  // Статистика по тренерам
  const trainerIds = new Set(myTasks.map(t => t.trainerId));
  const myTrainers = trainers.filter(t => trainerIds.has(t.id));
  const totalTrainers = myTrainers.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Профиль спортсмена</h1>
        <p className="text-gray-600">Информация о вашем профиле и статистика</p>
      </div>

      {/* Карточка профиля */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentUser.name}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <Mail className="w-5 h-5 mr-2" />
              <span>{currentUser.email}</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-semibold">
              Супергерой
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Тренеры */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalTrainers}</h3>
          <p className="text-sm text-gray-600">Тренеров</p>
          <p className="text-xs text-gray-500 mt-2">
            {myTrainers.length} активных
          </p>
        </div>

        {/* Всего тренировок */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalTasks}</h3>
          <p className="text-sm text-gray-600">Всего тренировок</p>
        </div>

        {/* На проверке */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{submittedTasks}</h3>
          <p className="text-sm text-gray-600">На проверке</p>
        </div>

        {/* Проверено */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{reviewedTasks}</h3>
          <p className="text-sm text-gray-600">Проверено</p>
        </div>
      </div>

      {/* Детальная статистика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Статистика по тренировкам */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Статистика по тренировкам
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Всего тренировок:</span>
              <span className="font-semibold text-gray-900">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">В работе:</span>
              <span className="font-semibold text-blue-600">{pendingTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">На проверке:</span>
              <span className="font-semibold text-orange-600">{submittedTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Проверено:</span>
              <span className="font-semibold text-green-600">{reviewedTasks}</span>
            </div>
            {totalTasks > 0 && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Прогресс:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {Math.round((reviewedTasks / totalTasks) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(reviewedTasks / totalTasks) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((reviewedTasks / totalTasks) * 100)}% тренировок проверено
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Средняя оценка */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Средняя оценка
          </h3>
          {averageRating ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-lg text-lg font-bold ${ratingColors[averageRating]}`}
                >
                  {ratingLabels[averageRating]}
                </span>
              </div>
              <div className="space-y-2">
                {(['excellent', 'good', 'satisfactory', 'needs_improvement'] as QualityRating[]).map(rating => {
                  const count = ratingDistribution[rating] || 0;
                  const total = reviewedTasksWithRating.length;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 w-32">{ratingLabels[rating]}:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${ratingColors[rating]}`}
                          style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Award className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Пока нет проверенных тренировок</p>
            </div>
          )}
        </div>
      </div>

      {/* Список тренеров */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Мои тренеры ({totalTrainers})
        </h3>
        {myTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myTrainers.map((trainer) => {
              const trainerTasks = myTasks.filter(t => t.trainerId === trainer.id);
              const trainerReviewedTasks = trainerTasks.filter(t => t.status === 'reviewed');
              return (
                <div key={trainer.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{trainer.name}</p>
                        <p className="text-xs text-gray-500">{trainer.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Тренировок:</span>
                      <span className="font-semibold">{trainerTasks.length}</span>
                    </div>
                    {trainerReviewedTasks.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Проверено:</span>
                        <span className="font-semibold text-green-600">{trainerReviewedTasks.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Пока нет тренеров</p>
          </div>
        )}
      </div>
    </div>
  );
}

