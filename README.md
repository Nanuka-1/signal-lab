Signal Lab

Observability playground with a fully structured AI layer for Cursor.
Built as a test task for AI Engineer position.

Signal Lab lets you trigger backend scenarios and immediately verify the full observability chain — metrics in Prometheus, logs in Loki, and dashboards in Grafana — with a single docker compose up -d.

--------------------------------------------------

What this demonstrates   AreaWhat's built

Engineering              NestJS API + Next.js UI + PostgreSQL + full Docker Compose stack

Observability            Prometheus metrics · Loki logs via Promtail · Grafana dashboards

AI architecture          Cursor AI layer: rules, skills, commands, hooks, marketplace, orchestrator  

Contexteconomy           Orchestrator skill that decomposes tasks atomically for smaller models

--------------------------------------------------

## Quick start

The project is designed for fast setup and reproducible verification of the full system.  
All services  are started with a single command.

```bash
git clone https://github.com/Nanuka-1/signal-lab
cd signal-lab
docker compose up -d

--------------------------------------------------

## Services

| Service | URL | Notes |
|--------|-----|------|
| UI | http://localhost:3005 | Run scenarios |
| API | http://localhost:3000 | NestJS backend |
| Metrics | http://localhost:3000/metrics | Raw Prometheus exposition |
| Prometheus | http://localhost:3001 | Scrape targets and query |
| Grafana | http://localhost:3002 | Dashboards and Loki explore |
| Loki | http://localhost:3100 | Log storage (no UI, use Grafana) |

> **Note:**  
> Opening http://localhost:3100 will return `404 page not found` — this is expected.  
> Loki does not provide a UI. Logs are accessed via Grafana → Explore.

--------------------------------------------------

STEP 2 — Check Metrics

Option A — Direct API metrics

Open:
http://localhost:3000/metrics

Expected:
Raw metrics are visible (text output with counters and system metrics)

---

Option B — Prometheus (recommended)

Open:
http://localhost:3001/targets

Expected:
signal-lab-api → UP

---

Open:
http://localhost:3001/graph

Type query:
up

Click Execute

Expected:
Result value = 1

--------------------------------------------------

STEP 3 — Check Logs (Loki)

Open Grafana:
http://localhost:3002

Go to:
Explore

Select data source:
Loki

Click:
Run query

Expected:
- logs are visible
- log lines appear with timestamps
- new logs appear after running scenario

Logs are collected from Docker containers via Promtail and stored in Loki.

--------------------------------------------------

STEP 4 — Check Dashboard

In Grafana:
Open Dashboards

Expected:
signal-lab-overview dashboard is available

--------------------------------------------------

STEP 5 — Check AI Layer

Open folder:
.cursor/

Expected structure:
rules/
skills/
commands/
hooks/
marketplace-skills.md

--------------------------------------------------

STEP 6 — Orchestrator

The project includes an orchestrator skill that:
- splits tasks into small steps
- reduces context usage
- enables predictable AI workflows

--------------------------------------------------

ARCHITECTURE

Backend:
NestJS

Frontend:
Next.js

Database:
PostgreSQL + Prisma

Observability:
Prometheus (metrics)
Loki (logs via Promtail)
Grafana (visualization)

Infra:
Docker Compose

--------------------------------------------------

STOP PROJECT

docker compose down

--------------------------------------------------

NOTES

- All services start with a single command
- No manual setup required
- Designed to be verified in under 15 minutes
