import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type WebhookDocument = Webhook & Document;

@Schema()
export class Webhook {
  @Prop()
  hash: string;

  @Prop()
  platform: string;

  @Prop({ type: Object })
  body: object;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
