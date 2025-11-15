# Инструкция по деплою приложения

## Шаг 1: Подготовка к GitHub

### 1.1. Инициализация Git репозитория

```bash
# Инициализируем git репозиторий
git init

# Добавляем все файлы
git add .

# Делаем первый коммит
git commit -m "Initial commit: Trainer app"
```

### 1.2. Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите кнопку "+" в правом верхнем углу → "New repository"
3. Заполните:
   - **Repository name**: `trainer-app` (или любое другое имя)
   - **Description**: "Система управления тренировками"
   - Выберите **Public** или **Private**
   - НЕ создавайте README, .gitignore или license (они уже есть)
4. Нажмите "Create repository"

### 1.3. Подключение локального репозитория к GitHub

```bash
# Добавляем remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/trainer-app.git

# Переименовываем ветку в main (если нужно)
git branch -M main

# Отправляем код на GitHub
git push -u origin main
```

Если GitHub запросит авторизацию, используйте Personal Access Token вместо пароля.

---

## Шаг 2: Деплой на сервер

### Вариант 1: Vercel (Рекомендуется - самый простой)

1. Перейдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "Add New Project"
4. Выберите ваш репозиторий `trainer-app`
5. Vercel автоматически определит настройки:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Нажмите "Deploy"
7. Через несколько минут приложение будет доступно по адресу `https://your-app.vercel.app`

**Преимущества Vercel:**
- Автоматический деплой при каждом push в GitHub
- Бесплатный SSL сертификат
- Быстрая CDN
- Простая настройка

### Вариант 2: Netlify

1. Перейдите на [netlify.com](https://netlify.com)
2. Войдите через GitHub
3. Нажмите "Add new site" → "Import an existing project"
4. Выберите ваш репозиторий
5. Настройки:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Нажмите "Deploy site"
7. Приложение будет доступно по адресу `https://your-app.netlify.app`

### Вариант 3: GitHub Pages

1. Установите пакет для деплоя:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/trainer-app"
}
```

3. Обновите `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/trainer-app/', // замените на имя вашего репозитория
  optimizeDeps: {
    include: ['qrcode.react'],
  },
})
```

4. Деплой:
```bash
npm run deploy
```

5. В настройках репозитория GitHub:
   - Settings → Pages
   - Source: `gh-pages` branch
   - Приложение будет доступно по адресу `https://YOUR_USERNAME.github.io/trainer-app`

### Вариант 4: Свой сервер (VPS)

Если у вас есть свой сервер:

1. **Подключитесь к серверу по SSH**

2. **Установите Node.js и npm**:
```bash
# Для Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверьте установку
node --version
npm --version
```

3. **Установите Nginx**:
```bash
sudo apt update
sudo apt install nginx
```

4. **Клонируйте репозиторий на сервер**:
```bash
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/trainer-app.git
cd trainer-app
```

5. **Установите зависимости и соберите проект**:
```bash
npm install
npm run build
```

6. **Настройте Nginx**:
```bash
sudo nano /etc/nginx/sites-available/trainer-app
```

Добавьте конфигурацию:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/trainer-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

7. **Активируйте конфигурацию**:
```bash
sudo ln -s /etc/nginx/sites-available/trainer-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

8. **Настройте SSL (Let's Encrypt)**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Автоматический деплой (CI/CD)

### GitHub Actions для автоматического деплоя

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Полезные команды

```bash
# Проверить статус git
git status

# Добавить изменения
git add .

# Сделать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Посмотреть историю коммитов
git log

# Создать новую ветку
git checkout -b feature/new-feature
```

---

## Рекомендации

1. **Vercel** - лучший выбор для быстрого деплоя React приложений
2. **Netlify** - хорошая альтернатива с похожим функционалом
3. **GitHub Pages** - бесплатно, но требует настройки base path
4. **Свой сервер** - больше контроля, но требует настройки

Для начала рекомендую использовать **Vercel** - это самый простой и быстрый способ!

