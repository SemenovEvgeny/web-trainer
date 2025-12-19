import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Target, 
  BarChart3, 
  Trophy, 
  QrCode,
  CheckCircle2,
  Star,
  Activity,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <style>{`
        @keyframes swimIn {
          0% {
            transform: translateX(-150px) translateY(20px) rotate(-10deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes runIn {
          0% {
            transform: translateX(150px) translateY(20px) rotate(10deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes bikeIn {
          0% {
            transform: translateY(150px) rotate(-5deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes cycle {
          0% {
            transform: translateX(-100px) rotate(0deg);
          }
          50% {
            transform: translateX(100px) rotate(5deg);
          }
          100% {
            transform: translateX(-100px) rotate(0deg);
          }
        }
        
        .swimmer {
          animation: swimIn 1.5s ease-out forwards, float 3s ease-in-out infinite 1.5s;
        }
        
        .runner {
          animation: runIn 1.5s ease-out forwards, bounce 2s ease-in-out infinite 1.5s;
        }
        
        .cyclist {
          animation: bikeIn 1.5s ease-out forwards, cycle 8s linear infinite 1.5s;
        }
        
        .athlete-emoji {
          font-size: 4rem;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[600px]">
        {/* Animated Athletes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Плавающий спортсмен (слева) */}
          <div className="absolute left-10 top-20 swimmer">
            <div className="athlete-emoji">🏊‍♂️</div>
          </div>
          
          {/* Плавающая спортсменка (слева, ниже) */}
          <div className="absolute left-20 top-40 swimmer" style={{ animationDelay: '0.3s' }}>
            <div className="athlete-emoji">🏊‍♀️</div>
          </div>
          
          {/* Бегущий спортсмен (справа) */}
          <div className="absolute right-10 top-20 runner">
            <div className="athlete-emoji">🏃‍♂️</div>
          </div>
          
          {/* Бегущая спортсменка (справа, ниже) */}
          <div className="absolute right-20 top-40 runner" style={{ animationDelay: '0.3s' }}>
            <div className="athlete-emoji">🏃‍♀️</div>
          </div>
          
          {/* Велосипедист (снизу, по центру) */}
          <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 cyclist">
            <div className="athlete-emoji">🚴‍♂️</div>
          </div>
          
          {/* Велосипедистка (снизу, слева) */}
          <div className="absolute left-1/4 bottom-20 cyclist" style={{ animationDelay: '0.5s' }}>
            <div className="athlete-emoji">🚴‍♀️</div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Система управления
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                тренировками
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Современная платформа для тренеров и спортсменов. 
              Управляйте тренировками, отслеживайте прогресс и достигайте новых высот вместе.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Начать работу
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Возможности платформы
          </h2>
          <p className="text-lg text-gray-600">
            Все инструменты для эффективной работы с тренировками
          </p>
        </div>

        {/* Trainer Features */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3 bg-indigo-100 px-6 py-3 rounded-full">
              <Users className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-indigo-900">Для тренеров</h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Управление спортсменами</h4>
              <p className="text-gray-600">
                Добавляйте спортсменов через QR-код или из списка. Отслеживайте их прогресс и статистику.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Создание тренировок</h4>
              <p className="text-gray-600">
                Создавайте индивидуальные тренировки с выбором вида спорта и даты выполнения.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Проверка отчетов</h4>
              <p className="text-gray-600">
                Просматривайте отчеты спортсменов, оценивайте качество выполнения и оставляйте обратную связь.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Календарь тренировок</h4>
              <p className="text-gray-600">
                Планируйте и отслеживайте все тренировки ваших спортсменов в удобном календарном виде.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Статистика и аналитика</h4>
              <p className="text-gray-600">
                Анализируйте прогресс спортсменов, просматривайте рейтинги и общую статистику.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">QR-код для добавления</h4>
              <p className="text-gray-600">
                Генерируйте QR-коды для быстрого добавления спортсменов к вашему профилю.
              </p>
            </div>
          </div>
        </div>

        {/* Trainee Features */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3 bg-blue-100 px-6 py-3 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-900">Для супергероев</h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Мои тренировки</h4>
              <p className="text-gray-600">
                Просматривайте все назначенные тренировки, их статусы и детали выполнения.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Отчеты о тренировках</h4>
              <p className="text-gray-600">
                Отправляйте отчеты с дистанцией или временем тренировки в зависимости от вида спорта.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Оценки и отзывы</h4>
              <p className="text-gray-600">
                Получайте оценку качества выполнения и обратную связь от вашего тренера.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Статистика спорта</h4>
              <p className="text-gray-600">
                Отслеживайте все виды спорта, которые вы практикуете, общую дистанцию и время тренировок.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Календарь</h4>
              <p className="text-gray-600">
                Планируйте тренировки и следите за расписанием в удобном календарном формате.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Прогресс и достижения</h4>
              <p className="text-gray-600">
                Наблюдайте за своим прогрессом, просматривайте историю тренировок и достижения.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Types Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Поддержка различных видов спорта
            </h2>
            <p className="text-lg text-indigo-100">
              Футбол, баскетбол, плавание, бег, велоспорт и многое другое
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Футбол', emoji: '⚽' },
              { name: 'Баскетбол', emoji: '🏀' },
              { name: 'Плавание', emoji: '🏊' },
              { name: 'Бег', emoji: '🏃' },
              { name: 'Велоспорт', emoji: '🚴' },
              { name: 'Силовые тренировки', emoji: '🏋️' },
              { name: 'Лыжи', emoji: '⛷️' },
              { name: 'Теннис', emoji: '🎾' }
            ].map((sport, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl mb-2">{sport.emoji}</div>
                <p className="text-white font-medium text-sm">{sport.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-center shadow-2xl">
          <Clock className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к платформе и начните эффективно управлять тренировками уже сегодня
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-10 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Войти в систему
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 Система управления тренировками. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
