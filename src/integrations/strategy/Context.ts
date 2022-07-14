import { IStrategy } from './IStrategy';

class Context {
  constructor(private strategy: IStrategy) {}

  setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.execute();
  }
}
