import { IPostback } from './IPostback';

type Parameter<T> = T extends (arg: infer T) => any ? T : never;

export interface IPostbackStrategy {
  transform: <T extends (arg: any) => any>(data: Parameter<T>) => IPostback;
}
