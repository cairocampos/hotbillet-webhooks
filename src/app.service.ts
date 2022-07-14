import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Webhook, WebhookDocument } from './entities/webhook.entity';
import { IntegrationsService } from './integrations/integrations.service';
import { BraipStrategy } from './integrations/strategies/braip/BraipStrategy';
import { IPostbackStrategy } from './integrations/strategies/IPostbackStrategy';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Webhook.name) private webhookModel: Model<WebhookDocument>,
    private readonly integrationService: IntegrationsService,
  ) {}

  async handle(body, hash: string) {
    const integration = await this.integrationService.findByHash(hash);
    if (!integration) {
      throw new HttpException('Invalid hash', HttpStatus.BAD_REQUEST);
    }

    const webhookData = await this.webhookModel.create({
      body,
      hash,
      platform: integration.platform,
    });

    const strategy = this.getStrategy(integration.platform);
    const payload = strategy.transform(body);
    payload.webhook_id = webhookData._id;
    return payload;
    // publicar a mensagem
  }

  getStrategy(platform: string): IPostbackStrategy {
    const service = platform.toLowerCase();

    const services = {
      braip: () => new BraipStrategy(),
    };

    if (!Object.keys(services).includes(service)) {
      throw new NotImplementedException(`Service ${service} not implemented`);
    }

    return services[service]();
  }

  async teste() {
    const data = await this.integrationService.create();

    return data;
  }
}
