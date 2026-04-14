import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Counter } from 'prom-client';

enum ScenarioType {
  TEST_SCENARIO = 'test_scenario',
  SLOW_SUCCESS = 'slow_success',
  SYSTEM_ERROR = 'system_error',
}

@Injectable()
export class ScenarioService {
  private readonly logger = new Logger(ScenarioService.name);

  private scenarioCounter = new Counter({
    name: 'scenario_runs_total',
    help: 'Total number of scenario runs',
    labelNames: ['type', 'status'],
  });

  async runScenario(type: string) {
  const allowedScenarios = Object.values(ScenarioType);

  if (!allowedScenarios.includes(type as ScenarioType)) {
    throw new BadRequestException(`Unknown scenario type: ${type}`);
  }

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

  return {
    status: 'completed',
    scenario: type,
  };

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