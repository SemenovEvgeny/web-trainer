import { useApp } from '../store';
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

export default function TrainerProfile() {
  const { currentUser, trainees, tasks } = useApp();

  if (!currentUser) {
    return null;
  }

  // Статистика по заданиям
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const submittedTasks = tasks.filter(t => t.status === 'submitted').length;
  const reviewedTasks = tasks.filter(t => t.status === 'reviewed').length;

  // Статистика по оценкам
  const reviewedTasksWithRating = tasks.filter(t => t.qualityRating);
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

  // Статистика по спортсменам
  const totalTrainees = trainees.length;
  const traineesWithTasks = trainees.filter(t => {
    return tasks.some(task => task.traineeId === t.id);
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Профиль тренера</h1>
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
              Тренер
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Спортсмены */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalTrainees}</h3>
          <p className="text-sm text-gray-600">Спортсменов</p>
          <p className="text-xs text-gray-500 mt-2">
            {traineesWithTasks} с заданиями
          </p>
        </div>

        {/* Всего заданий */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalTasks}</h3>
          <p className="text-sm text-gray-600">Всего заданий</p>
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
        {/* Статистика по заданиям */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Статистика по заданиям
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Всего заданий:</span>
              <span className="font-semibold text-gray-900">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">В работе:</span>
              <span className="font-semibold text-blue-600">{pendingTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ожидают проверки:</span>
              <span className="font-semibold text-orange-600">{submittedTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Проверено:</span>
              <span className="font-semibold text-green-600">{reviewedTasks}</span>
            </div>
            {totalTasks > 0 && (
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">Прогресс проверки:</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(reviewedTasks / totalTasks) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((reviewedTasks / totalTasks) * 100)}% заданий проверено
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Статистика по оценкам */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Статистика по оценкам
          </h3>
          {reviewedTasksWithRating.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Средняя оценка:</span>
                {averageRating && (
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${ratingColors[averageRating]}`}
                  >
                    {ratingLabels[averageRating]}
                  </span>
                )}
              </div>
              <div className="pt-4 border-t space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-3">Распределение оценок:</div>
                {Object.entries(ratingLabels).map(([key, label]) => {
                  const count = ratingDistribution[key as QualityRating] || 0;
                  const percentage = reviewedTasksWithRating.length > 0
                    ? (count / reviewedTasksWithRating.length) * 100
                    : 0;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{label}:</span>
                        <span className="font-semibold text-gray-900">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${ratingColors[key as QualityRating].split(' ')[0]}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Award className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Пока нет проверенных заданий</p>
            </div>
          )}
        </div>
      </div>

      {/* Список спортсменов */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Мои спортсмены ({totalTrainees})
        </h3>
        {trainees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainees.map((trainee) => {
              const traineeTasks = tasks.filter(t => t.traineeId === trainee.id);
              const traineeReviewedTasks = traineeTasks.filter(t => t.qualityRating);
              return (
                <div
                  key={trainee.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{trainee.name}</h4>
                      <p className="text-xs text-gray-500">{trainee.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Заданий:</span>
                      <span className="font-semibold">{traineeTasks.length}</span>
                    </div>
                    {traineeReviewedTasks.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Проверено:</span>
                        <span className="font-semibold text-green-600">
                          {traineeReviewedTasks.length}
                        </span>
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
            <p>Пока нет спортсменов</p>
          </div>
        )}
      </div>
    </div>
  );
}

