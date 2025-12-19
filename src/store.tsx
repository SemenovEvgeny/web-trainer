import { createContext, useState, ReactNode } from 'react';
import { User, Task, Trainee, QualityRating, Trainer, TrainerReview } from './types';

interface AppState {
  currentUser: User | null;
  trainees: Trainee[];
  allAvailableTrainees: Trainee[];
  trainers: Trainer[];
  trainerReviews: TrainerReview[];
  tasks: Task[];
  setCurrentUser: (user: User | null) => void;
  addTrainee: (traineeId: string, trainerId?: string) => void;
  removeTrainee: (traineeId: string) => void;
  addTrainerReview: (trainerId: string, rating: number, comment: string) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  submitSolution: (taskId: string, solution: string, distance?: number, minutes?: number) => void;
  reviewSolution: (taskId: string, rating: QualityRating, feedback: string) => void;
}

export const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Все доступные спортсмены в системе
  const [allAvailableTrainees] = useState<Trainee[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      tasksCount: 0,
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      tasksCount: 0,
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      email: 'alex@example.com',
      tasksCount: 0,
    },
    {
      id: '4',
      name: 'Елена Волкова',
      email: 'elena@example.com',
      tasksCount: 0,
    },
    {
      id: '5',
      name: 'Дмитрий Соколов',
      email: 'dmitry@example.com',
      tasksCount: 0,
    },
    {
      id: '6',
      name: 'Анна Морозова',
      email: 'anna@example.com',
      tasksCount: 0,
    },
  ]);

  // Спортсмены, добавленные к текущему тренеру
  const [trainees, setTrainees] = useState<Trainee[]>([
    {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      tasksCount: 3,
      averageRating: 'good',
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      tasksCount: 5,
      averageRating: 'excellent',
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      email: 'alex@example.com',
      tasksCount: 2,
      averageRating: 'satisfactory',
    },
  ]);

  // Список всех тренеров в системе
  const [trainers] = useState<Trainer[]>([
    {
      id: 'trainer-1',
      name: 'Александр Иванов',
      email: 'alex.trainer@example.com',
      categories: ['football', 'athletics'],
      description: 'Опытный тренер по футболу и легкой атлетике. Подготовка спортсменов любого уровня.',
      rating: 4.8,
      traineesCount: 25,
      experience: '10+ лет',
    },
    {
      id: 'trainer-2',
      name: 'Елена Смирнова',
      email: 'elena.trainer@example.com',
      categories: ['swimming', 'yoga'],
      description: 'Профессиональный тренер по плаванию и йоге. Индивидуальный подход к каждому спортсмену.',
      rating: 4.9,
      traineesCount: 18,
      experience: '8 лет',
    },
    {
      id: 'trainer-3',
      name: 'Дмитрий Петров',
      email: 'dmitry.trainer@example.com',
      categories: ['basketball', 'volleyball'],
      description: 'Эксперт по баскетболу и волейболу. Помогаю развивать технику и тактику игры.',
      rating: 4.7,
      traineesCount: 32,
      experience: '12 лет',
    },
    {
      id: 'trainer-4',
      name: 'Анна Козлова',
      email: 'anna.trainer@example.com',
      categories: ['tennis', 'gymnastics'],
      description: 'Тренер по теннису и гимнастике. Индивидуальный подход к каждому спортсмену.',
      rating: 4.9,
      traineesCount: 15,
      experience: '6 лет',
    },
    {
      id: 'trainer-5',
      name: 'Михаил Волков',
      email: 'mikhail.trainer@example.com',
      categories: ['fitness', 'boxing'],
      description: 'Персональный тренер по фитнесу и боксу. Составляю программы тренировок.',
      rating: 4.6,
      traineesCount: 20,
      experience: '5 лет',
    },
    {
      id: 'trainer-6',
      name: 'Ольга Морозова',
      email: 'olga.trainer@example.com',
      categories: ['yoga', 'martial_arts'],
      description: 'Тренер по йоге и боевым искусствам. Гармония тела и духа.',
      rating: 4.8,
      traineesCount: 12,
      experience: '7 лет',
    },
    {
      id: 'trainer-7',
      name: 'Сергей Новиков',
      email: 'sergey.trainer@example.com',
      categories: ['hockey', 'skiing'],
      description: 'Тренер по хоккею и лыжам. Зимние виды спорта - моя специализация.',
      rating: 4.9,
      traineesCount: 28,
      experience: '9 лет',
    },
    {
      id: 'trainer-8',
      name: 'Мария Лебедева',
      email: 'maria.trainer@example.com',
      categories: ['cycling', 'athletics', 'fitness'],
      description: 'Тренер по велоспорту, легкой атлетике и фитнесу. Комплексный подход к тренировкам.',
      rating: 4.7,
      traineesCount: 22,
      experience: '11 лет',
    },
  ]);

  // Отзывы о тренерах
  const [trainerReviews, setTrainerReviews] = useState<TrainerReview[]>([
    {
      id: 'review-1',
      trainerId: 'trainer-1',
      traineeId: '1',
      traineeName: 'Иван Петров',
      rating: 5,
      comment: 'Отличный тренер! Очень понятно объясняет материал. Рекомендую!',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'review-2',
      trainerId: 'trainer-1',
      traineeId: '2',
      traineeName: 'Мария Сидорова',
      rating: 4,
      comment: 'Хороший специалист, но иногда не хватает времени на вопросы.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'review-3',
      trainerId: 'trainer-2',
      traineeId: '1',
      traineeName: 'Иван Петров',
      rating: 5,
      comment: 'Превосходный дизайнер! Много полезных советов по визуальному дизайну.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Беговая тренировка 5 км',
      description: 'Пробегите дистанцию 5 км в комфортном темпе. Следите за дыханием и техникой бега.',
      trainerId: 'trainer-1',
      traineeId: '1',
      status: 'reviewed',
      sportType: 'athletics',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      solution: {
        id: 'sol-1',
        taskId: '1',
        content: 'Пробежал 5 км за 28 минут. Чувствовал себя хорошо, темп был равномерным.',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        distance: 5000,
      },
      qualityRating: 'good',
      feedback: 'Хорошая работа! Продолжайте в том же духе. Обратите внимание на технику бега.',
    },
    {
      id: '2',
      title: 'Плавание 1000 метров',
      description: 'Проплывите 1000 метров вольным стилем. Разделите на подходы по 200 метров.',
      trainerId: 'trainer-2',
      traineeId: '2',
      status: 'submitted',
      sportType: 'swimming',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      solution: {
        id: 'sol-2',
        taskId: '2',
        content: 'Проплыл 1000 метров за 5 подходов по 200 метров. Отдых между подходами 30 секунд.',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        distance: 1000,
      },
    },
    {
      id: '3',
      title: 'Легкая пробежка',
      description: 'Пробежка в легком темпе. Задача — поддерживать ровное дыхание.',
      trainerId: 'trainer-1',
      traineeId: '1',
      status: 'in_progress',
      sportType: 'athletics',
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: '4',
      title: 'Футбольная тренировка: техника',
      description: 'Разминка, отработка ведения мяча и короткие спринты.',
      trainerId: 'trainer-1',
      traineeId: '1',
      status: 'pending',
      sportType: 'football',
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString().slice(0, 10),
    },
  ]);

  const addTrainee = (traineeId: string, trainerId?: string) => {
    const trainee = allAvailableTrainees.find(t => t.id === traineeId);
    // Если указан trainerId и это не текущий пользователь, добавляем к указанному тренеру
    // В реальном приложении это должно быть через API
    if (trainee && !trainees.find(t => t.id === traineeId)) {
      // Проверяем, что текущий пользователь - тренер или trainerId совпадает
      if (currentUser?.role === 'trainer' || (trainerId && currentUser?.id === trainerId)) {
        setTrainees([...trainees, { ...trainee, tasksCount: 0 }]);
      } else if (trainerId) {
        // Если trainerId указан, но текущий пользователь не тренер, все равно добавляем
        // (для случая, когда спортсмен сканирует QR код)
        setTrainees([...trainees, { ...trainee, tasksCount: 0 }]);
      }
    }
  };

  const removeTrainee = (traineeId: string) => {
    setTrainees(trainees.filter(t => t.id !== traineeId));
    // Также удаляем все тренировки этого спортсмена
    setTasks(tasks.filter(t => t.traineeId !== traineeId));
  };

  const addTrainerReview = (trainerId: string, rating: number, comment: string) => {
    if (!currentUser || currentUser.role !== 'trainee') {
      return;
    }

    const newReview: TrainerReview = {
      id: `review-${Date.now()}`,
      trainerId,
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    setTrainerReviews([...trainerReviews, newReview]);

    // Обновляем рейтинг в списке тренеров
    // В реальном приложении это должно быть через API
    // Средний рейтинг будет пересчитан автоматически при следующем рендере
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const submitSolution = (taskId: string, solution: string, distance?: number, minutes?: number) => {
    const solutionObj = {
      id: `sol-${Date.now()}`,
      taskId,
      content: solution,
      submittedAt: new Date().toISOString(),
      distance: distance,
      minutes: minutes,
    };
    updateTask(taskId, {
      solution: solutionObj,
      status: 'submitted',
    });
  };

  const reviewSolution = (taskId: string, rating: QualityRating, feedback: string) => {
    updateTask(taskId, {
      qualityRating: rating,
      feedback,
      status: 'reviewed',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        trainees,
        allAvailableTrainees,
        trainers,
        trainerReviews,
        tasks,
        setCurrentUser,
        addTrainee,
        removeTrainee,
        addTrainerReview,
        createTask,
        updateTask,
        submitSolution,
        reviewSolution,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


