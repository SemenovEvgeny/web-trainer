#!/bin/bash

# Скрипт для деплоя через SSH на reg.ru
# Использование: ./deploy-ssh.sh

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

# Проверка наличия SSH
if ! command -v ssh &> /dev/null; then
    error "SSH не установлен!"
    exit 1
fi

# Сборка проекта
info "🔨 Собираем проект..."
npm run build

if [ ! -d "dist" ]; then
    error "Сборка не удалась!"
    exit 1
fi

info "📤 Загружаем файлы на сервер через SSH..."

# Создание временного архива
TEMP_DIR=$(mktemp -d)
tar -czf "$TEMP_DIR/dist.tar.gz" -C dist .

# Загрузка архива на сервер
scp "$TEMP_DIR/dist.tar.gz" "$SSH_USER@$SSH_HOST:/tmp/"

# Распаковка на сервере
ssh "$SSH_USER@$SSH_HOST" "
    cd $SSH_PATH
    tar -xzf /tmp/dist.tar.gz
    rm /tmp/dist.tar.gz
    if [ -f .htaccess.example ]; then
        cp .htaccess.example .htaccess
    fi
    chmod -R 755 .
    find . -type f -exec chmod 644 {} \;
"

# Удаление временного архива
rm -rf "$TEMP_DIR"

if [ $? -eq 0 ]; then
    info "✅ Деплой завершен успешно!"
    info "🌐 Приложение доступно по адресу: $DOMAIN"
else
    error "❌ Ошибка при загрузке файлов!"
    exit 1
fi

