export enum BraipTransactionStatus {
  AGUARDANDO_PAGAMENTO = 1,
  PAGAMENTO_APROVADO = 2,
  CANCELADA = 3,
  CHARGEBACK = 4,
  DEVOLVIDA = 5,
  EM_ANALISE = 6,
  ESTORNO = 7,
  EM_PROCESSAMENTO = 8,
  PARCIALMENTE_PAGO = 9,
  PAGAMENTO_ATRASADO = 10,
}

export enum BraipPaymentType {
  BOLETO = 1,
  CARTAO_CREDITO = 2,
  BOLETO_PARCELADO = 3,
  GRATIS = 4,
  PIX = 5,
}

export enum BraipEvent {
  ABANDONO = 'ABANDONO',
  STATUS_ALTERADO = 'STATUS_ALTERADO',
  BOLETO_ALTERADO = 'BOLETO_ALTERADO',
  VENDA_COMPLETA = 'VENDA_COMPLETA',
}

export interface TransItem {
  plan_name: string;
  plan_key: string;
  plan_amount: number;
  plan_value: number;
  product_key: string;
  main: boolean;
  product_type: number;
  product_name: string;
}

export interface Commission {
  type: string;
  document: string;
  name: string;
  email: string;
  value: string;
}

export interface Braip {
  basic_authentication: string;
  type: string;
  plan_name: string;
  plan_key: string;
  plan_amount?: number;
  product_name: string;
  product_key: string;
  product_type: number;
  trans_createdate: string;
  trans_updatedate: string;
  trans_key: string;
  trans_status: string;
  trans_status_code: string;
  trans_value: number;
  trans_total_value: number;
  trans_discount_value: number;
  trans_freight: number;
  trans_freight_type: string;
  trans_payment: string;
  trans_payment_line: string;
  trans_payment_bar_code: string;
  trans_payment_url: string;
  trans_qrcode_pix: string;
  trans_url_pix: string;
  trans_installments: number;
  trans_payment_date?: any;
  is_upsell: string;
  have_order_bump: number;
  tracking_code: string;
  shipping_company: string;
  postback_type: string;
  trans_items: TransItem[];
  parent_sale?: any;
  client_name: string;
  client_email: string;
  client_cel: string;
  client_documment: string;
  client_address: string;
  client_address_city: string;
  client_address_comp: string;
  client_address_district: string;
  client_address_number: string;
  client_address_state: string;
  client_address_country: string;
  client_zip_code: string;
  producer_company_name: string;
  producer_trade_name: string;
  producer_document: string;
  producer_state_tax_number: string;
  producer_address: string;
  producer_adress_city: string;
  producer_address_comp: string;
  producer_address_district: string;
  producer_address_number: string;
  producer_address_state: string;
  producer_zip_code: string;
  producer_tel: string;
  commissions_release_date: string;
  commissions: Commission[];
}

export interface BraipAbandono {
  basic_authentication: string;
  type: string;
  plan_name: string;
  plan_key: string;
  plan_amount?: number;
  product_name: string;
  product_key: string;
  trans_createdate: string;
  trans_updatedate: string;
  client_name: string;
  client_email: string;
  client_cel: string;
  client_documment: string;
  client_address: string;
  client_address_city: string;
  client_address_comp: string;
  client_address_district: string;
  client_address_number: string;
  client_address_state: string;
  client_address_country: string;
  client_zip_code: string;
  abandonment_key: string;
  checkout_url: string;
  affiliate_name: string;
  affiliate_email: string;
}
