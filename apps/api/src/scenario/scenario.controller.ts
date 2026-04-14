import { Body, Controller, Post } from '@nestjs/common';
import { ScenarioService } from './scenario.service';

@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  async runScenario(@Body() body: { type: string }) {
    return this.scenarioService.runScenario(body.type);
  }
}