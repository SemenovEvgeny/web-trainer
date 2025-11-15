# GitHub Actions Workflows

В этом проекте настроены несколько GitHub Actions workflows для автоматизации CI/CD.

## Доступные workflows

### 1. `ci.yml` - Проверка и сборка

**Триггеры:**
- Pull Request в ветки `main` или `develop`
- Push в ветки `main` или `develop`

**Что делает:**
- ✅ Проверяет код линтером
- ✅ Собирает проект
- ✅ Сохраняет артефакты сборки

**Использование:**
Автоматически запускается при создании PR или push в указанные ветки.

---

### 2. `deploy-regru.yml` - Деплой на reg.ru

**Триггеры:**
- Push в ветку `main`
- Ручной запуск через GitHub UI

**Что делает:**
- ✅ Собирает проект
- ✅ Загружает файлы на сервер reg.ru через FTP
- ✅ Загружает файл `.htaccess`

**Требуемые секреты:**
- `FTP_SERVER` - FTP сервер (например: `ftp.your-domain.ru`)
- `FTP_USERNAME` - FTP логин
- `FTP_PASSWORD` - FTP пароль
- `FTP_PATH` - Путь на сервере (по умолчанию: `/public_html`)
- `DOMAIN` - Домен приложения (для уведомлений)

**Настройка:**
1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте все необходимые секреты
3. При следующем push в `main` произойдет автоматический деплой

---

### 3. `deploy-vercel.yml` - Деплой на Vercel

**Триггеры:**
- Push в ветку `main`
- Ручной запуск через GitHub UI

**Что делает:**
- ✅ Собирает проект
- ✅ Деплоит на Vercel

**Требуемые секреты:**
- `VERCEL_TOKEN` - Personal Access Token от Vercel
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project ID

**Как получить:**
1. Войдите в [Vercel](https://vercel.com)
2. Settings → Tokens → Create Token
3. Для получения ID: `vercel link` в локальном проекте

---

### 4. `deploy-netlify.yml` - Деплой на Netlify

**Триггеры:**
- Push в ветку `main`
- Ручной запуск через GitHub UI

**Что делает:**
- ✅ Собирает проект
- ✅ Деплоит на Netlify

**Требуемые секреты:**
- `NETLIFY_AUTH_TOKEN` - Personal Access Token от Netlify
- `NETLIFY_SITE_ID` - Site ID

**Как получить:**
1. Войдите в [Netlify](https://netlify.com)
2. User settings → Applications → New access token
3. Site ID можно найти в настройках сайта

---

## Настройка секретов

### Для reg.ru деплоя:

1. Перейдите в ваш репозиторий на GitHub
2. Settings → Secrets and variables → Actions
3. Нажмите "New repository secret"
4. Добавьте следующие секреты:

```
FTP_SERVER=ftp.your-domain.ru
FTP_USERNAME=your-ftp-username
FTP_PASSWORD=your-ftp-password
FTP_PATH=/public_html
DOMAIN=https://your-domain.ru
```

### Для Vercel:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### Для Netlify:

```
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id
```

---

## Ручной запуск workflow

1. Перейдите в Actions в вашем репозитории
2. Выберите нужный workflow
3. Нажмите "Run workflow"
4. Выберите ветку и нажмите "Run workflow"

---

## Отключение workflow

Если нужно отключить автоматический деплой:

1. Переименуйте файл workflow (добавьте `.disabled` в конец)
2. Или удалите файл из `.github/workflows/`

---

## Мониторинг

Все запуски workflows можно посмотреть в разделе **Actions** вашего репозитория.

---

## Рекомендации

- Используйте **CI workflow** для проверки кода перед мерджем
- Используйте **deploy-regru.yml** для деплоя на reg.ru
- Используйте **deploy-vercel.yml** или **deploy-netlify.yml** как альтернативу

Для продакшена рекомендуется использовать только один workflow деплоя, чтобы избежать конфликтов.

