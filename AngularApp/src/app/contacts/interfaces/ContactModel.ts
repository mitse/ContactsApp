import { IPhone } from './PhoneModels';

export interface IContact {
  contactId: string;
  name: string;
  email: string;
  address?: string;
  phones?: IPhone[]
}
