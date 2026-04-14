import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenarioController } from './scenario/scenario.controller';
import { ScenarioService } from './scenario/scenario.service';

@Module({
  imports: [],
  controllers: [AppController, ScenarioController],
  providers: [AppService, ScenarioService],
})
export class AppModule {}