FROM python:3.10

ENV PYTHONUNBUFFERED 1

RUN mkdir /server/

WORKDIR /server/

ADD . /server/

RUN pip install --upgrade setuptools pip

RUN pip install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
