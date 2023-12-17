# Руководство по запуску серверной части проекта

## Установка зависимостей

Все необходимые зависимости лежат в requirements.txt в корне ./backend. Установить их можно через
pip или pipenv. Синтаксис в обоих случаях одинаковый. 

Сначала перейдем в директорию ./backend:

```
cd ./backend
```

Установим необходимые зависимости:

```
pip install -r requirements.txt
```

## Запуск серверной части

Теперь из все той же директории ./backend необходимо запустить сервер следующей командой:

```
python manage.py runserver
```

При успешном запуске в терминале можно будет увидеть сообщение следующего содержания:

>Watching for file changes with StatReloader<br>
Performing system checks...<br><br> System check identified no issues (0 silenced).<br>
November 26, 2023 - 22:34:06<br>Django version 4.2.7, using settings 'Forex.settings'<br>
Starting development server at http://127.0.0.1:8000/<br>
Quit the server with CTRL-BREAK.

Переход по ссылке, указанной в сообщении при успешном запуске,
позволит получить доступ к серверной части прямо в браузере:

```
http://127.0.0.1:8000/
```


