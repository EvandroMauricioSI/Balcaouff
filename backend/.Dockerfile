FROM python:3.10.3

RUN apt-get update && \
    apt-get install -y postgresql-client-13

WORKDIR /app

COPY . /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY app app
COPY run.py .

EXPOSE 3000

CMD ["python", "app/app.py"]