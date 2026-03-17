FROM python:3.9-slim-bullseye

WORKDIR /app

# Install system dependencies + Node 20 + Yarn
RUN apt-get update && \
    apt-get install -y build-essential ruby curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    corepack enable

# Copy ONLY dependency files first (for caching)
COPY package.json yarn.lock* ./

# Use stable registry
RUN yarn config set registry https://registry.npmjs.org/

# Install dependencies ONCE
RUN yarn install --network-timeout 600000

# Install Python dependencies (you missed this earlier!)
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

# Now copy the rest of the app
COPY . .

EXPOSE 8080
ENTRYPOINT ["python3", "/app/kotlin-website.py"]