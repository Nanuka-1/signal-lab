import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenarioController } from './scenario/scenario.controller';
import { ScenarioService } from './scenario/scenario.service';
import { PrismaService } from './prisma/prisma.service';
import { ScenarioPrismaRepository } from './scenario/scenario.prisma.repository';

@Module({
  imports: [],
  controllers: [AppController, ScenarioController],
  providers: [
    AppService,
    ScenarioService,
    PrismaService,
    ScenarioPrismaRepository,
  ],
})
export class AppModule {}