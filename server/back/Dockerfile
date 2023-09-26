FROM python:latest

RUN mkdir /app

WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r requirements.txt
COPY . .

# EXPOSE 8000
