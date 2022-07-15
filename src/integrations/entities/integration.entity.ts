import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type IntegrationDocument = Integration & Document;

@Schema()
export class Integration {
  @Prop()
  hash: string;

  @Prop()
  platform: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);
