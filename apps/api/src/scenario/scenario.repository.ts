import { Prisma, ScenarioRunStatus } from '@prisma/client';

export interface ScenarioRepository {
  create(data: {
    traceId: string;
    scenarioName: string;
    status: ScenarioRunStatus;
    input: Prisma.InputJsonValue;
    startedAt: Date;
  }): Promise<void>;

  update(data: {
    traceId: string;
    status?: ScenarioRunStatus;
    output?: Prisma.InputJsonValue;
    errorMessage?: string;
    finishedAt?: Date;
    durationMs?: number;
  }): Promise<void>;
}