import { createContext, useContext, useState, ReactNode } from 'react';
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
  submitSolution: (taskId: string, solution: string) => void;
  reviewSolution: (taskId: string, rating: QualityRating, feedback: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Все доступные подопечные в системе
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

  // Подопечные, добавленные к текущему тренеру
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
      categories: ['programming', 'business'],
      description: 'Опытный тренер по программированию и бизнес-аналитике. 10+ лет опыта.',
      rating: 4.8,
      traineesCount: 25,
      experience: '10+ лет',
    },
    {
      id: 'trainer-2',
      name: 'Елена Смирнова',
      email: 'elena.trainer@example.com',
      categories: ['design', 'photography'],
      description: 'Профессиональный дизайнер и фотограф. Преподаю основы визуального дизайна.',
      rating: 4.9,
      traineesCount: 18,
      experience: '8 лет',
    },
    {
      id: 'trainer-3',
      name: 'Дмитрий Петров',
      email: 'dmitry.trainer@example.com',
      categories: ['marketing', 'business'],
      description: 'Эксперт по маркетингу и бизнес-стратегиям. Помогаю развивать бизнес.',
      rating: 4.7,
      traineesCount: 32,
      experience: '12 лет',
    },
    {
      id: 'trainer-4',
      name: 'Анна Козлова',
      email: 'anna.trainer@example.com',
      categories: ['languages', 'programming'],
      description: 'Преподаю английский язык и программирование. Индивидуальный подход.',
      rating: 4.9,
      traineesCount: 15,
      experience: '6 лет',
    },
    {
      id: 'trainer-5',
      name: 'Михаил Волков',
      email: 'mikhail.trainer@example.com',
      categories: ['fitness', 'other'],
      description: 'Персональный тренер по фитнесу. Составляю программы тренировок.',
      rating: 4.6,
      traineesCount: 20,
      experience: '5 лет',
    },
    {
      id: 'trainer-6',
      name: 'Ольга Морозова',
      email: 'olga.trainer@example.com',
      categories: ['music', 'cooking'],
      description: 'Преподаю музыку и кулинарию. Творческий подход к обучению.',
      rating: 4.8,
      traineesCount: 12,
      experience: '7 лет',
    },
    {
      id: 'trainer-7',
      name: 'Сергей Новиков',
      email: 'sergey.trainer@example.com',
      categories: ['programming', 'design'],
      description: 'Full-stack разработчик и UI/UX дизайнер. Современные технологии.',
      rating: 4.9,
      traineesCount: 28,
      experience: '9 лет',
    },
    {
      id: 'trainer-8',
      name: 'Мария Лебедева',
      email: 'maria.trainer@example.com',
      categories: ['business', 'marketing', 'languages'],
      description: 'Бизнес-консультант и маркетолог. Помогаю с международным бизнесом.',
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
      title: 'Изучение основ React',
      description: 'Изучите основные концепции React: компоненты, пропсы, состояние. Создайте простое приложение-счетчик.',
      trainerId: 'trainer-1',
      traineeId: '1',
      status: 'reviewed',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      solution: {
        id: 'sol-1',
        taskId: '1',
        content: 'Создал компонент Counter с использованием useState. Реализовал инкремент и декремент.',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      qualityRating: 'good',
      feedback: 'Хорошая работа! Учтите использование useCallback для оптимизации.',
    },
    {
      id: '2',
      title: 'Работа с API',
      description: 'Создайте компонент для загрузки и отображения данных из API. Используйте fetch или axios.',
      trainerId: 'trainer-1',
      traineeId: '2',
      status: 'submitted',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      solution: {
        id: 'sol-2',
        taskId: '2',
        content: 'Реализовал компонент с использованием fetch. Добавил обработку ошибок и состояние загрузки.',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
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
        // (для случая, когда подопечный сканирует QR код)
        setTrainees([...trainees, { ...trainee, tasksCount: 0 }]);
      }
    }
  };

  const removeTrainee = (traineeId: string) => {
    setTrainees(trainees.filter(t => t.id !== traineeId));
    // Также удаляем все задания этого подопечного
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

  const submitSolution = (taskId: string, solution: string) => {
    const solutionObj = {
      id: `sol-${Date.now()}`,
      taskId,
      content: solution,
      submittedAt: new Date().toISOString(),
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

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

