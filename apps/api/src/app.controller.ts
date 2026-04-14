import { Controller, Get, Header } from '@nestjs/common';
import { register } from 'prom-client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', service: 'signal-lab-api' };
  }

  @Get('metrics')
  @Header('Content-Type', register.contentType)
  getMetrics() {
    return register.metrics();
  }
}