import { Model } from "../../../shared/models/model";

export interface InvoiceSettings extends Model{
  RouteId : number;
  RouteNo : string;
  LeadingZeroLength :string;
  DocYear : number;
  SalesSequenceNo :number;
  ReturnSequenceNo : number;
  IsActive : boolean;
}

