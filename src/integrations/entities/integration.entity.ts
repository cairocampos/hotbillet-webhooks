import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IntegrationDocument = Integration & Document;

@Schema()
export class Integration {
  @Prop()
  hash: string;

  @Prop()
  platform: string;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);
