import { Model } from "../../../shared/models/model";

export interface Customer extends Model {
  customerCode: number;
  customerName: string;
  companyName: string;
  email: string;
  address: string;
  cityName: string;
  zipCode: number;
  phoneNumber: string;
  mobileNumber: string;
  location: string;
  latitude: number;
  logitude: number;
  contactPerson: string;
  contactPersonMobile: string;
  contactPersonEmail: string;
  saleTypeId: number;
  creditTerm: number;
  creditLimit: number;
  balanceAmount: number;
  activeStatus: boolean;
  currencyName: string;
  vatNumber: number;
}

export enum CustomerStatus {
  Prospect = 1,
  Customer = 2,
}

export enum StatusTypes
{
    Active = 1,
    Inactive = 2,
    OnHold = 3,
}
