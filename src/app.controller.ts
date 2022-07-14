import { Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':hash')
  async index(@Param('hash') hash: string, @Req() request: Request) {
    return await this.appService.handle(request.body, hash);
  }
}
