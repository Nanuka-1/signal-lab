import { IsEnum, IsString } from 'class-validator';

enum ScenarioType {
  TEST_SCENARIO = 'test_scenario',
  SLOW_SUCCESS = 'slow_success',
  SYSTEM_ERROR = 'system_error',
}

export class RunScenarioDto {
  @IsString()
  @IsEnum(ScenarioType)
  type: string;
}