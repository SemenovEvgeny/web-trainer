import { useState } from 'react';
import { useApp } from '../store';
import { X, Star, MessageSquare } from 'lucide-react';

interface AddTrainerReviewProps {
  trainerId: string;
  trainerName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddTrainerReview({
  trainerId,
  trainerName,
  onClose,
  onSuccess,
}: AddTrainerReviewProps) {
  const { addTrainerReview, trainerReviews, currentUser } = useApp();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  // Проверяем, оставлял ли уже этот спортсмен отзыв
  const hasExistingReview = trainerReviews.some(
    r => r.trainerId === trainerId && r.traineeId === currentUser?.id
  );

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Пожалуйста, выберите оценку');
      return;
    }
    if (!comment.trim()) {
      alert('Пожалуйста, напишите комментарий');
      return;
    }

    addTrainerReview(trainerId, rating, comment.trim());
    alert('Отзыв успешно добавлен!');
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Оставить отзыв
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-700 mb-2">
              Тренер: <span className="font-semibold">{trainerName}</span>
            </p>
            {hasExistingReview && (
              <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                Вы уже оставляли отзыв для этого тренера. Новый отзыв заменит предыдущий.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Оценка <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Выбрано: {rating} {rating === 1 ? 'звезда' : rating < 5 ? 'звезды' : 'звезд'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Напишите ваш отзыв о тренере..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length} символов
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || !comment.trim()}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Отправить отзыв
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

