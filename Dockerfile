FROM python:3.10.3

RUN apt-get update && \
    apt-get install -y postgresql-client-13

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app

EXPOSE 3000

CMD ["python", "backend/app.py"]