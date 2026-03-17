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
This generates frontend/dist/server.js required by the Node renderer
npx webpack --config webpack.server.js

2. Start the Application
Docker is required to orchestrate the Flask backend, the Webpack dev server, and the Node SSR environment.

Bash
docker compose up

Once the containers are running, the site will be available at http://localhost:9000.

# Technical Decisions & Known Issues
I ran into a hydration mismatch issue. This happens because the server and client don’t always render identical HTML. Since React 18 enforces strict hydration consistency, even small differences, such as browser-specific logic or some side effects from the UI library, can cause mismatches.

To ensure the application remains stable, I put suppressHydrationWarning at the top-level container. This allows React to recover and continue rendering on the client without breaking the UI.

If given more time, I would address this by isolating browser-only logic (like window or localStorage usage), aligning theme initialization across server and client, and double-checking third-party UI components for SSR compatibility.