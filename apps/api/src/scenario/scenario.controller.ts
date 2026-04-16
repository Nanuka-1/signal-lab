import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { RunScenarioDto } from './scenario.dto';

@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

    @Get()
  async getScenarioHistory() {
    return this.scenarioService.getScenarioHistory();
  }

  @Post()
  async runScenario(@Body() body: RunScenarioDto) {
    return this.scenarioService.runScenario(body.type);
  }
}