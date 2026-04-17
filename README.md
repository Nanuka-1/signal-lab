Signal Lab

Observability playground with a fully structured AI layer for Cursor.
Built as a test task for AI Engineer position.

Signal Lab lets you trigger backend scenarios and immediately verify the full observability chain — metrics in Prometheus, logs in Loki, and dashboards in Grafana — with a single docker compose up -d.

--------------------------------------------------

What this demonstrates
AreaWhat's builtEngineeringNestJS API + Next.js UI + PostgreSQL + full Docker Compose stackObservabilityPrometheus metrics · Loki logs via 

Promtail · Grafana dashboardsAI architectureCursor AI layer: rules, skills, commands, hooks, marketplace, orchestratorContext 

economyOrchestrator skill that decomposes tasks atomically for smaller models

--------------------------------------------------

SERVICES

UI:
http://localhost:3005

API:
http://localhost:3000

Prometheus:
http://localhost:3001

Grafana:
http://localhost:3002

Loki:
http://localhost:3100

NOTE:
Loki does not have a UI.
Opening http://localhost:3100 will return "404 page not found" — this is expected.
Logs are viewed via Grafana.

--------------------------------------------------

15-MINUTE DEMO

STEP 1 — Run Scenario

Open UI:
http://localhost:3005

Run scenario:
system_error

Expected:
Scenario executes successfully.

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
