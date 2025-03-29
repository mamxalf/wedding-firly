# Wedding Invitation

A beautiful digital wedding invitation application built with Next.js.

## Docker Deployment Guide

This project is containerized with Docker for easy deployment. Follow these steps to run the application using Docker:

### Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

### Running with Docker Compose

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wedding-invitation
   ```

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. The application will be available at:
   ```
   http://localhost:3333
   ```

4. To stop the containers:
   ```bash
   docker-compose down
   ```

### Manual Docker Build

If you prefer to build and run the Docker container manually:

1. Build the Docker image:
   ```bash
   docker build -t wedding-invitation .
   ```

2. Run the container:
   ```bash
   docker run -p 3333:3333 -v $(pwd)/wedding.db:/app/wedding.db wedding-invitation
   ```

## Database Management

The application uses SQLite for data storage. The database file is mounted as a volume to persist data between container restarts.

### Resetting the Database

To reset the database:

```bash
npm run reset-db
```

## Development

For local development without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start the production server:
   ```bash
   npm start
   ```

## Features

- Beautiful responsive design
- RSVP form with database storage
- Message wall for guest messages
- Countdown timer to the wedding date
- Music player with auto-play option
- Mobile-friendly interface
