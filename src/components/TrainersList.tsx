import { useState, useMemo } from 'react';
import { useApp } from '../store';
import { User, Star, Users, Award, Filter, X, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { TrainerCategory } from '../types';
import AddTrainerReview from './AddTrainerReview';

const categoryLabels: Record<TrainerCategory, string> = {
  programming: 'Программирование',
  design: 'Дизайн',
  marketing: 'Маркетинг',
  business: 'Бизнес',
  languages: 'Языки',
  fitness: 'Фитнес',
  music: 'Музыка',
  photography: 'Фотография',
  cooking: 'Кулинария',
  other: 'Другое',
};

const categoryColors: Record<TrainerCategory, string> = {
  programming: 'bg-blue-100 text-blue-800',
  design: 'bg-purple-100 text-purple-800',
  marketing: 'bg-pink-100 text-pink-800',
  business: 'bg-green-100 text-green-800',
  languages: 'bg-yellow-100 text-yellow-800',
  fitness: 'bg-red-100 text-red-800',
  music: 'bg-indigo-100 text-indigo-800',
  photography: 'bg-gray-100 text-gray-800',
  cooking: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800',
};

export default function TrainersList() {
  const { trainers, trainerReviews, currentUser } = useApp();
  const [selectedCategories, setSelectedCategories] = useState<TrainerCategory[]>([]);
  const [showReviewModal, setShowReviewModal] = useState<{ trainerId: string; trainerName: string } | null>(null);
  const [expandedTrainer, setExpandedTrainer] = useState<string | null>(null);

  // Получаем все уникальные категории из списка тренеров
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<TrainerCategory>();
    trainers.forEach(trainer => {
      trainer.categories.forEach(cat => categoriesSet.add(cat));
    });
    return Array.from(categoriesSet).sort();
  }, [trainers]);

  // Фильтруем тренеров по выбранным категориям
  const filteredTrainers = useMemo(() => {
    if (selectedCategories.length === 0) {
      return trainers;
    }
    return trainers.filter(trainer =>
      trainer.categories.some(cat => selectedCategories.includes(cat))
    );
  }, [trainers, selectedCategories]);

  const toggleCategory = (category: TrainerCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  // Получаем отзывы для конкретного тренера
  const getTrainerReviews = (trainerId: string) => {
    return trainerReviews.filter(r => r.trainerId === trainerId);
  };

  // Вычисляем средний рейтинг на основе отзывов
  const getAverageRating = (trainerId: string) => {
    const reviews = getTrainerReviews(trainerId);
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  // Проверяем, оставлял ли текущий пользователь отзыв
  const hasUserReview = (trainerId: string) => {
    if (!currentUser) return false;
    return trainerReviews.some(
      r => r.trainerId === trainerId && r.traineeId === currentUser.id
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог тренеров</h1>
        <p className="text-gray-600">Выберите категории для поиска подходящего тренера</p>
      </div>

      {/* Фильтр по категориям */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-600" />
            Фильтр по категориям
          </h2>
          {selectedCategories.length > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
              Очистить фильтры
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isSelected
                    ? `${categoryColors[category]} border-2 border-current`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
              >
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>
        {selectedCategories.length > 0 && (
          <p className="text-sm text-gray-600 mt-4">
            Выбрано категорий: {selectedCategories.length} | 
            Найдено тренеров: {filteredTrainers.length}
          </p>
        )}
      </div>

      {/* Список тренеров */}
      {filteredTrainers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map(trainer => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{trainer.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {(() => {
                      const avgRating = getAverageRating(trainer.id) || trainer.rating;
                      return avgRating ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {avgRating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({getTrainerReviews(trainer.id).length} отзывов)
                          </span>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>

              {trainer.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {trainer.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {trainer.categories.map(category => (
                  <span
                    key={category}
                    className={`px-2 py-1 rounded text-xs font-semibold ${categoryColors[category]}`}
                  >
                    {categoryLabels[category]}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                {trainer.traineesCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{trainer.traineesCount} спортсменов</span>
                  </div>
                )}
                {trainer.experience && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{trainer.experience}</span>
                  </div>
                )}
              </div>

              {/* Кнопка добавления отзыва */}
              {currentUser?.role === 'trainee' && (
                <button
                  onClick={() => setShowReviewModal({ trainerId: trainer.id, trainerName: trainer.name })}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {hasUserReview(trainer.id) ? 'Изменить отзыв' : 'Оставить отзыв'}
                </button>
              )}

              {/* Отзывы */}
              {getTrainerReviews(trainer.id).length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => setExpandedTrainer(expandedTrainer === trainer.id ? null : trainer.id)}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    <span>Отзывы ({getTrainerReviews(trainer.id).length})</span>
                    {expandedTrainer === trainer.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedTrainer === trainer.id && (
                    <div className="mt-3 space-y-3 max-h-64 overflow-y-auto">
                      {getTrainerReviews(trainer.id)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((review) => (
                          <div key={review.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-900">
                                {review.traineeName}
                              </span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Тренеры не найдены</p>
          <p className="text-sm text-gray-500">
            Попробуйте выбрать другие категории
          </p>
        </div>
      )}

      {showReviewModal && (
        <AddTrainerReview
          trainerId={showReviewModal.trainerId}
          trainerName={showReviewModal.trainerName}
          onClose={() => setShowReviewModal(null)}
          onSuccess={() => setExpandedTrainer(showReviewModal.trainerId)}
        />
      )}
    </div>
  );
}

