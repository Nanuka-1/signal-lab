import { Body, Controller, Post } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { RunScenarioDto } from './scenario.dto';

@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  async runScenario(@Body() body: RunScenarioDto) {
    return this.scenarioService.runScenario(body.type);
  }
}