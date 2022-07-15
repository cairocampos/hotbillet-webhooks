import { DateTime } from 'luxon';

type Plan = {
  id: string | number;
  name: string;
  quantity?: number;
};

export type Item = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  plan?: Plan;
};

type Customer = {
  name: string;
  email: string;
  phone_number: string;
  document: string;
  zipcode: string;
  address: string;
  address_number: string;
  district: string;
  state: string;
  city: string;
  country: string;
};

export type PaymentType = 'pix' | 'card' | 'billet';
export enum PaymentTypeEnum {
  BOLETO = 'billet',
  CARTAO_CREDITO = 'credit_card',
  PIX = 'pix',
}

export type TransactionStatus = 'pending' | 'canceled' | 'failed' | 'paid';
export enum TransactionStatusEnum {
  PENDENTE = 'pending',
  CANCELADO = 'canceled',
  PAGO = 'paid',
}

export type CheckoutEvent = 'cart_reminder' | 'order_paid';
export enum CheckoutEventEnum {
  ABANDONO = 'cart_reminder',
  PEDIDO_ALTERADO = 'order_updated',
  PEDIDO_PAGO = 'order_paid',
}

export interface IPostback {
  webhook_id?: string;
  event: CheckoutEvent;
  customer: Customer;
  order: {
    items: Item[];
    total: number;
    discount: number;
    total_order: number;
  };
  transaction: {
    id?: string | number;
    payment?: PaymentType;
    status?: TransactionStatus;
    created_at: Date | DateTime | string;
    paid_at?: Date | DateTime | string;
    billet_url?: string;
    billet_line?: string;
  };
  shipping: {
    price: number;
    service: string;
  };
}
