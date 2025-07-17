# LeetCode Evaluator Service

This project is a modular backend system for a LeetCode-like platform, designed to handle coding problem management, user submissions, code evaluation, and real-time updates. The system is divided into five main services:

## Services Overview

1. **Problem Admin Service**
   - Manages creation, updating, and deletion of coding problems.
   - Handles problem metadata, test cases, and problem visibility.

2. **Submission Service**
   - Receives and validates user code submissions.
   - Queues submissions for evaluation.
   - Provides submission status and history.

3. **Evaluator Service**
   - Executes and evaluates submitted code against test cases.
   - Returns results, errors, and feedback to the submission service.
   - Ensures secure and isolated code execution.

4. **Socket Service**
   - Provides real-time communication between backend services and clients.
   - Broadcasts submission status, evaluation results, and system notifications.

5. **Socket Client**
   - Connects frontend clients to the socket service.
   - Receives live updates for submissions and problem changes.

## Tech Stack

- **Node.js** with **Express.js** for REST APIs
- **BullMQ** for job queues and background processing
- **Redis** for queue and cache management
- **Zod** for request validation
- **Socket.IO** for real-time communication

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Update configuration files in `src/config` as needed (e.g., Redis, server ports).

3. **Run the services:**
   ```bash
   npm start
   ```

4. **Access Bull Board (Job Queue UI):**
   - Visit `http://localhost:<PORT>/admin/queues`

## Project Structure

```
src/
  ├── config/           # Configuration files (Redis, server, etc.)
  ├── controller/       # Controllers for handling requests
  ├── jobs/             # Job handlers for BullMQ
  ├── producers/        # Job producers for queues
  ├── workers/          # Queue workers (evaluators, etc.)
  ├── routes/           # Express route definitions
  ├── validators/       # Request validation logic
  ├── Queues/           # BullMQ queue definitions
  ├── bullborad/        # Bull Board integration
  └── socket/           # Socket service and client
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Submit a pull request# LeetCode Evaluator Service

