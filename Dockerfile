FROM python:3.9-slim-bullseye

WORKDIR /app

RUN apt-get update && \
    apt-get install -y build-essential ruby curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    corepack enable

COPY package.json yarn.lock* ./

RUN yarn config set registry https://registry.npmjs.org/

RUN yarn install --network-timeout 600000

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

COPY . .

EXPOSE 8080
ENTRYPOINT ["python3", "/app/kotlin-website.py"]