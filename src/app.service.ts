import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook, WebhookDocument } from './entities/webhook.entity';
import { IntegrationsService } from './integrations/integrations.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Webhook.name) private webhookModel: Model<WebhookDocument>,
    private readonly integrationService: IntegrationsService,
  ) {}

  async handle(body, hash: string) {
    const integration = await this.integrationService.findByHash(hash);
    if (!integration) {
      throw new HttpException('Hash not found', HttpStatus.BAD_REQUEST);
    }

    await this.webhookModel.create({
      body,
      hash,
      platform: integration.platform,
    });

    // Converter o objeto
    // publicar a mensagem
  }
}
