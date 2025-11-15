#!/bin/bash

# Скрипт для деплоя через FTP на reg.ru
# Использование: ./deploy-ftp.sh

set -e

# Цвета
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

# Проверка конфигурации
if [ ! -f ".deploy-config" ]; then
    error "Файл .deploy-config не найден!"
    info "Скопируйте deploy-config.example в .deploy-config и заполните данные"
    exit 1
fi

source .deploy-config

# Проверка наличия lftp
if ! command -v lftp &> /dev/null; then
    error "lftp не установлен!"
    info "Установите:"
    info "  macOS: brew install lftp"
    info "  Linux: sudo apt-get install lftp"
    exit 1
fi

# Сборка проекта
info "🔨 Собираем проект..."
npm run build

if [ ! -d "dist" ]; then
    error "Сборка не удалась!"
    exit 1
fi

info "📤 Загружаем файлы на сервер через FTP..."

# Загрузка через lftp
lftp -c "
set ftp:ssl-allow no
set ftp:passive-mode yes
open -u $FTP_USER,$FTP_PASS $FTP_SERVER
cd $FTP_PATH
mirror -R dist/ . --delete --verbose --exclude-glob .git*
put .htaccess.example -o .htaccess
bye
"

if [ $? -eq 0 ]; then
    info "✅ Деплой завершен успешно!"
    info "🌐 Приложение доступно по адресу: $DOMAIN"
else
    error "❌ Ошибка при загрузке файлов!"
    exit 1
fi

