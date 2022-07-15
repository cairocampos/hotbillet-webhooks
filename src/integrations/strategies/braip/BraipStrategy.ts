import {
  CheckoutEvent,
  CheckoutEventEnum,
  IPostback,
  Item,
  PaymentType,
  PaymentTypeEnum,
  TransactionStatus,
  TransactionStatusEnum,
} from '../IPostback';
import { IPostbackStrategy } from '../IPostbackStrategy';
import {
  Braip,
  BraipEvent,
  BraipPaymentType,
  BraipTransactionStatus,
} from './IBraip';

export class BraipStrategy implements IPostbackStrategy {
  transform(data: Braip): IPostback {
    const items: Item[] = data.have_order_bump
      ? data.trans_items.map((item) => {
          return {
            id: item.product_key,
            name: item.product_name,
            price: item.plan_value / 100,
            quantity: item.plan_amount,
            plan: {
              id: item.plan_key,
              name: item.plan_name,
              quantity: item.plan_amount,
            },
          };
        })
      : [
          {
            id: data.product_key,
            name: data.product_name,
            quantity: data?.plan_amount || 0,
            price: data.trans_value / 100,
            plan: {
              id: data?.plan_key,
              name: data?.plan_name,
              quantity: data?.plan_amount,
            },
          },
        ];

    return {
      event: this.getEvent(data.type),
      order: {
        items,
        total_order: data.trans_total_value / 100,
        discount: data.trans_discount_value / 100,
        total: data.trans_value / 100,
      },
      customer: {
        name: data.client_name,
        email: data.client_email,
        address: data.client_address,
        district: data.client_address_district,
        address_number: data.client_address_number,
        city: data.client_address_city,
        state: data.client_address_state,
        country: data.client_address_country,
        document: data.client_documment,
        phone_number: data.client_cel,
        zipcode: data.client_zip_code,
      },
      shipping: {
        price: data.trans_freight,
        service: data.trans_freight_type,
      },
      transaction: {
        id: data.trans_key,
        payment: this.getPaymentType(data?.trans_payment),
        status: this.getTransactionStatus(data?.trans_status_code),
        created_at: data?.trans_createdate,
        paid_at: data?.trans_payment_date,
        billet_url: data?.trans_payment_url,
        billet_line: data?.trans_payment_line,
      },
    };
  }
  getPaymentType(status?: string | number): PaymentType {
    const paymentType = {
      [BraipPaymentType.BOLETO]: PaymentTypeEnum.BOLETO,
      [BraipPaymentType.BOLETO_PARCELADO]: PaymentTypeEnum.BOLETO,
      [BraipPaymentType.CARTAO_CREDITO]: PaymentTypeEnum.CARTAO_CREDITO,
      [BraipPaymentType.PIX]: PaymentTypeEnum.PIX,
    };

    return paymentType[status] || null;
  }

  getTransactionStatus(status?: string | number): TransactionStatus {
    const transactionStatus = {
      [BraipTransactionStatus.AGUARDANDO_PAGAMENTO]:
        TransactionStatusEnum.PENDENTE,
      [BraipTransactionStatus.CANCELADA]: TransactionStatusEnum.CANCELADO,
      [BraipTransactionStatus.PAGAMENTO_APROVADO]: TransactionStatusEnum.PAGO,
      [BraipTransactionStatus.AGUARDANDO_PAGAMENTO]:
        TransactionStatusEnum.PENDENTE,
    };

    return transactionStatus[status] || null;
  }

  getEvent(status?: string | number): CheckoutEvent {
    const transactionStatus = {
      [BraipEvent.ABANDONO]: CheckoutEventEnum.ABANDONO,
      [BraipEvent.VENDA_COMPLETA]: CheckoutEventEnum.PEDIDO_PAGO,
      [BraipEvent.STATUS_ALTERADO]: CheckoutEventEnum.PEDIDO_ALTERADO,
    };

    return transactionStatus[status] || null;
  }
}
