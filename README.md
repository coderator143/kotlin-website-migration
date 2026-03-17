# Kotlin Website - RR7 SSR Migration

This project is a migrated version of the Kotlin website homepage, updated to support React Router 7 Framework Mode with Server-Side Rendering (SSR) for the JetSites 2026 internship test assignment.

# Features
Server-Side Rendering (SSR): Initial HTML is pre-rendered on the server via Node.js for SEO and performance.

React Router 7 Framework Mode: Uses the latest routing architecture for seamless hydration.

Preserved Interactivity: Full hydration ensures @rescui components and interactive elements remain functional.

# Prerequisites
Docker and Docker Compose

Node.js (if running build commands outside of Docker)

# Installation & Running
1. Build the Server Bundle
Before the SSR renderer can function, you must generate the server-side entry point. From the root directory:

Bash
# This generates frontend/dist/server.js required by the Node renderer
npm run build:server

2. Start the Application
Docker is required to orchestrate the Flask backend, the Webpack dev server, and the Node SSR environment.

Bash
docker compose up

Once the containers are running, the site will be available at http://localhost:9000.