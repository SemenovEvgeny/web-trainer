# Быстрый старт: GitHub + Vercel

## 1. Инициализация Git и отправка на GitHub

```bash
# Инициализация
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на GitHub.com, затем:
git remote add origin https://github.com/YOUR_USERNAME/trainer-app.git
git branch -M main
git push -u origin main
```

## 2. Деплой на Vercel

1. Откройте [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. "Add New Project" → выберите репозиторий
4. Нажмите "Deploy"
5. Готово! 🎉

## 3. Обновление приложения

После каждого изменения:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически пересоберет и задеплоит приложение!

