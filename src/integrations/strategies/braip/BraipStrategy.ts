import { IPostback } from '../IPostback';
import { IPostbackStrategy } from '../IPostbackStrategy';
import { Braip } from './IBraip';

export class BraipStrategy implements IPostbackStrategy {
  transform(data: Braip): IPostback {
    return {
      event: 'order_paid',
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
        created_at: new Date(),
        id: data.trans_key,
        payment: 'pix',
        status: 'billet',
      },
    };
  }
}
