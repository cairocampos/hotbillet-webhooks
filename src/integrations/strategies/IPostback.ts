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

type PaymentType = 'pix' | 'card' | 'billet';
type PaymentStatus = 'pix' | 'card' | 'billet';

type CheckoutEvent = 'cart_reminder' | 'order_paid';

export interface IPostback {
  webhook_id?: string;
  event: CheckoutEvent;
  customer: Customer;
  transaction: {
    id: string | number;
    payment: PaymentType;
    status: PaymentStatus;
    created_at: Date;
    billet_barcode?: string;
    billet_url?: string;
  };
  shipping: {
    price: number;
    service: string;
  };
}
