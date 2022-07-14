import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookDocument = Webhook & Document;

@Schema()
export class Webhook {
  @Prop()
  hash: string;

  @Prop()
  platform: string;

  @Prop({ type: Object })
  body: object;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
