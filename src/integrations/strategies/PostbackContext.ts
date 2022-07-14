import { IPostbackStrategy } from './IPostbackStrategy';

export class PostbackContext {
  constructor(private strategy: IPostbackStrategy) {}

  setContext(context: IPostbackStrategy) {
    this.strategy = context;
  }

  transform(postbackData) {
    this.strategy.transform(postbackData);
  }
}
