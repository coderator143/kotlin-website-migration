FROM python:3.9-slim-bullseye

WORKDIR /app

# Install system dependencies + Node 20 + Yarn
RUN apt-get update && \
    apt-get install -y build-essential ruby curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    corepack enable

# Install Python dependencies
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

# Copy all code
COPY . .

# Install Node dependencies
COPY package.json yarn.lock* ./
RUN yarn install

EXPOSE 8080
ENTRYPOINT ["python3", "/app/kotlin-website.py"]