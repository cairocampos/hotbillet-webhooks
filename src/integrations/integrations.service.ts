import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Integration,
  IntegrationDocument,
} from './entities/integration.entity';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectModel(Integration.name)
    private integrationModel: Model<IntegrationDocument>,
  ) {}

  async findByHash(hash: string): Promise<Integration> {
    const integration = await this.integrationModel.findOne({ hash });
    return integration;
  }

  async create() {
    return await this.integrationModel.create({
      hash: '12345678',
      platform: 'braip',
    });
  }
}
