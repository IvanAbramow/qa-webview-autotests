# MOCK SERVICE

## Подробнее о сервисе

Мок-сервис основан на библиотеке [mock-server](https://github.com/N1k1t/mock-server)
Документация: https://github.com/N1k1t/mock-server/blob/master/README.md

## Глоссарий

- **Мок** - это объект, который имеет те же поля, что и объект, который он заменяет, но значения этих полей задаются вручную.
- **Мок-сервис** - это сервис, который предоставляет моки для других сервисов.
- **Экспектейшн** - это объект, который содержит в себе ожидаемые значения полей объекта, который заменяется моком.
- **Онсайт клиент** - клиент, который находится в проекте с мок-сервисом.
- **Ремоут клиент** - клиент, который находится вне проекта с мок-сервисом и подключается к нему удаленно, используется в проекте с автотестами.
- **Провайдер** - обобщение группы экспектейшенов со своими хранилищами. То есть у каждого провайдера будет свое изолированное хранилище под контейнеры и зарегистрированные экспектейшены.
- **Транспорт** - сущность с конфигурацией под конкретный способ обработки запросов. Например, для HTTP, для WS и т.д.
- **Роутер** - связка транспортов и провайдера.

## Подготовка к установке проекта

1. Устанавливаем npm:
   `npm install -g npm`
   `npm -v`
   `node -v`

2. Устанавливаем n (аналог nvm, только лучше):
   `sudo npm install -g n` установка n
   `n --help` проверка, что n установлен

3. Устанавливаем nodeJs:
   `sudo n <node_version>` смотри версию nodeJs в [package.json](./package.json) в engines
   `node -v` для проверки, что нужная нода установлена
   `sudo n` для переключения на необходимую версию ноды

## Установка проекта

`npm install`

## Запуск проекта

1. Мок-сервис кэширует результаты запроса в Redis. Поэтому, если вы запускаете локально и хотите работать с Redis,
   необходимо установить и запустить Redis. Для подключения ничего делать не нужно, мок-сервис сам подключится к Redis.

2. В папке `config` создайте файл `development.json` и скопируйте в него содержимое файла `default.json`. В файле `development.json`
   укажите свой хост и порт для запуска.
3. Запуск в дев режиме `npm run start:dev`

## Структура проекта

Репозиторий содержит следующие директории:

- `src` - директория с проектами сервисов, где хранятся написанные экспектейшны, а также файл запуска мок-сервиса `app.ts`
- `config` - директория с конфигурационными файлами, файл `development.json` необходимо создать вручную, файл находится в .gitignore

## Как добавить экспектейшны для нового проекта?

## Endpoints

1. Ping

```
curl 'http://localhost:4544/_system/ping' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \
  -H 'Cache-Control: max-age=0' \
  -H 'Connection: keep-alive' \
  -H 'Cookie: segid=segment%3A1' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: none' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"'
```

2. GUI

```
http://localhost:4544/_mock/gui/
```

3. Add Expectation

```
curl -H "Content-type: application/json" -X POST --location "localhost:8080/_system/expectations" --data-binary @- << EOF
{
  "schema": {
    "request": {
      "\$has": {
        "\$location": "method",
        "\$value": "GET"
      }
    }
  }
}
```

4. Update Expectation

```
curl -H "Content-type: application/json" -X PUT --location "localhost:8080/_system/expectations" --data-binary @- << EOF
{
  "id": "...",
  "set": {"name": "The expectation"}
}
EOF
```

5. Delete Expectation

```
curl -H "Content-type: application/json" -X DELETE --location "localhost:8080/_system/expectations" --data-binary @- << EOF
{
  "ids": ["..."]
}
EOF
```
