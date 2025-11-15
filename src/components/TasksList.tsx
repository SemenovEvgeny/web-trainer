import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../store';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { TaskStatus, QualityRating } from '../types';

const statusIcons = {
  pending: Clock,
  in_progress: Clock,
  submitted: AlertCircle,
  reviewed: CheckCircle,
};

const statusColors = {
  pending: 'text-gray-500 bg-gray-100',
  in_progress: 'text-blue-600 bg-blue-100',
  submitted: 'text-orange-600 bg-orange-100',
  reviewed: 'text-green-600 bg-green-100',
};

const statusLabels = {
  pending: 'Ожидает',
  in_progress: 'В работе',
  submitted: 'На проверке',
  reviewed: 'Проверено',
};

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

export default function TasksList() {
  const { tasks, trainees } = useApp();
  const [searchParams] = useSearchParams();
  const traineeFilter = searchParams.get('trainee');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    if (traineeFilter) {
      filtered = filtered.filter(t => t.traineeId === traineeFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [tasks, traineeFilter, statusFilter]);

  const getTraineeName = (traineeId: string) => {
    return trainees.find(t => t.id === traineeId)?.name || 'Неизвестно';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Задания</h1>
        <p className="text-gray-600">Управление всеми заданиями</p>
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            statusFilter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setStatusFilter('submitted')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            statusFilter === 'submitted'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          На проверке
        </button>
        <button
          onClick={() => setStatusFilter('reviewed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            statusFilter === 'reviewed'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Проверено
        </button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const StatusIcon = statusIcons[task.status];
          return (
            <Link
              key={task.id}
              to={`/trainer/task/${task.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${statusColors[task.status]}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusLabels[task.status]}
                    </span>
                    {task.qualityRating && (
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${ratingColors[task.qualityRating]}`}
                      >
                        {ratingLabels[task.qualityRating]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Спортсмен: {getTraineeName(task.traineeId)}</span>
                    <span>
                      Создано: {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Задания не найдены</p>
        </div>
      )}
    </div>
  );
}

