# pull official base image
FROM python:3.9

# set work directory
WORKDIR /app/

# set environment variables
# Prevents Python from writing pyc files to disc
# Prevents Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# copy requirements file
COPY pyproject.toml poetry.lock* /

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false

RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --no-dev ; fi"


# copy project
COPY . .

CMD gunicorn -w 3 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8001
