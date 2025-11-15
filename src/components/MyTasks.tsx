import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { FileText, Clock, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { QualityRating } from '../types';

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

export default function MyTasks() {
  const { tasks, currentUser } = useApp();
  const myTasks = tasks
    .filter(t => t.traineeId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои задания</h1>
        <p className="text-gray-600">Просмотр и выполнение заданий</p>
      </div>

      <div className="space-y-4">
        {myTasks.map((task) => {
          const StatusIcon = statusIcons[task.status];
          return (
            <Link
              key={task.id}
              to={`/trainee/task/${task.id}`}
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
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${ratingColors[task.qualityRating]}`}
                      >
                        <Star className="w-3 h-3" />
                        {ratingLabels[task.qualityRating]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      Создано: {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                    {task.dueDate && (
                      <span>
                        Срок: {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {myTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">У вас пока нет заданий</p>
        </div>
      )}
    </div>
  );
}

