import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { User, Plus, QrCode, Trash2 } from 'lucide-react';
import { QualityRating } from '../types';
import AddTrainee from './AddTrainee';
import TraineeQRCode from './TraineeQRCode';

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

export default function TraineesList() {
  const { trainees, tasks, removeTrainee } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const getTraineeStats = (traineeId: string) => {
    const traineeTasks = tasks.filter(t => t.traineeId === traineeId);
    const reviewedTasks = traineeTasks.filter(t => t.qualityRating);
    const ratings = reviewedTasks.map(t => t.qualityRating!);
    
    const ratingCounts = ratings.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<QualityRating, number>);

    const averageRating = reviewedTasks.length > 0
      ? (ratings.filter(r => r === 'excellent').length / reviewedTasks.length > 0.5
          ? 'excellent'
          : ratings.filter(r => r === 'good').length / reviewedTasks.length > 0.3
          ? 'good'
          : ratings.filter(r => r === 'satisfactory').length / reviewedTasks.length > 0.3
          ? 'satisfactory'
          : 'needs_improvement')
      : undefined;

    return {
      totalTasks: traineeTasks.length,
      pendingTasks: traineeTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
      submittedTasks: traineeTasks.filter(t => t.status === 'submitted').length,
      averageRating,
      ratingCounts,
    };
  };

  const handleDeleteClick = (traineeId: string, traineeName: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить спортсмена "${traineeName}"?\n\nЭто действие также удалит все задания этого спортсмена.`)) {
      removeTrainee(traineeId);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои спортсмены</h1>
        <p className="text-gray-600">Управление спортсменами и их заданиями</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowQRModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <QrCode className="w-5 h-5" />
            QR код
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Добавить спортсмена
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainees.map((trainee) => {
          const stats = getTraineeStats(trainee.id);
          return (
            <div
              key={trainee.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
            >
              <button
                onClick={() => handleDeleteClick(trainee.id, trainee.name)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1"
                title="Удалить спортсмена"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="flex items-center mb-4 pr-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{trainee.name}</h3>
                  <p className="text-sm text-gray-500">{trainee.email}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Всего заданий:</span>
                  <span className="font-semibold">{stats.totalTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ожидают проверки:</span>
                  <span className="font-semibold text-orange-600">{stats.submittedTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">В работе:</span>
                  <span className="font-semibold text-blue-600">{stats.pendingTasks}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Средняя оценка:</span>
                  {stats.averageRating ? (
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${ratingColors[stats.averageRating as QualityRating]}`}
                    >
                      {ratingLabels[stats.averageRating as QualityRating]}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600">
                      Нет оценок
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={`/trainer/tasks?trainee=${trainee.id}`}
                className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Просмотреть задания
              </Link>
            </div>
          );
        })}
      </div>

      {trainees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Пока нет спортсменов</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Добавить первого спортсмена
          </button>
        </div>
      )}

      {showAddModal && <AddTrainee onClose={() => setShowAddModal(false)} />}
      {showQRModal && <TraineeQRCode onClose={() => setShowQRModal(false)} />}
    </div>
  );
}

