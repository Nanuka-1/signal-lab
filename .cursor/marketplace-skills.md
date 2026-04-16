# Marketplace Skills

This project uses the following marketplace skills as supporting capabilities for Cursor.

## Skill usage priority
Recommended order for observability-sensitive changes:
1. Codebase Search
2. Refactor Assist
3. Diff Reviewer
4. Test / Validation Assist

Recommended order for documentation changes:
1. Codebase Search
2. Documentation Summarizer
3. Diff Reviewer

## 1. Codebase Search
Purpose:
- quickly find symbols, files, endpoints, metrics, and config references across the repository

Use it first when:
- decomposing any multi-file task
- mapping impact before editing
- locating anchors such as:
  - `scenario_runs_total`
  - `/metrics`
  - `ScenarioType`
  - Prometheus targets
  - Grafana datasource URLs

Why it matters here:
- helps trace metrics, endpoints, scenario flow, and infra references
- reduces the chance of missing affected files before a change

## 2. File Navigation
Purpose:
- move efficiently across known files and directories once the relevant area is already identified

Use it when:
- the target files are already known
- moving between backend, infra, and AI-layer files during implementation

Why it matters here:
- the project spans NestJS, Prisma, Docker Compose, Prometheus, Loki, Promtail, Grafana, and `.cursor`
- reduces the chance of editing the wrong file after the impact area is known

Difference from Codebase Search:
- Codebase Search is for discovering affected symbols and files
- File Navigation is for moving through already identified project structure

## 3. Diff Reviewer
Purpose:
- inspect proposed changes before accepting them

Why it matters here:
- useful for catching accidental renames of metrics, labels, service names, or endpoints
- supports safe iteration in observability-sensitive code
- complements hooks by catching risky diffs before they are accepted

## 4. Refactor Assist
Purpose:
- support small, scoped refactors

Why it matters here:
- helps keep changes minimal in `scenario.service.ts`, config files, and AI-layer files
- should be used carefully under project rules, commands, and hooks
- should not be used for broad rewrites unless explicitly requested

## 5. Documentation Summarizer
Purpose:
- summarize technical setup and project structure

Why it matters here:
- useful when preparing README, demo instructions, and AI-layer explanation
- helps keep docs aligned with actual code

Important restriction:
- Do not change technical names in docs unless verified against implementation:
  - metric names
  - endpoint paths
  - service names
  - scenario names
  - datasource URLs

## 6. Test / Validation Assist
Purpose:
- help reason about what should be checked after a change

Why it matters here:
- supports backend and observability verification workflows
- useful for verifying metrics, logs, dashboards, and API behavior

Preferred usage in this project:
- when validating backend changes, prefer Command: `backend-check`
- when validating observability changes, prefer Command: `observability-check`
- when validating manual verification flow, prefer Command: `demo-flow`