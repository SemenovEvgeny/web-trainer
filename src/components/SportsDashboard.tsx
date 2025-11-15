import { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { Trophy, Activity, TrendingUp, Target } from 'lucide-react';
import { SportType } from '../types';

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

const distanceSports: SportType[] = ['swimming', 'athletics', 'cycling', 'skiing', 'triathlon'];

export default function SportsDashboard() {
  const { tasks, currentUser } = useApp();

  const myTasks = useMemo(() => {
    if (!currentUser || currentUser.role !== 'trainee') return [];
    return tasks.filter(t => t.traineeId === currentUser.id && t.solution);
  }, [tasks, currentUser]);

  // Статистика по видам спорта
  const sportStats = useMemo(() => {
    const stats: Record<SportType, {
      count: number;
      totalDistance: number;
      totalMinutes: number;
    }> = {} as any;

    myTasks.forEach(task => {
      if (!stats[task.sportType]) {
        stats[task.sportType] = { count: 0, totalDistance: 0, totalMinutes: 0 };
      }
      stats[task.sportType].count++;
      if (task.solution?.distance) {
        stats[task.sportType].totalDistance += task.solution.distance;
      }
      if (task.solution?.minutes) {
        stats[task.sportType].totalMinutes += task.solution.minutes;
      }
    });

    return stats;
  }, [myTasks]);

  const totalDistance = useMemo(() => {
    return myTasks.reduce((sum, task) => sum + (task.solution?.distance || 0), 0);
  }, [myTasks]);

  const totalMinutes = useMemo(() => {
    return myTasks.reduce((sum, task) => sum + (task.solution?.minutes || 0), 0);
  }, [myTasks]);

  const uniqueSports = useMemo(() => {
    return Array.from(new Set(myTasks.map(t => t.sportType)));
  }, [myTasks]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Спортивная статистика</h1>
        <p className="text-gray-600">Ваши достижения и прогресс по видам спорта</p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{uniqueSports.length}</h3>
          <p className="text-sm text-gray-600">Видов спорта</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {totalDistance >= 1000 ? `${(totalDistance / 1000).toFixed(2)} км` : `${totalDistance} м`}
          </h3>
          <p className="text-sm text-gray-600">Общая дистанция</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalMinutes}</h3>
          <p className="text-sm text-gray-600">Минут тренировок</p>
        </div>
      </div>

      {/* Статистика по видам спорта */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-indigo-600" />
          Статистика по видам спорта
        </h2>

        {uniqueSports.length > 0 ? (
          <div className="space-y-4">
            {uniqueSports.map(sport => {
              const stats = sportStats[sport];
              const isDistanceSport = distanceSports.includes(sport);
              
              return (
                <div key={sport} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {sportLabels[sport]}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {stats.count} {stats.count === 1 ? 'тренировка' : stats.count < 5 ? 'тренировки' : 'тренировок'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {isDistanceSport && stats.totalDistance > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Общая дистанция:</p>
                        <p className="text-lg font-bold text-gray-900">
                          {stats.totalDistance >= 1000 
                            ? `${(stats.totalDistance / 1000).toFixed(2)} км`
                            : `${stats.totalDistance} м`
                          }
                        </p>
                        {stats.count > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Средняя: {Math.round(stats.totalDistance / stats.count)} м
                          </p>
                        )}
                      </div>
                    )}
                    
                    {!isDistanceSport && stats.totalMinutes > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Общее время:</p>
                        <p className="text-lg font-bold text-gray-900">
                          {stats.totalMinutes} минут
                        </p>
                        {stats.count > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Среднее: {Math.round(stats.totalMinutes / stats.count)} мин
                          </p>
                        )}
                      </div>
                    )}

                    {isDistanceSport && stats.totalMinutes > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">Время тренировок:</p>
                        <p className="text-lg font-bold text-gray-900">
                          {stats.totalMinutes} минут
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>Пока нет завершенных тренировок</p>
          </div>
        )}
      </div>
    </div>
  );
}

