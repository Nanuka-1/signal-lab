import { Injectable } from '@nestjs/common';
import { Prisma, ScenarioRunStatus } from '@prisma/client';
import { ScenarioRepository } from './scenario.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScenarioPrismaRepository implements ScenarioRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    traceId: string;
    scenarioName: string;
    status: ScenarioRunStatus;
    input: Prisma.InputJsonValue;
    startedAt: Date;
  }): Promise<void> {
    await this.prisma.scenarioRun.create({
      data: {
        traceId: data.traceId,
        scenarioName: data.scenarioName,
        status: data.status,
        input: data.input,
        startedAt: data.startedAt,
      },
    });
  }

  async update(data: {
    traceId: string;
    status?: ScenarioRunStatus;
    output?: Prisma.InputJsonValue;
    errorMessage?: string;
    finishedAt?: Date;
    durationMs?: number;
  }): Promise<void> {
    await this.prisma.scenarioRun.update({
      where: {
        traceId: data.traceId,
      },
      data: {
        status: data.status,
        output: data.output,
        errorMessage: data.errorMessage,
        finishedAt: data.finishedAt,
        durationMs: data.durationMs,
      },
    });
  }


async findAll() {
    return this.prisma.scenarioRun.findMany({
      orderBy: {
        startedAt: 'desc',
      },
    });
  }
}