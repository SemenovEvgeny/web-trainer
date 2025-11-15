import { useState, useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export default function TrainingCalendar() {
  const { tasks, currentUser, trainees, trainers } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Получаем тренировки для текущего пользователя
  const userTasks = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'trainer') {
      return tasks.filter(t => t.trainerId === currentUser.id);
    } else {
      return tasks.filter(t => t.traineeId === currentUser.id);
    }
  }, [tasks, currentUser]);

  // Группируем тренировки по датам
  const tasksByDate = useMemo(() => {
    const grouped: Record<string, typeof userTasks> = {};
    userTasks.forEach(task => {
      const dateKey = task.dueDate 
        ? new Date(task.dueDate).toDateString()
        : new Date(task.createdAt).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });
    return grouped;
  }, [userTasks]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Первый день месяца
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Массив дней месяца
  const days = [];
  // Пустые ячейки для дней до начала месяца
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTasksForDay = (day: number | null) => {
    if (day === null) return [];
    const date = new Date(year, month, day);
    const dateKey = date.toDateString();
    return tasksByDate[dateKey] || [];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-orange-100 text-orange-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTraineeName = (traineeId: string) => {
    const trainee = trainees.find(t => t.id === traineeId);
    return trainee?.name || 'Неизвестно';
  };

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer?.name || 'Неизвестно';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Календарь тренировок</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Сегодня
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const isToday = day !== null && 
            new Date(year, month, day).toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-gray-200 rounded ${
                isToday ? 'bg-indigo-50 border-indigo-300' : 'bg-white'
              }`}
            >
              {day !== null && (
                <>
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map(task => {
                      const sportLabel = task.sportType ? sportLabels[task.sportType] : '';
                      const personName = currentUser?.role === 'trainer' 
                        ? getTraineeName(task.traineeId)
                        : getTrainerName(task.trainerId);
                      
                      return (
                        <Link
                          key={task.id}
                          to={currentUser?.role === 'trainer' 
                            ? `/trainer/task/${task.id}`
                            : `/trainee/task/${task.id}`
                          }
                          className={`block text-xs p-1 rounded hover:opacity-80 ${getStatusColor(task.status)}`}
                          title={`${task.title}${sportLabel ? ` - ${sportLabel}` : ''}${personName ? ` (${personName})` : ''}`}
                        >
                          <div className="truncate font-semibold">{task.title}</div>
                          {sportLabel && (
                            <div className="text-[10px] opacity-75 truncate">{sportLabel}</div>
                          )}
                          {personName && (
                            <div className="text-[10px] opacity-75 truncate">{personName}</div>
                          )}
                        </Link>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500 px-1">
                        +{dayTasks.length - 2} еще
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {userTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Нет запланированных тренировок</p>
        </div>
      )}
    </div>
  );
}

