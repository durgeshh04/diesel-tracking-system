# Diesel Tracking & Accounting Automation

This repository contains the backend service for the Diesel Tracking & Accounting Automation system.

The backend is implemented using **NestJS** and is responsible for:

- Ingesting diesel data from Zoho Forms (via webhook)
- Persisting data in PostgreSQL
- Automatically syncing accounting entries to Tally Prime

---

## Repository Structure

```mermaid
backend/
├── README.md → High-level project overview (this file)
└── server/ → NestJS backend application
```

---

## How to Run the Backend

```bash
cd server
npm install
npm run start:dev
```
