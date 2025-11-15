import { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { X, UserPlus } from 'lucide-react';

interface AddTraineeProps {
  onClose: () => void;
}

export default function AddTrainee({ onClose }: AddTraineeProps) {
  const { allAvailableTrainees, trainees, addTrainee } = useApp();
  const [selectedTraineeId, setSelectedTraineeId] = useState('');

  // Проверяем, добавлен ли спортсмен
  const isTraineeAdded = (traineeId: string) => {
    return trainees.some(added => added.id === traineeId);
  };

  const handleAdd = () => {
    if (selectedTraineeId && !isTraineeAdded(selectedTraineeId)) {
      addTrainee(selectedTraineeId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-indigo-600" />
            Добавить спортсмена
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите спортсмена
            </label>
            <select
              value={selectedTraineeId}
              onChange={(e) => setSelectedTraineeId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">Выберите из списка</option>
              {allAvailableTrainees.map((trainee) => {
                const isAdded = isTraineeAdded(trainee.id);
                return (
                  <option 
                    key={trainee.id} 
                    value={trainee.id}
                    disabled={isAdded}
                  >
                    {trainee.name} ({trainee.email}) {isAdded ? '— уже добавлен' : ''}
                  </option>
                );
              })}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Всего доступно: {allAvailableTrainees.length} | 
              Добавлено: {trainees.length} | 
              Можно добавить: {allAvailableTrainees.length - trainees.length}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAdd}
              disabled={!selectedTraineeId || isTraineeAdded(selectedTraineeId)}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Добавить
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

