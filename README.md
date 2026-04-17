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

## 15-minute verification

### Step 1 — Run a scenario

Open:
http://localhost:3005

Select scenario:
`system_error` → click **Run**

**Expected:**
- scenario executes successfully
- API returns a response
--------------------------------------------------

### Step 2 — Verify metrics

#### Option A — direct endpoint

Open:
http://localhost:3000/metrics

**Expected:**
- raw text output is returned
- `scenario_runs_total` counter is visible

---

#### Option B — Prometheus (recommended)

Open:
http://localhost:3001/targets

**Expected:**
- `signal-lab-api` status is **UP**

---

Open:
http://localhost:3001/graph

Enter query:

```promql
scenario_runs_total

--------------------------------------------------

### Step 3 — Verify logs in Loki

Open:
http://localhost:3002 (Grafana)

Go to:
**Explore**

Select datasource:
**Loki**

Click:
**Run query**

**Expected:**
- log lines appear with timestamps
- structured JSON logs are visible
- new logs appear after running a scenario
- `system_error` scenario produces error-level log entries

--------------------------------------------------

### Step 4 — Verify dashboard

Open:
http://localhost:3002

Go to:
**Dashboards**

Open:
`signal-lab-overview`

**Expected:**
- `scenario_runs_total` metric is visible
- chart reflects recent scenario executions
- values increase after running scenarios

--------------------------------------------------

### Step 5 — Verify AI layer

Project contains:

.cursor/
├── commands/
│   ├── backend-check.mdc
│   ├── demo-flow.mdc
│   └── observability-check.mdc
├── hooks/
│   ├── guard-refactor-scope.mdc
│   └── protect-observability.mdc
├── rules/
│   ├── backend-observability-rules.mdc
│   └── project-context.mdc
├── skills/
│   ├── backend-scenario-skill.mdc
│   ├── observability-skill.mdc
│   └── orchestrator-skill.mdc
└── marketplace-skills.md

Open a new Cursor chat and invoke the orchestrator skill.

**Expected:**
- tasks are decomposed into structured, atomic steps
- execution is scoped to relevant files only
- no uncontrolled or broad refactoring is performed

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
