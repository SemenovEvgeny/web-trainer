import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Save } from 'lucide-react';

export default function CreateTask() {
  const navigate = useNavigate();
  const { trainees, createTask, currentUser } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !selectedTrainee) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    createTask({
      title: title.trim(),
      description: description.trim(),
      trainerId: currentUser?.id || '',
      traineeId: selectedTrainee,
      status: 'pending',
      dueDate: dueDate || undefined,
    });

    alert('Задание успешно создано!');
    navigate('/trainer/tasks');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Создать задание</h1>
        <p className="text-gray-600">Создайте новое задание для подопечного</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Подопечный <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedTrainee}
            onChange={(e) => setSelectedTrainee(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            required
          >
            <option value="">Выберите подопечного</option>
            {trainees.map((trainee) => (
              <option key={trainee.id} value={trainee.id}>
                {trainee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название задания <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название задания"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание задания <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишите задание подробно..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Срок выполнения (необязательно)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Save className="w-5 h-5" />
            Создать задание
          </button>
          <button
            type="button"
            onClick={() => navigate('/trainer/tasks')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

