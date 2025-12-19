export type UserRole = 'trainer' | 'trainee';

export type TaskStatus = 'pending' | 'in_progress' | 'submitted' | 'reviewed';

export type QualityRating = 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type SportType = TrainerCategory;

export interface Task {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  traineeId: string;
  status: TaskStatus;
  createdAt: string;
  dueDate?: string;
  sportType: SportType; // Вид спорта (обязательное поле)
  solution?: Solution;
  qualityRating?: QualityRating;
  feedback?: string;
}

export interface Solution {
  id: string;
  taskId: string;
  content: string;
  submittedAt: string;
  attachments?: string[];
  distance?: number; // Дистанция в метрах (для бег, плавание, триатлон, велосипед, лыжи)
  minutes?: number; // Количество минут (для других видов спорта)
}

export interface Trainee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tasksCount: number;
  averageRating?: QualityRating;
}

export type TrainerCategory = 
  | 'football'
  | 'basketball'
  | 'volleyball'
  | 'tennis'
  | 'swimming'
  | 'athletics'
  | 'boxing'
  | 'martial_arts'
  | 'yoga'
  | 'fitness'
  | 'cycling'
  | 'skiing'
  | 'hockey'
  | 'gymnastics'
  | 'triathlon'
  | 'other';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  categories: TrainerCategory[];
  description?: string;
  rating?: number;
  traineesCount?: number;
  experience?: string;
}

export interface TrainerReview {
  id: string;
  trainerId: string;
  traineeId: string;
  traineeName: string;
  rating: number; // от 1 до 5
  comment: string;
  createdAt: string;
}

export interface RegisteredUser {
  id: string;
  login: string;
  password: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

