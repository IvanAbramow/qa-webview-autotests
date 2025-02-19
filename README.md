# Webview autotests
Проект использует https://appetize.io/ для запуска автотестов на устройствах iOS и Android.

## Запуск тестов
Для запуска тестов необходимо:
1. Установить зависимости
```bash
npm install
```

2. Создать конфигурацию
Создать файл development.json в папке config. Пример содержимого файла: default.json
Токены необходимо указывать от своих приложений android и ios, загруженных вами на https://appetize.io/

3. Запустить тесты
Если нужно запустить android в headed режиме:
```bash
npm run test:headed:android
```
если нужно запустить ios в headed режиме:
```bash
npm run test:headed:ios
```

