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

## Architecture

```text
UI (Next.js)
├── apps/web/app/layout.tsx
└── apps/web/app/page.tsx
        │
        ▼
API (NestJS)
├── apps/api/src/main.ts
├── apps/api/src/app.module.ts
├── apps/api/src/metrics/metrics.controller.ts
├── apps/api/src/prisma/prisma.service.ts
└── apps/api/src/scenario/
    ├── scenario.controller.ts
    ├── scenario.dto.ts
    ├── scenario.prisma.repository.ts
    ├── scenario.repository.ts
    └── scenario.service.ts
        │
        ├── Prisma → PostgreSQL
        ├── prom-client → /metrics
        └── structured logs → Promtail → Loki

Infrastructure
├── infra/prometheus/
├── infra/grafana/
├── infra/loki/
└── infra/promtail/

Runtime flow
The UI is implemented in apps/web/app/page.tsx
The backend entry point is apps/api/src/main.ts
Scenario handling is implemented in apps/api/src/scenario/
Metrics are exposed through apps/api/src/metrics/metrics.controller.ts
Database access is handled through Prisma in apps/api/src/prisma/prisma.service.ts
Logs are collected from Docker containers by Promtail and stored in Loki
Grafana reads both Prometheus and Loki through provisioned datasources

Scenario types
Scenario	Behavior
test_scenario	Immediate success with metrics and logs
slow_success	Simulated delayed success
system_error	Controlled error with metrics and error logs

--------------------------------------------------

## AI layer

The `.cursor/` directory defines a controlled AI execution environment for Cursor.  
It encodes project-specific rules, workflows, and safety constraints so that AI interactions remain predictable and aligned with the architecture.

Unlike generic AI usage, Cursor in this project operates with explicit boundaries, reusable commands, and structured task decomposition.

---

### Skills

| Skill | Purpose |
|---|---|
| `backend-scenario-skill.mdc` | Defines how scenarios should be implemented and extended within `scenario.service.ts` and related layers |
| `observability-skill.mdc` | Enforces correct usage of metrics (`prom-client`), structured logging, and integration with Prometheus, Loki, and Grafana |
| `orchestrator-skill.mdc` | Decomposes complex tasks into atomic steps and ensures execution stays scoped and safe |

---

### Commands

| Command | Purpose |
|---|---|
| `backend-check.mdc` | Validates backend changes after modifying scenarios or services |
| `observability-check.mdc` | Ensures metrics, logs, and observability flow are not broken |
| `demo-flow.mdc` | Guides the execution of the full demo verification flow |

---

### Hooks

| Hook | Purpose |
|---|---|
| `protect-observability.mdc` | Prevents accidental removal or modification of metrics and logging logic |
| `guard-refactor-scope.mdc` | Restricts uncontrolled refactoring and enforces scoped changes |

---

### Rules

| Rule | Purpose |
|---|---|
| `backend-observability-rules.mdc` | Defines constraints for metrics, logging, and backend structure |
| `project-context.mdc` | Provides high-level project context for consistent AI behavior |

---

### Marketplace skills

External capabilities are documented in:

.cursor/marketplace-skills.md


These extend Cursor with reusable tools such as navigation, diff analysis, and code understanding, adapted to this codebase.

---

### Orchestrator behavior

The orchestrator skill acts as a task manager for AI execution:

- breaks down tasks into small, atomic steps  
- limits context to relevant files only  
- enforces step-by-step execution  
- prevents large uncontrolled changes  

This enables smaller models to perform reliably within a constrained environment.
--------------------------------------------------

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS |
| Backend | NestJS (TypeScript) |
| Database | PostgreSQL, Prisma |
| Metrics | prom-client, Prometheus |
| Logs | Structured JSON → Promtail → Loki |
| Visualization | Grafana |
| Infra | Docker Compose |


## Stop

```bash
docker compose down

docker compose down -v



---

```md
## Project structure

```text
signal-lab/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── metrics/
│   │       │   └── metrics.controller.ts
│   │       ├── prisma/
│   │       │   └── prisma.service.ts
│   │       └── scenario/
│   │           ├── scenario.controller.ts
│   │           ├── scenario.dto.ts
│   │           ├── scenario.prisma.repository.ts
│   │           ├── scenario.repository.ts
│   │           └── scenario.service.ts
│   │       ├── app.module.ts
│   │       └── main.ts
│   │
│   └── web/
│       └── app/
│           ├── layout.tsx
│           └── page.tsx
│
├── infra/
│   ├── grafana/
│   ├── loki/
│   ├── prometheus/
│   └── promtail/
│
├── .cursor/
│   ├── commands/
│   ├── hooks/
│   ├── rules/
│   ├── skills/
│   └── marketplace-skills.md
│
├── docker-compose.yml
└── README.md
