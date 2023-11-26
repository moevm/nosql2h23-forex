# Руководство по запуску серверной части проекта

## Создание виртуального окружения Python

Сначала нужно установить модуль [pipenv](https://pypi.org/project/pipenv/)

```
pip install pipenv
```

## Установка зависимостей

Все необходимые зависимости лежат в файле **requirements.txt** в корне *backend*. Установить их нужно в виртуальное окружение,
создаваемое pipenv. 

Перейдем в директорию *backend*:

```
cd ./backend
```

Установим необходимые зависимости:

```
pipenv install -r requirements.txt
```

При успешной  установке зависимостей в корне ./backend появятся файлы:

* **pipfile**
* **pipfile.lock**

Они нужны для работы виртуального окружения.

## Запуск виртуального окружения

Запустим консоль pipenv командой:

```
pipenv shell
```

## Запуск серверной части

Теперь, находясь в виртуальном окружении, мы можем запустить сервер следующей командой:

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


