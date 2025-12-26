## `backend/server/README.md`

# Diesel Tracking & Accounting Backend

## Overview

This service implements an automated diesel tracking system designed for construction site operations.

Diesel receiving (IN) and consumption (OUT) data is ingested via Zoho Forms (webhook-based),
stored in PostgreSQL, and automatically synchronized with Tally Prime using XML over HTTP.

The system emphasizes:

- Automation
- Accounting correctness
- Reliability
- Clean modular architecture

---

## Tech Stack

- Backend: NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Accounting System: Tally Prime (Free Edition)
- Scheduler: @nestjs/schedule (Cron)
- Testing: Jest
- Runtime: Node.js

---

## High-Level Architecture

```md
Zoho Forms
↓ (Webhook)
NestJS Backend
↓
PostgreSQL Database
↓ (Cron Job)
Tally Prime (XML over HTTP)
```

---

## Data Flow

### 1. Zoho Webhook Ingestion

- Zoho Form submissions trigger an HTTP POST webhook
- Payload is normalized and validated using DTOs
- Diesel entry is stored with `syncStatus = PENDING`

### 2. Database Persistence

- Diesel entries are stored with audit fields
- Both IN and OUT entries are supported

### 3. Automated Sync to Tally

- Cron job runs every 5 minutes
- Picks all `PENDING` entries
- Pushes vouchers to Tally Prime
- Updates `syncStatus` to `SYNCED` or `FAILED`

---

## Diesel Accounting Logic

### Diesel IN (Receiving)

- Voucher Type: Purchase
- Debit: Diesel Expense
- Credit: Cash

### Diesel OUT (Consumption)

- Voucher Type: Journal
- Debit: Diesel Consumption
- Credit: Diesel Expense

---

## Database Schema (Simplified)

### diesel_entry

| Column       | Description               |
| ------------ | ------------------------- |
| id           | UUID                      |
| type         | IN / OUT                  |
| quantity     | Decimal                   |
| site_name    | Site identifier           |
| reference_no | External reference        |
| entry_date   | Transaction date          |
| source       | Data source               |
| sync_status  | PENDING / SYNCED / FAILED |
| created_at   | Timestamp                 |

---

## Cron Job

- Interval: Every 5 minutes
- Fetches all diesel entries with `syncStatus = PENDING`
- Syncs data to Tally Prime
- Handles errors gracefully

---

## Setup Instructions

### Backend

```bash
npm install
npm run start:dev
```

### Test Case

```bash
npm run test
npm run test:cov
```
