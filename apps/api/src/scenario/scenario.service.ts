import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Counter } from 'prom-client';
import { randomUUID } from 'crypto';
import { ScenarioPrismaRepository } from './scenario.prisma.repository';
import { ScenarioRunStatus } from '@prisma/client';

enum ScenarioType {
  TEST_SCENARIO = 'test_scenario',
  SLOW_SUCCESS = 'slow_success',
  SYSTEM_ERROR = 'system_error',
}

@Injectable()
export class ScenarioService {
  private readonly logger = new Logger(ScenarioService.name);

  constructor(
    private readonly scenarioRepository: ScenarioPrismaRepository,
  ) {}

  private readonly scenarioCounter = new Counter({
    name: 'scenario_runs_total',
    help: 'Total number of scenario runs',
    labelNames: ['type', 'status'],
  });

  async runScenario(type: string) {
    const traceId = randomUUID();
    const startedAt = new Date();

    const allowedScenarios = Object.values(ScenarioType);

    if (!allowedScenarios.includes(type as ScenarioType)) {
      throw new BadRequestException(`Unknown scenario type: ${type}`);
    }

    await this.scenarioRepository.create({
      traceId,
      scenarioName: type,
      status: ScenarioRunStatus.RUNNING,
      input: {},
      startedAt,
    });

    try {
      this.logStarted(type);
      this.scenarioCounter.inc({ type, status: 'started' });

      if (type === ScenarioType.SYSTEM_ERROR) {
        const message = 'Simulated system error';
        this.logFailed(type, message);
        this.scenarioCounter.inc({ type, status: 'error' });
        throw new InternalServerErrorException(message);
      }

      if (type === ScenarioType.SLOW_SUCCESS) {
        await this.delay(1500);
      }

      this.logCompleted(type);
      this.scenarioCounter.inc({ type, status: 'completed' });

      const finishedAt = new Date();
      const durationMs = finishedAt.getTime() - startedAt.getTime();

      await this.scenarioRepository.update({
        traceId,
        status: ScenarioRunStatus.SUCCEEDED,
        output: {
          status: 'completed',
          scenario: type,
        },
        finishedAt,
        durationMs,
      });

      return {
        status: 'completed',
        scenario: type,
      };
    } catch (error) {
      this.logger.error(
        `Scenario failed: ${type}`,
        error instanceof Error ? error.stack : String(error),
      );

      const finishedAt = new Date();
      const durationMs = finishedAt.getTime() - startedAt.getTime();

      await this.scenarioRepository.update({
        traceId,
        status: ScenarioRunStatus.FAILED,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        finishedAt,
        durationMs,
      });

      throw error;
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private logStarted(type: string) {
    this.logger.log(
      JSON.stringify({
        event: 'scenario_started',
        scenario: type,
      }),
    );
  }

  private logCompleted(type: string) {
    this.logger.log(
      JSON.stringify({
        event: 'scenario_completed',
        scenario: type,
        status: 'completed',
      }),
    );
  }

  private logFailed(type: string, message: string) {
    this.logger.error(
      JSON.stringify({
        event: 'scenario_failed',
        scenario: type,
        message,
      }),
    );
  }
}